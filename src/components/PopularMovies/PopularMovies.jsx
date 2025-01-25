import React, { useEffect, useState } from 'react'
import styles from './PopularMovies.module.css'
import api from '../../services/api'
import Container from '../Container/Container'
import MovieSlider from '../MovieScroll/MovieSlider'

import { IoIosArrowForward } from "react-icons/io";

const Popular = () => {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getMovies = async () => {
            try {
                const movies = await api.getPopularMovies()
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