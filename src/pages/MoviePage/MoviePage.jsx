import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../services/api'
import MoviePageHeader from '../../components/MoviePageHeader/MoviePageHeader'
import MoviePageMain from '../../components/MoviePageMain/MoviePageMain'
import Loading from '../../components/Loading/Loading'

const MoviePage = ({series = false}) => {
    const { movieId } = useParams()
    const [movie, setMovie] = useState()
    const [cast, setCast] = useState()
    const [loading, setLoading] = useState(true)
    const [isTrailerOpened, setIsTrailerOpened] = useState(false)
    const [trailerUrl, setTrailerUrl] = useState()

    useEffect(() => {
        const getMovie = async () => {
            try {
                setLoading(true)

                const data = await api.getMovieDetails(movieId, series)
                const castData = await api.getCast(movieId, series)

                const trailerData = await api.getMovieTrailerUrl(movieId, 0, series)

                setTrailerUrl(trailerData)
                setMovie(data)
                setCast(castData.slice(0, 5))
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false)
            }
        }
        getMovie()

        return () => {
            setMovie(null)
            setCast(null)
            setTrailerUrl(null)
            setIsTrailerOpened(false)
        }
    }, [movieId])
    return (
        <>
            {loading && <div className="loading-container"><Loading /></div>}
            <div>
                {!loading && <MoviePageHeader trailerUrl={trailerUrl} isTrailerOpened={isTrailerOpened} onTrailer={() => setIsTrailerOpened(prev => !prev)} movie={movie} cast={cast} />

                }
            </div>
            {
                !loading && <MoviePageMain trailerUrl={trailerUrl} isTrailerOpened={isTrailerOpened} movie={movie} isSeries={series}/>
            }
        </>
    )
}

export default MoviePage