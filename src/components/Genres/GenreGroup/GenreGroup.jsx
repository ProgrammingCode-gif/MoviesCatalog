import React, { useEffect, useState } from 'react';
import styles from './GenreGroup.module.css';
import Container from '../../Container/Container';
import api from '../../../services/api';
import MovieSlider from '../../MovieScroll/MovieSlider';

const GenreGroup = ({ genre, index }) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    const isBlack = index % 2 === 0;
    const wrapperStyles = isBlack ? styles.wrapperBlack : styles.wrapperGrey;

    const name = genre.name.charAt(0).toUpperCase() + genre.name.slice(1);

    const fetchMovies = async (pageNumber) => {
        try {
            setLoading(true);
            const data = await api.getMoviesByGenre(genre.id, pageNumber);
            console.log(data);
            
            setMovies((prevMovies) => {
                const movieIds = new Set(prevMovies.map((movie) => movie.id));
                const filteredMovies = data.filter((movie) => !movieIds.has(movie.id));
                return [...prevMovies, ...filteredMovies];
            });

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies(page);
    }, [page]);

    return (
        <div className={wrapperStyles}>
            <Container>
                <p className={styles.title}>{name}</p>
            </Container>
            <MovieSlider
                movies={movies}
                loading={loading}
                genreId={genre.id}
                isInfinite={true}
                onReachEnd={() => {
                    setPage((prevPage) => prevPage + 1);
                }}
            />
        </div>
    );
};

export default GenreGroup;