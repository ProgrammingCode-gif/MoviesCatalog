import React, { useEffect, useState } from 'react'
import styles from './TopRated.module.css'
import Container from '../Container/Container'
import MovieSlider from '../MovieScroll/MovieSlider'
import api from '../../services/api'

const TopRated = () => {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getMovies = async() => {
            try {
                const data = await api.getTopTenRatedMovies()
                setMovies(data)
            } catch (error) {
                console.log('Ошибка при получении топ фильмов в компонент:', error);
            } finally {
                setLoading(false)
            }
        }
        getMovies()
    }, [])
    return (
        <section className={styles.topRated}>
            <Container>
                <h2 className={styles.title}>Топ <span>10</span></h2>
            </Container>
             {
                !loading && <MovieSlider topRated={true} movies={movies}/>
             }
        </section>
    )
}

export default TopRated