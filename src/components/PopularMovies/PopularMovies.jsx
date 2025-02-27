import React, { useEffect, useState } from 'react'
import styles from './PopularMovies.module.css'
import api from '../../services/api'
import Container from '../Container/Container'
import MovieSlider from '../MovieScroll/MovieSlider'

import { IoIosArrowForward } from "react-icons/io";
import TrailerPreview from '../TrailerPreview/TrailerPreview'

const Popular = ({ onTrailer}) => {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const [movieWithTrailerId, setMovieWithTrailerId] = useState()

    useEffect(() => {
        const getMovies = async () => {
            try {
                const movies = await api.getPopularMovies()
                const randomMovie = movies[Math.floor(Math.random() * movies.length)]
                onTrailer(randomMovie.id)
                setMovies(movies)
            } catch (error) {
                console.log('Ошибка при получении фильмов');
            } finally {
                setLoading(false)
            }
        }
        getMovies()
    }, [])

    return (
        <section className={styles.popular}>
            <Container>
                <h2 className={styles.title}>Популярное <IoIosArrowForward /></h2>
            </Container>
            {!loading &&
                <MovieSlider movies={movies}></MovieSlider>
            }
        </section>
    )
}

export default Popular