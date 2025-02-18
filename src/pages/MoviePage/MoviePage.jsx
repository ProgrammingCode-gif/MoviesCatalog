import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../services/api'
import MoviePageHeader from '../../components/MoviePageHeader/MoviePageHeader'
import MoviePageMain from '../../components/MoviePageMain/MoviePageMain'

const MoviePage = ({series = false}) => {
    const { movieId } = useParams()
    const [movie, setMovie] = useState()
    const [cast, setCast] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getMovie = async () => {
            try {
                setLoading(true)
                const data = await api.getMovieDetails(movieId, series)
                const castData = await api.getCast(movieId, series)
                setMovie(data)
                setCast(castData.slice(0, 5))
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false)
            }
        }
        getMovie()
    }, [movieId])
    return (
        <>
            <div>
                {!loading && <MoviePageHeader movie={movie} cast={cast} />

                }
            </div>
            {
                !loading && <MoviePageMain movie={movie} isSeries={series}/>
            }
        </>
    )
}

export default MoviePage