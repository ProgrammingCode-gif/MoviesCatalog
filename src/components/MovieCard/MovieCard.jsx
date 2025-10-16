import styles from './MovieCard.module.css'
import Skeleton from 'react-loading-skeleton'

const MovieCard = ({ title, posterPath}) => {
    return (
        <div className={styles.movieCard}>
            <img className={styles.movieCardImg} src={`https://image.tmdb.org/t/p/w500${posterPath}`} alt="" />
            { title && <p className={styles.movieCardAbout}>{title}</p>}
        </div>
    )
}

export default MovieCard