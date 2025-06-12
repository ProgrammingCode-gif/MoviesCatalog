import { motion } from 'framer-motion'
import { SwiperSlide } from 'swiper/react'
import Container from '../Container/Container'
import SwapperNextLoading from '../SwapperNextLoading/SwapperNextLoading'
import styles from './MovieSwapperItem.module.css'
import { Link } from 'react-router-dom'

const MovieSwapperItem = ({ movie, activeMovie, movies, nextMovieIndex, setActiveMovie }) => {
    return (

            <div className={styles.wrapper}>
                <div className={styles.currentMovie}>
                    {activeMovie && activeMovie.id === movie.id && (
                        <Container className={styles.currentMovieAbout}>
                            <motion.h1
                                className={styles.currentMovieTitle}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.8 }}
                            >
                                {movie.title || movie.name}
                            </motion.h1>

                            <motion.p
                                className={styles.currentMovieText}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 1, delay: 0.2 }}
                            >
                                {movie.overview}
                            </motion.p>
                            <Link to={movie.title ? `/movies/${movie.id}` : `/series/${movie.id}`}>
                                <motion.button
                                    className={styles.currentMovieBtn}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 1, ease: "easeInOut" }}
                                >
                                    Подробнее
                                </motion.button>
                            </Link>
                        </Container>
                    )}
                    <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt="" />
                </div>
                <div></div>
                {activeMovie && activeMovie.id === movie.id && (
                    <motion.div
                        className={styles.nextMovie}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 1, delay: 0.2 }}
                    >
                        <SwapperNextLoading setNextMovie={setActiveMovie} nextMovie={movies[nextMovieIndex]} />
                    </motion.div>)}
            </div>
    )
}

export default MovieSwapperItem