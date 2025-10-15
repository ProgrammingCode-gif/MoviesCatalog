import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import styles from './Series.module.css'
import api from '../../services/api'

import MovieListInfinite from '../../components/MovieListInfinite/MovieListInfinite'
import Container from '../../components/Container/Container'
import MovieSwapper from '../../components/MovieSwapper/MovieSwapper'
import Loading from '../../components/Loading/Loading'

const Series = () => {
    const { data: swapperData, isLoading } = useQuery({
        queryKey: ["swapperSeries"],
        queryFn: async () => api.getTrendingSeries()
    })

    const { 
        data: listData,
        isLoading: isListLoading,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage
    } = useInfiniteQuery({
        queryKey: ["popularSeries"],
        queryFn: async ({pageParam = 1}) => await api.getTrendingSeries(pageParam),
        getNextPageParam: (lastPage, allPages) => {            
            return lastPage.length > 0 ? allPages.length + 1 : undefined
        }
    })

    const seriesList = listData?.pages.flat() || []
    
    return (
        <div className={styles.wrapper}>
            {isLoading && isListLoading ? <Loading /> : <>
            <MovieSwapper content={swapperData}/>
            <Container>
            <h2 className={styles.title}>Популярные сериалы</h2>
                <MovieListInfinite 
                content={seriesList} 
                onPage={() => {
                    console.log("fetching");
                            if(hasNextPage && !isFetchingNextPage) {
                                fetchNextPage()
                            }
                        }}
                />
            </Container>
            </>}
        </div>
    )
}

export default Series