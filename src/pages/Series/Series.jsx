import React from 'react'
import MovieListInfinite from '../../components/MovieListInfinite/MovieListInfinite'
import Container from '../../components/Container/Container'

import styles from './Series.module.css'
import api from '../../services/api'
import MovieSwapper from '../../components/MovieSwapper/MovieSwapper'

const Series = () => {
    return (
        <div className={styles.wrapper}>
            <MovieSwapper fetching={api.getTrendingSeries} />
            <Container>
            <h2 className={styles.title}>Популярные сериалы</h2>
                <MovieListInfinite fetching={api.getTrendingSeries} />
            </Container>
        </div>
    )
}

export default Series