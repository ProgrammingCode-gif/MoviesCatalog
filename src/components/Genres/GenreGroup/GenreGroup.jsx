import React from 'react';
import styles from './GenreGroup.module.css';
import Container from '../../Container/Container';
import MovieSlider from '../../MovieScroll/MovieSlider';

const GenreGroup = ({ genre, index, movies, onReachEnd }) => {
    const name = genre.name.charAt(0).toUpperCase() + genre.name.slice(1);

    return (
        <div className={styles.wrapper}>
            <Container>
                <p className={styles.title}>{name}</p>
            </Container>
            <MovieSlider
                movies={movies}
                genreId={genre.id}
                isInfinite={true}
                onReachEnd={onReachEnd}
            />
        </div>
    );
};

export default GenreGroup;