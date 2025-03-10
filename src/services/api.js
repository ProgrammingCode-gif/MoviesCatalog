import axios from "axios";

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNWY4MGNhMjVjYWExNzgwMzUzNzE1MmJiNjRmZGZmNiIsIm5iZiI6MTY4NjM4OTEyMi43OTEwMDAxLCJzdWIiOiI2NDg0NDE4MmUzNzVjMDAxMWM3ZmFmOWMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.4UgPR15RWS_DO8W9VLFZJjTKGe6Stu0Dc9JWFKKX5RM'
const BASE_URL = 'https://api.themoviedb.org/3'

const params = {
    headers: {
        Authorization: `Bearer ${API_KEY}`
    }
}

class API {
    async getPopularMovies(page = 1) {
        try {
            const response = await axios.get(`${BASE_URL}/trending/movie/week?page=${page}&language=ru-RU&include_adults=false`, params)
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
            const response = await axios.get(`${BASE_URL}/trending/tv/week?language=ru-RU&page=${page}&include_adults=false`, params)
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
    async getMovieTrailerUrl(movieId) {
        try {
            const response = await axios.get(`${BASE_URL}/movie/${movieId}/videos?language=ru-RU`, params);
            const trailer = response.data.results.find(
                (video) => video.type === 'Trailer' && video.site === 'YouTube'
            );

            return trailer ? `https://www.youtube.com/embed/${trailer.key}?autoplay=1&loop=1&controls=0&mute=1&playlist=${trailer.key}` : null;
        } catch (error) {
            console.error('Ошибка при получении трейлера:', error);
            return ''
        }
    }

    async getTopTenRatedMovies(page = 1) {
        try {
            const response = await axios.get(`${BASE_URL}/movie/top_rated?language=ru-RU&include_adults=false`, { ...params, params: { ...params.params, page: page || 1 } })
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
            const response = await axios.get(`${BASE_URL}/trending/movie/week?language=ru-RU&include_adults=false`, { ...params, params: { ...params.params, page: page || 1 } })
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
            const response = await axios.get(`${BASE_URL}/trending/all/week?language=ru-RU&include_adults=false`, { ...params, params: { ...params.params, page: page || 1 } })
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
            const response = await axios.get(`${BASE_URL}/genre/movie/list?language=ru-RU`, params)
            return response.data.genres
        } catch (error) {
            console.log(error);
            return []
        }
    }
}

export default new API()