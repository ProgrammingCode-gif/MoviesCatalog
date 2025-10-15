import { useEffect, useState } from 'react'
import styles from './Genres.module.css'
import api from '../../services/api'

import GenreGroup from '../../components/Genres/GenreGroup/GenreGroup'
import Loading from '../../components/Loading/Loading'
import { useQuery } from '@tanstack/react-query'

const Genres = () => {
    const [genres, setGenres] = useState([])
    const [genreMovies, setGenreMovies] = useState({});
    const [loading, setLoading] = useState(true)

    // const { } = useQuery({
    //     queryKey: ["genresData"],
    //     queryFn: async () => {
    //         const genres = await api.getMoviesGenres()
    //         const moviesPromises = genresData.map(async (genre) => {
    //             const movies = await api.getMoviesByGenre(genre.id, 1);
    //             return {
    //                 id: genre.id,
    //                 data: {
    //                     page: 1,
    //                     movies,
    //                 }
    //             };
    //         })
    //         const moviesData = await Promise.all(moviesPromises)
    //         const moviesByGenre = {}
    //         moviesData.forEach(({ id, data }) => {
    //             moviesByGenre[id] = data;
    //         });

    //         return {genres, genreMovies: moviesByGenre }
    //     }
    // })

    useEffect(() => {
        const getGenres = async () => {
            try {
                setLoading(true)
                const genresData = await api.getMoviesGenres()
                setGenres(genresData);

                const moviesPromises = genresData.map(async (genre) => {
                    const movies = await api.getMoviesByGenre(genre.id, 1);
                    return {
                        id: genre.id,
                        data: {
                            page: 1,
                            movies,
                        }
                    };
                })

                const moviesData = await Promise.all(moviesPromises);
                const moviesByGenre = {}

                moviesData.forEach(({ id, data }) => {
                    moviesByGenre[id] = data;
                });

                setGenreMovies(moviesByGenre);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false)
            }
        }

        getGenres()
    }, [])

    const handleMoreMovies = async (genreId) => {
        const genreData = genreMovies[genreId];
        const nextPage = genreData.page + 1;

        try {
            const newMovies = await api.getMoviesByGenre(genreId, nextPage);
            const existingIds = new Set(genreData.movies.map(movie => movie.id));
            const filteredMovies = newMovies.filter(movie => !existingIds.has(movie.id));
            setGenreMovies((prev) => ({
                ...prev,
                [genreId]: {
                    page: nextPage,
                    movies: [...prev[genreId].movies, ...filteredMovies],
                },
            }));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={styles.wrapper}>
            {loading ? <Loading /> :
                genres.map((genre, index) => (
                    <GenreGroup
                        key={genre.id}
                        genre={genre}
                        index={index}
                        movies={genreMovies[genre.id]?.movies || []}
                        onReachEnd={() => handleMoreMovies(genre.id)}
                    />
                ))
            }
        </div>
    )
}

export default Genres