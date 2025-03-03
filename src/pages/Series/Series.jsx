import React from 'react'
import MovieListInfinite from '../../components/MovieListInfinite/MovieListInfinite'
import Container from '../../components/Container/Container'

import styles from './Series.module.css'
import api from '../../services/api'

const Series = () => {
    return (
        <div className={styles.wrapper}>
            <Container>
                <MovieListInfinite fetching={api.getTrendingSeries} />
            </Container>
        </div>
    )
}

export default Series