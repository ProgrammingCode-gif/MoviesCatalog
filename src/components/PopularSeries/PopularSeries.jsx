import React, { useEffect, useState } from 'react'
import styles from './PopularSeries.module.css'
import Container from '../Container/Container'
import api from '../../services/api'
import MovieSlider from '../MovieScroll/MovieSlider'

import { IoIosArrowForward } from "react-icons/io";

const PopularSeries = () => {
    const [series, setSeries] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getSeries = async () => {
            try {
                const data = await api.getTrendingSeries()
                setSeries(data)
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false)
            }
        }
        getSeries()
    }, [])

    return (
        <section className={styles.series}>
            <Container>
                <h2 className={styles.seriesTitle}>Сериалы <IoIosArrowForward /></h2>
            </Container>
            {!loading && 
                <MovieSlider series={true} movies={series}></MovieSlider>
            }
        </section>
    )
}

export default PopularSeries