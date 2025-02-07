import React from 'react'
import styles from './SwapperNextLoading.module.css'

const SwapperNextLoading = ({nextMovie}) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.left}>
                <p className={styles.text}>Далее:</p>
                <p className={styles.title}>{nextMovie.title}</p>
            </div>
            <div className={styles.right}>
                <img className={styles.poster} src={`https://image.tmdb.org/t/p/original${nextMovie.backdrop_path}`} alt="" />
            </div>
            <div className={styles.loading}></div>
        </div>
    )
}

export default SwapperNextLoading