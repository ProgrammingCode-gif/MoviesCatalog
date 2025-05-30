import React, { useEffect, useState } from 'react'
import styles from './Genres.module.css'
import Container from '../../components/Container/Container'
import api from '../../services/api'
import GenreGroup from '../../components/Genres/GenreGroup/GenreGroup'

const Genres = () => {
    const [genres, setGenres] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getGenres = async () => {
            try {
                setLoading(true)
                const data = await api.getMoviesGenres()
                setGenres(data)
                
            } catch (error) {
                
            } finally {
                setLoading(false)
            }
        }

        getGenres()
    }, [])

    return (
        <div className={styles.wrapper}>
            {/* <Container>
                <h2 className={styles.title}>Жанры</h2>
            </Container> */}
            {loading ? <div className={styles.loading}>Загрузка...</div> : 
                genres.map((genre, index) => (
                    <GenreGroup index={index} key={genre.id} genre={genre} />
                ))
            }
        </div>
    )
}

export default Genres