import React, { useEffect, useState } from 'react'
import styles from './MoviePageMain.module.css'
import Container from '../Container/Container'
import utils from '../../utils/utils'
import MovieSlider from '../MovieScroll/MovieSlider'
import api from '../../services/api'

const MoviePageMain = ({ movie }) => {
    const [recomendations, setRecomendations] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const getRecommendations = async () => {
            try {
                setLoading(true)
                const data = await api.getRecomendations(movie.id)
                setRecomendations(data)
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false)
            }
        }
        getRecommendations()
    }, [movie.id])
    return (
        <main className={styles.main}>
            <Container>
                <div className={styles.info}>
                    <div className={styles.infoItem}>
                        <p className={styles.infoItemTitle}>Бюджет</p>
                        <p className={styles.infoItemValue}>{utils.formatCurrency(movie.budget)}</p>
                    </div>
                    <div className={styles.infoItem}>
                        <p className={styles.infoItemTitle}>Сборы</p>
                        <p className={styles.infoItemValue}>{utils.formatCurrency(movie.revenue)}</p>
                    </div>
                    <div className={styles.infoItem}>
                        <p className={styles.infoItemTitle}>Статус</p>
                        <p className={styles.infoItemValue}>{movie.status == 'Released' ? 'Выпущено' : ''}</p>
                    </div>
                    <div className={styles.infoItem}>
                        <p className={styles.infoItemTitle}>Исходное название</p>
                        <p className={styles.infoItemValue}>{movie.original_title}</p>
                    </div>
                </div>
            </Container>
                <div className={styles.recomendations}>
                    <Container>
                        <p className={styles.recomendationsText}>Рекомендации</p>
                    </Container>
                    {
                        !loading &&
                    <MovieSlider movies={recomendations} />
                    }
                </div>
        </main>
    )
}

export default MoviePageMain