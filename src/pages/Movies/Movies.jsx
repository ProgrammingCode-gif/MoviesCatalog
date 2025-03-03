import React from 'react'
import MovieListInfinite from '../../components/MovieListInfinite/MovieListInfinite'
import Container from '../../components/Container/Container'

import styles from './Movies.module.css'
import api from '../../services/api'

const Movies = () => {
    return (
        <div className={styles.wrapper}>
            <Container>
                <MovieListInfinite fetching={api.getPopularMovies} />
            </Container>
        </div>
    )
}

export default Movies