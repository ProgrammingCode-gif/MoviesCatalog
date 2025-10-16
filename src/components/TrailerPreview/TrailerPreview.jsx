import { useEffect, useState } from 'react'
import Container from '../Container/Container'
import api from '../../services/api'
import utils from '../../utils/utils'

import styles from './TrailerPreview.module.css'
import ActorCard from '../ActorCard/ActorCard'
import { Link } from 'react-router-dom'

import { TbListDetails } from "react-icons/tb";
import { useQuery } from '@tanstack/react-query'


const TrailerPreview = ({ movieId }) => {
    const { data, isLoading } = useQuery({
        queryKey: ["trailer"],
        queryFn: async () => {
            const [movieDetails, castInfo, trailerUrl] = await Promise.all([
                api.getMovieDetails(movieId),
                api.getCast(movieId),
                api.getMovieTrailerUrl(movieId)
            ])
            return {movieDetails, castInfo: castInfo.slice(0,5), trailerUrl}
        }
    })

    if(!movieId) return
    return (
        <div className={styles.wrapper}>
            <Container className={styles.container}>
                {
                    !isLoading && data.movieDetails &&
                    <>
                        <div className={styles.left}>

                            <h2 className={styles.title}>{data.movieDetails.title}</h2>
                            <p className={styles.overview}>{data.movieDetails.overview}</p>
                            <div className={styles.info}>
                                {data.movieDetails.release_date &&
                                    <p>{data.movieDetails.release_date.split('').slice(0, 4).join('')} {data.movieDetails.genres?.map(genre => `${genre.name} `)}</p>
                                }
                                <p>{utils.convertMinutes(data.movieDetails.runtime).hours}ч {utils.convertMinutes(data.movieDetails.runtime).minutes}мин</p>
                            </div>
                            <div className={styles.actors}>
                                {data.castInfo.map(actor => (
                                    <ActorCard key={actor.id} actor={actor} />
                                ))}
                            </div>
                            <Link className={styles.btn} to={`/movies/${data.movieDetails.id}`}>
                                <TbListDetails />Подробнее
                            </Link>
                        </div>
                        {data.trailerUrl ?

                            <div className={styles.right}>
                                { data.trailerUrl &&  <iframe className={styles.video} src={data.trailerUrl} allow='autoplay; encrypted-media' frameBorder="0"></iframe> }
                                <div className={styles.overlay}></div>
                            </div> :
                            <div className={styles.rightPoster}>
                                <div className={styles.posterWrapper}>
                                    <img className={styles.poster} src={`https://image.tmdb.org/t/p/original${data.movieDetails.backdrop_path}`} alt="" />
                                    <div className={styles.overlay}></div>
                                </div>
                            </div>
                        }
                    </>
                }
            </Container>
        </div>
    )
}

export default TrailerPreview