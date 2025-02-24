import React from 'react'
import styles from './MovieListCard.module.css'

const MovieListCard = ({posterPath, title}) => {
    return (
        <div className={styles.movieCard}>
            <img className={styles.movieCardImg} src={`https://image.tmdb.org/t/p/w500${posterPath}`} alt="" />
            {title && <p className={styles.movieCardAbout}>{title}</p>}
        </div>
    )
}

export default MovieListCard