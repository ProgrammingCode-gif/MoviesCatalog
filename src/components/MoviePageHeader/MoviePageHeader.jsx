import React from 'react'
import styles from './MoviePageHeader.module.css'
import Container from '../Container/Container'
import { FaPlay } from "react-icons/fa";
import ActorCard from '../ActorCard/ActorCard';

const MoviePageHeader = ({ movie, cast, onTrailer, isTrailerOpened }) => {
    return (
        <div className={styles.wrapper}>
            <Container className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.left}>
                        <div className={styles.about}>
                            <h2 className={styles.title}>{movie.title || movie.name}</h2>
                            <div className={styles.genres}>
                                <p className={styles.overview}>{movie.overview}</p>
                                <p className={styles.genres}>{movie.genres?.map(genre => `${genre.name},  `)} {movie.release_date?.split('').slice(0, 4).join('') || movie.first_air_date?.split('').slice(0, 4).join('')}</p>
                            </div>
                        </div>

                        <button className={styles.btn} onClick={onTrailer}>
                            <FaPlay />
                            <p>
                                {isTrailerOpened ? 'Закрыть трейлер' : 'Смотреть трейлер'}
                            </p>
                        </button>
                    </div>
                    <div className={styles.right}>
                        <img className={styles.poster} src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt="" />
                    </div>
                </div>

                <p className={styles.actorsText}>В главных ролях:</p>

                <div className={styles.bottom}>
                    {cast.map(actor => <ActorCard key={actor.id} actor={actor} />)}
                </div>
            </Container>
            <div className={styles.rightBackground}>
                <img className={styles.backdrop} src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt="" />
                <div className={styles.backdropOverlay}></div>
            </div>
        </div>
    )
}

export default MoviePageHeader