import React from 'react'
import styles from './MovieList.module.css'
import MovieCard from '../MovieCard/MovieCard'
import { Link } from 'react-router-dom'

const MovieList = ({movies}) => {
    return (
        <div className={styles.movieList}>
            {movies.map((movie) => (
                <Link to={movie.media_type == "movie" ? `/movies/${movie.id}` : `/series/${movie.id}`}>
                    <MovieCard title={movie.title || movie.name} posterPath={movie.poster_path}/>
                </Link>
            ))}
        </div>
        
    )
}

export default MovieList