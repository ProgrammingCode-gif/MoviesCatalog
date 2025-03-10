import React from 'react'
import MovieListInfinite from '../../components/MovieListInfinite/MovieListInfinite'
import Container from '../../components/Container/Container'
import styles from './Movies.module.css'
import api from '../../services/api'
import MovieSwapper from '../../components/MovieSwapper/MovieSwapper'

const Movies = () => {
    return (
        <div className={styles.wrapper}>
            <MovieSwapper fetching={api.getTrendingMovies} />
            <Container>
                <h2 className={styles.title}>Популярные фильмы</h2>
                <MovieListInfinite fetching={api.getPopularMovies} />
            </Container>
        </div>
    )
}

export default Movies