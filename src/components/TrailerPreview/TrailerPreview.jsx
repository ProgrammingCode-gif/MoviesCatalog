import React, { useEffect, useState } from 'react'
import Container from '../Container/Container'
import api from '../../services/api'
import utils from '../../utils/utils'

import styles from './TrailerPreview.module.css'

const TrailerPreview = ({ movieId }) => {
    const [movieDetails, setMovieDetails] = useState([])
    const [castInfo, setCastInfo] = useState([])
    const [trailerUrl, setTrailerUrl] = useState();
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getInfo = async () => {
            try {
                const data = await api.getMovieDetails(movieId)
                const cast = await api.getCast(movieId)
                const videoUrl = await api.getMovieTrailerUrl(movieId)

                setMovieDetails(data)
                setCastInfo(cast.slice(0, 5))
                setTrailerUrl(videoUrl)
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false)
            }
        }
        getInfo()
    }, [])

    return (
        <div className={styles.wrapper}>
            <Container className={styles.container}>
                {
                    !loading &&
                    <>
                        <div className={styles.left}>

                            <h2 className={styles.title}>{movieDetails.title}</h2>
                            <p className={styles.overview}>{movieDetails.overview}</p>
                            <div className={styles.info}>
                                <p>{movieDetails.release_date.split('').slice(0, 4).join('')} {movieDetails.genres?.map(genre => `${genre.name} `)}</p>
                                <p>{utils.convertMinutes(movieDetails.runtime).hours}ч {utils.convertMinutes(movieDetails.runtime).minutes}мин</p>
                            </div>
                            <div className={styles.actors}>
                                {castInfo.map(actor => (
                                    <div className={styles.actorInfo} key={actor.id}>
                                        <img className={styles.actorPhoto} src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} alt="" />
                                        <p>
                                            {actor.name}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {trailerUrl &&

                            <div className={styles.right}>
                                <iframe className={styles.video} src={trailerUrl} allow='autoplay; encrypted-media' frameBorder="0" placeInline></iframe>
                                <div className={styles.overlay}></div>
                            </div>
                        }
                    </>
                }
            </Container>
        </div>
    )
}

export default TrailerPreview