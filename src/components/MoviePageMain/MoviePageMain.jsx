import React, { useEffect, useState } from 'react'
import styles from './MoviePageMain.module.css'
import Container from '../Container/Container'
import utils from '../../utils/utils'
import MovieSlider from '../MovieScroll/MovieSlider'
import api from '../../services/api'

const MoviePageMain = ({ movie, isSeries = false }) => {
    const [recomendations, setRecomendations] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getRecommendations = async () => {
            try {
                setLoading(true)
                const data = await api.getRecomendations(movie.id, isSeries)
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
                        <p className={styles.infoItemTitle}>{isSeries ? 'Сезонов' : 'Сборы'}</p>
                        <p className={styles.infoItemValue}>{isSeries ? movie.number_of_seasons : (movie.budget != 0 ? utils.formatCurrency(movie.budget) : "Неизвестно")}</p>
                    </div>
                    <div className={styles.infoItem}>
                        <p className={styles.infoItemTitle}>{isSeries ? 'Эпизодов' : 'Сборы'}</p>
                        <p className={styles.infoItemValue}>{isSeries ? movie.number_of_episodes : (movie.revenue != 0 ? utils.formatCurrency(movie.revenue) : "Неизвестно")}</p>
                    </div>
                    <div className={styles.infoItem}>
                        <p className={styles.infoItemTitle}>Статус</p>
                        <p className={styles.infoItemValue}>{movie.status == 'Released' ? 'Выпущено' : 'В разработке' || movie.status == 'Ended' ? 'Завершен' : 'Выпускается'}</p>
                    </div>
                    <div className={styles.infoItem}>
                        <p className={styles.infoItemTitle}>Исходное название</p>
                        <p className={styles.infoItemValue}>{movie.original_title || movie.original_name}</p>
                    </div>
                </div>
            </Container>
                <div className={styles.recomendations}>
                    <Container>
                        <p className={styles.recomendationsText}>Рекомендации</p>
                    </Container>
                    {
                        !loading &&
                    <MovieSlider series={isSeries} movies={recomendations} />
                    }
                </div>
        </main>
    )
}

export default MoviePageMain