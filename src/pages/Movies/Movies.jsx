import React, { useEffect, useState } from 'react'
import MovieListInfinite from '../../components/MovieListInfinite/MovieListInfinite'
import Container from '../../components/Container/Container'
import styles from './Movies.module.css'
import api from '../../services/api'
import MovieSwapper from '../../components/MovieSwapper/MovieSwapper'
import Loading from '../../components/Loading/Loading'

const Movies = () => {

    const [swapperContent, setSwapperContent] = useState([])
    const [content, setContent] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getContent = async () => {
            try {
                if (page === 1) {
                    setLoading(true)
                    const swapperData = await api.getTrendingMovies()
                    setSwapperContent(swapperData)
                }
                const contentData = await api.getPopularMovies(page)
                setContent((prev) => {
                    const combined = [...prev, ...contentData]
                    const unique = Array.from(new Set(combined.map(movie => movie.id)))
                        .map(id => combined.find(movie => movie.id === id))
                    return unique
                })

            } catch (error) {
                console.error('Ошибка при получении сериалов:', error)
            } finally {
                if (page === 1) setLoading(false)
            }
        }
        getContent()
    }, [page])

    return (
        <div className={styles.wrapper}>
            {loading ? <Loading /> : <>
                <MovieSwapper content={swapperContent} />
                <Container>
                    <h2 className={styles.title}>Популярные фильмы</h2>
                    <MovieListInfinite onPage={setPage} content={content} />
                </Container>
            </>}
        </div>
    )
}

export default Movies