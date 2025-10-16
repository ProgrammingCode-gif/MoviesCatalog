import React, { useEffect, useState } from 'react'
import styles from './PopularSeries.module.css'
import Container from '../Container/Container'
import api from '../../services/api'
import MovieSlider from '../MovieScroll/MovieSlider'

import { IoIosArrowForward } from "react-icons/io";
import { Link } from 'react-router-dom'

const PopularSeries = ({series, loading}) => {

    return (
        <section className={styles.series}>
            <Container>
                <Link to={"/series"} className={styles.seriesTitle}>Сериалы <IoIosArrowForward /></Link>
            </Container>
                <MovieSlider loading={loading} series={true} movies={series}></MovieSlider>
        </section>
    )
}

export default PopularSeries