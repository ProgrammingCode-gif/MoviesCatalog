import { useEffect } from 'react'
import styles from './PopularMovies.module.css'

import Container from '../Container/Container'
import MovieSlider from '../MovieScroll/MovieSlider'

import { IoIosArrowForward } from "react-icons/io";
import { Link } from 'react-router-dom'

const Popular = ({onTrailer, movies}) => {

    useEffect(() => {
        const getMovies = async () => {
            try {
                const randomMovie = movies[Math.floor(Math.random() * movies.length)]
                onTrailer(randomMovie.id)
            } catch (error) {
                console.log('Ошибка при получении фильмов');
            } finally {
            }
        }
        getMovies()
    }, [])

    return (
        <section className={styles.popular}>
            <Container>
                <Link to={"/movies"} className={styles.title}>Популярное <IoIosArrowForward /></Link>
            </Container>

            <MovieSlider movies={movies}></MovieSlider>

        </section>
    )
}

export default Popular