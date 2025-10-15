import MovieListInfinite from '../../components/MovieListInfinite/MovieListInfinite'
import Container from '../../components/Container/Container'
import styles from './Movies.module.css'
import api from '../../services/api'
import MovieSwapper from '../../components/MovieSwapper/MovieSwapper'
import Loading from '../../components/Loading/Loading'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

const Movies = () => {
    const { data: swapperContent, isLoading } = useQuery({
        queryKey: ['trendingMovies'],
        queryFn: async () => await api.getTrendingMovies()
    })

    const {
        data: moviesPage, 
        fetchNextPage, 
        hasNextPage,
        isFetchingNextPage,
        isLoading: isMoviesLoading
    } = useInfiniteQuery({
        queryKey: ["popularMovies"],
        queryFn: async ({pageParam = 1}) => await api.getPopularMovies(pageParam),
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length > 0 ? allPages.length + 1 : undefined
        }
    })

    const movies = moviesPage?.pages.flat() || []

    return (
        <div className={styles.wrapper}>
            {isLoading || isMoviesLoading ? <Loading /> : <>
                <MovieSwapper content={swapperContent} />
                <Container>
                    <h2 className={styles.title}>Популярные фильмы</h2>
                    <MovieListInfinite
                        content={movies} 
                        onPage={() => {
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

export default Movies