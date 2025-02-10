import React, { useEffect, useState } from 'react'
import Container from '../Container/Container'
import api from '../../services/api'

const TrailerPreview = ({ movieId }) => {
    const [movieDetails, setMovieDetails] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getGenres = async () => {
            try {
                const data = await api.getMovieDetails(movieId)
                setMovieDetails(data)
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false)
            }
        }
        getGenres()
    }, [])

    return (
        <div>
            <Container>
                {
                    !loading &&
                    <>
                        <h2>{movieDetails.title}</h2>
                        <p>{movieDetails.overview}</p>
                        <div>
                            <p>{movieDetails.year}</p>
                            <p>{movieDetails.genres?.map(genre => `${genre.name} `)}</p>
                        </div>
                    </>
                }
            </Container>
        </div>
    )
}

export default TrailerPreview