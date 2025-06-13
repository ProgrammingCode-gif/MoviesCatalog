import React, { useEffect, useState } from 'react'
import styles from './SearchRecomendations.module.css'
import api from '../../services/api'
import MovieSlider from '../MovieScroll/MovieSlider'
import Container from '../Container/Container'

const SearchRecomendations = () => {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)

    useEffect(() => {
        const getSeries = async () => {
            try {
                const data = await api.getTrendingMoviesAndSeries(page)

                setMovies((prev) => {
                    const combined = [...prev, ...data]
                    const unique = Array.from(new Set(combined.map(movie => movie.id)))
                        .map(id => combined.find(movie => movie.id === id))
                    return unique
                })
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false)
            }
        }
        getSeries()
    }, [page])

    return (
        <section className={styles.searchRecomendations}>
            <Container>
                <h2 className={styles.title}>Чаще всего ищут</h2>
            </Container>
            {!loading && 
                <MovieSlider onReachEnd={() => setPage(prev => prev + 1)} movies={movies}></MovieSlider>
            }
        </section>
    )
}

export default SearchRecomendations