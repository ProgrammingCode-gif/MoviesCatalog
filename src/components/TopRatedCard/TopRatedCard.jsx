import React from 'react'
import styles from './TopRated.module.css'

const TopRatedCard = ({top, posterPath}) => {
  return (
    <div className={styles.card}>
        <div className={styles.left}>
            <h2 className={styles.ranking}>{top}</h2>
        </div>
        <div className={styles.right}>
            <img className={styles.poster} src={`https://image.tmdb.org/t/p/w500${posterPath}`} alt="" />
        </div>
    </div>
  )
}

export default TopRatedCard