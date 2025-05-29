import React, { useEffect, useState } from 'react'
import styles from './GenreGroup.module.css'
import Container from '../../Container/Container'
import api from '../../../services/api';
import MovieSlider from '../../MovieScroll/MovieSlider';

const GenreGroup = ({genre, index}) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    const isBlack = index % 2 === 0;
    const wrapperStyles = isBlack ? styles.wrapperBlack : styles.wrapperGrey;

    const name = genre.name.charAt(0).toUpperCase() + genre.name.slice(1);

    useEffect(() => {
        const getMovies = async () => {
            try {
                setLoading(true);
                const data = await api.getMoviesByGenre(genre.id);
                setMovies(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        getMovies()
    }, [])

    return (
        <div className={wrapperStyles}>
            <Container>
                <p className={styles.title}>{name}</p>
            </Container>
            <MovieSlider movies={movies} loading={loading} genreId={genre.id} />
        </div>
  )
}

export default GenreGroup