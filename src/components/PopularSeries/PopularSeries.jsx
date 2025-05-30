import React, { useEffect, useState } from 'react'
import styles from './PopularSeries.module.css'
import Container from '../Container/Container'
import api from '../../services/api'
import MovieSlider from '../MovieScroll/MovieSlider'

import { IoIosArrowForward } from "react-icons/io";

const PopularSeries = ({series}) => {

    return (
        <section className={styles.series}>
            <Container>
                <h2 className={styles.seriesTitle}>Сериалы <IoIosArrowForward /></h2>
            </Container>
                <MovieSlider series={true} movies={series}></MovieSlider>
        </section>
    )
}

export default PopularSeries