import { useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../services/api'
import MoviePageHeader from '../../components/MoviePageHeader/MoviePageHeader'
import MoviePageMain from '../../components/MoviePageMain/MoviePageMain'
import Loading from '../../components/Loading/Loading'
import { useQuery } from '@tanstack/react-query'

const MoviePage = ({ series = false }) => {
    const { movieId } = useParams()
    const [isTrailerOpened, setIsTrailerOpened] = useState(false)

    const { data, isLoading } = useQuery({
        queryKey: [`movieDetail${movieId}`],
        queryFn: async () => {
            const [movie, cast, trailerUrl] = await Promise.all([
                api.getMovieDetails(movieId, series),
                api.getCast(movieId, series),
                api.getMovieTrailerUrl(movieId, 0, series)
            ])
            
            return { movie, cast: cast.slice(0, 5), trailerUrl }
        }
    })    

    if(isLoading) return <div className="loading-container"><Loading /></div>
    return (
        <>
            <header>   
                <MoviePageHeader
                    trailerUrl={data.trailerUrl}
                    isTrailerOpened={isTrailerOpened}
                    onTrailer={() => setIsTrailerOpened(prev => !prev)}
                    movie={data.movie}
                    cast={data.cast}
                />
            </header>

            <MoviePageMain
                trailerUrl={data.trailerUrl}
                isTrailerOpened={isTrailerOpened}
                movie={data.movie}
                isSeries={series}
            />

        </>
    )
}

export default MoviePage