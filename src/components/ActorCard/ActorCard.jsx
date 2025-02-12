import React, { act } from 'react'
import styles from './ActorCard.module.css'

const ActorCard = ({ actor }) => {
    return (
        <div className={styles.actorInfo}>
            {actor.profile_path && <img className={styles.actorPhoto} src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} alt="" />}
            <p className={styles.actorName}>
                {actor.name}
            </p>
        </div>
    )
}

export default ActorCard