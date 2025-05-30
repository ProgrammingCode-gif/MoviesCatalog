import React, { useEffect, useState } from 'react'
import MovieListInfinite from '../../components/MovieListInfinite/MovieListInfinite'
import Container from '../../components/Container/Container'

import styles from './Series.module.css'
import api from '../../services/api'
import MovieSwapper from '../../components/MovieSwapper/MovieSwapper'
import Loading from '../../components/Loading/Loading'

const Series = () => {
    const [swapperSeries, setSwapperSeries] = useState([])
    const [series, setSeries] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getSeries = async () => {
            try {
                if(page === 1) {
                    setLoading(true)
                    const swapperData = await api.getTrendingSeries()
                    setSwapperSeries(swapperData)
                }
                const seriesData = await api.getTrendingSeries(page)
                setSeries((prev) => {
                    const combined = [...prev, ...seriesData]
                    const unique = Array.from(new Set(combined.map(movie => movie.id)))
                        .map(id => combined.find(movie => movie.id === id))
                    return unique
                })

            } catch (error) {
                console.error('Ошибка при получении сериалов:', error)
            } finally {
                if(page===1) setLoading(false)
            }
        }
        getSeries()
    }, [page])

    return (
        <div className={styles.wrapper}>
            {loading ? <Loading /> : <>
            <MovieSwapper content={series}/>
            <Container>
            <h2 className={styles.title}>Популярные сериалы</h2>
                <MovieListInfinite content={series} onPage={setPage} />
            </Container>
            </>}
        </div>
    )
}

export default Series