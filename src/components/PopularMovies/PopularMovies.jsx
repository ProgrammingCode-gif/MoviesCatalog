import React, { useEffect, useState } from 'react'
import styles from './PopularMovies.module.css'
import api from '../../services/api'
import Container from '../Container/Container'
import MovieSlider from '../MovieScroll/MovieSlider'

import { IoIosArrowForward } from "react-icons/io";
import TrailerPreview from '../TrailerPreview/TrailerPreview'

const Popular = ({onTrailer, movies}) => {
    const [movieWithTrailerId, setMovieWithTrailerId] = useState()

    useEffect(() => {
        const getMovies = async () => {
            try {
                const randomMovie = movies[Math.floor(Math.random() * movies.length)]
                onTrailer(randomMovie.id)
            } catch (error) {
                console.log('Ошибка при получении фильмов');
            } finally {
            }
        }
        getMovies()
    }, [])

    return (
        <section className={styles.popular}>
            <Container>
                <h2 className={styles.title}>Популярное <IoIosArrowForward /></h2>
            </Container>

            <MovieSlider movies={movies}></MovieSlider>

        </section>
    )
}

export default Popular