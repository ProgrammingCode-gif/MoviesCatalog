import styles from './Genres.module.css'
import api from '../../services/api'
import { lazy, Suspense } from 'react'
import { useQuery } from '@tanstack/react-query'

import Loading from '../../components/Loading/Loading'
const GenreGroup = lazy(() => import('../../components/Genres/GenreGroup/GenreGroup'))


const Genres = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["genres"],
        queryFn: async () => await api.getMoviesGenres()
    })
    console.log(data);
    

    return (
        <div className={styles.wrapper}>
            {isLoading ? <Loading /> :
                data.map((genre) => (
                    <Suspense key={genre.id}>
                        <GenreGroup
                            key={genre.id}
                            genre={genre}
                        />
                    </Suspense>
                ))
            }
        </div>
    )
}

export default Genres