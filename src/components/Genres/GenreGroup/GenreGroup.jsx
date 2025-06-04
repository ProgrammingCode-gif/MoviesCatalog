import React from 'react';
import styles from './GenreGroup.module.css';
import Container from '../../Container/Container';
import MovieSlider from '../../MovieScroll/MovieSlider';

const GenreGroup = ({ genre, index, movies, onReachEnd }) => {
    const isBlack = index % 2 === 0;
    const wrapperStyles = isBlack ? styles.wrapperBlack : styles.wrapperGrey;

    const name = genre.name.charAt(0).toUpperCase() + genre.name.slice(1);

    return (
        <div className={wrapperStyles}>
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