import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY
const BASE_URL = import.meta.env.VITE_BASE_URL

const params = {
    headers: {
        Authorization: `Bearer ${API_KEY}`
    },
    params: {
        language: 'ru-RU',
        include_adult: false,
        certification_country: 'US',
        'certification.lte': 'R',
    }
}

const headers = {
    Authorization: `Bearer ${API_KEY}`
}

class API {
    async getPopularMovies(page = 1) {
        try {
            const response = await axios.get(`${BASE_URL}/trending/movie/week?page=${page}&include_adults=false`, params)
            return response.data.results.filter(movie => 
                !movie.adult &&
                movie.original_language !== "hi" &&
                movie.original_language !== "ta" &&
                movie.original_language !== "te" &&
                movie.original_language !== "ml"
            )
        } catch (error) {
            console.log('Ошибка при получении популярных фильмов:', error);
            return []
        }
    }

    async getTrendingSeries(page = 1) {
        try {
            const response = await axios.get(`${BASE_URL}/trending/tv/week?page=${page}&include_adults=false`, params)
            return response.data.results.filter(movie => 
                !movie.adult &&
                movie.original_language !== "hi" &&
                movie.original_language !== "ta" &&
                movie.original_language !== "te" &&
                movie.original_language !== "ml"
            )
        } catch (error) {
            console.log('Ошибка при получении сериалов:', error)
            return []
        }
    }
    async getMovieTrailerUrl(movieId, mute = 1, series=false) {
        try {
            const response = await axios.get(`${BASE_URL}/${series ? "tv" : "movie"}/${movieId}/videos`, params);
            const trailer = response.data.results.find(
                (video) => video.type === 'Trailer' && video.site === 'YouTube'
            );

            return trailer ? `https://www.youtube.com/embed/${trailer.key}?autoplay=1&loop=1&controls=0&mute=${mute}&playlist=${trailer.key}` : null;
        } catch (error) {
            console.error('Ошибка при получении трейлера:', error);
            return ''
        }
    }

    async getTopTenRatedMovies(page = 1) {
        try {
            const response = await axios.get(`${BASE_URL}/movie/top_rated?include_adults=false&page=${page || 1}`, params)
            return response.data.results.filter(movie => 
                !movie.adult &&
                movie.original_language !== "hi" &&
                movie.original_language !== "ta" &&
                movie.original_language !== "te" &&
                movie.original_language !== "ml"
            ).slice(0, 10)
        } catch (error) {
            console.log(error);
            return []
        }
    }

    async getTrendingMovies(page = 1) {
        try {
            const response = await axios.get(`${BASE_URL}/trending/movie/week?include_adults=false&page=${page || 1}`, params)
            return response.data.results.filter(movie => 
                !movie.adult &&
                movie.original_language !== "hi" &&
                movie.original_language !== "ta" &&
                movie.original_language !== "te" &&
                movie.original_language !== "ml"
            ).slice(0, 8)
        } catch (error) {
            console.log(error);
            return []
        }
    }

    async getTrendingMoviesAndSeries(page = 1) {
        try {
            const response = await axios.get(`${BASE_URL}/trending/all/week?include_adults=false&page=${page || 1}`, params)
            return response.data.results.filter((movie) => 
                movie.media_type != 'person' && !movie.adult &&
                movie.original_language !== "hi" &&
                movie.original_language !== "ta" &&
                movie.original_language !== "te" &&
                movie.original_language !== "ml")
        } catch (error) {
            console.log(error);
            return []
        }
    }

    async getMovieDetails(movieId, isSeries = false) {
        try {
            const url = isSeries ? `${BASE_URL}/tv/${movieId}?language=ru-RU` : `${BASE_URL}/movie/${movieId}?language=ru-RU`
            const response = await axios.get(url, params)
            return response.data
        } catch (error) {
            console.log(error);
            return []
        }
    }

    async getCast(movieId, isSeries = false) {
        try {
            const url = isSeries ? `${BASE_URL}/tv/${movieId}/credits?language=ru-RU` : `${BASE_URL}/movie/${movieId}/credits?language=ru-RU`
            const response = await axios.get(url, params)
            return response.data.cast
        } catch (error) {
            console.log(error);
            return []
        }
    }
    async getRecomendations(movieId, isSeries = false) {
        try {
            const url = isSeries ? `${BASE_URL}/tv/${movieId}/recommendations?language=ru-RU&include_adults=false` : `${BASE_URL}/movie/${movieId}/recommendations?language=ru-RU&include_adults=false`
            const response = await axios.get(url, params)
            return response.data.results.filter(movie =>
                !movie.adult &&
                movie.original_language !== "hi" &&
                movie.original_language !== "ta" &&
                movie.original_language !== "te" &&
                movie.original_language !== "ml"
            );
        } catch (error) {
            console.log(error);
            return []
        }
    }

    async searchMovie(query) {
        try {
            const response = await axios.get(`${BASE_URL}/search/multi?language=ru-RU`, {
                headers: params.headers,
                params: {
                    query: encodeURIComponent(query),
                    api_key: params.api_key,
                    language: 'ru-RU'
                }
            })
            const moviesAndSeries = response.data.results.filter((movie) => movie.media_type != 'person')
            return moviesAndSeries.filter(movie =>
                !movie.adult &&
                movie.original_language !== "hi" &&
                movie.original_language !== "ta" &&
                movie.original_language !== "te" && 
                movie.original_language !== "ml"
            );
        } catch (error) {
            console.log(error);
        }
    }

    async getMoviesGenres() {
        try {
            const response = await axios.get(`${BASE_URL}/genre/movie/list`, params)
            return response.data.genres
        } catch (error) {
            console.log(error);
            return []
        }
    }

    async getMoviesByGenre(genreId, page = 1) {
        try {
            const [moviesResponse, seriesResponse] = await Promise.all([
                axios.get(`${BASE_URL}/discover/movie?page=${page}&with_genres=${genreId}`, params ),
                axios.get(`${BASE_URL}/discover/tv?page=${page}&with_genres=${genreId}`, params)
            ]);
    
            const combined = [
                ...moviesResponse.data.results.map(movie => ({ ...movie, media_type: "movie" })),
                ...seriesResponse.data.results.map(show  => ({ ...show,  media_type: "tv" }))
            ].filter(item => item.adult === false);
    
            return combined;
        } catch (error) {
            console.log('Ошибка авторизации или запроса:', error);
            return [];
        }
    }
}

export default new API()