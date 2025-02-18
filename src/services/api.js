import axios from "axios";

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNWY4MGNhMjVjYWExNzgwMzUzNzE1MmJiNjRmZGZmNiIsIm5iZiI6MTY4NjM4OTEyMi43OTEwMDAxLCJzdWIiOiI2NDg0NDE4MmUzNzVjMDAxMWM3ZmFmOWMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.4UgPR15RWS_DO8W9VLFZJjTKGe6Stu0Dc9JWFKKX5RM'
const BASE_URL = 'https://api.themoviedb.org/3'

const params = {
    params: {
        api_key: API_KEY,
        language: 'ru-RU',
    },
    headers: {
        Authorization: `Bearer ${API_KEY}`
    }
}

class API {
    async getPopularMovies() {
        try {
            const response = await axios.get(`${BASE_URL}/movie/popular`, params)
            return response.data.results
        } catch (error) {
            console.log('Ошибка при получении популярных фильмов:', error);
            return []
        }
    }

    async getTopRatedSeries() {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/tv/top_rated?language=ru-RU&page=1`, {
                params: {
                    language: 'ru-RU'
                },
                headers: {
                    Authorization: `Bearer ${API_KEY}`
                }
            })
            return response.data.results
        } catch (error) {
            console.log('Ошибка при получении сериалов:', error)
            return []
        }
    }
    async getMovieTrailerUrl(movieId) {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?&language=en-US`, {
                params: {
                    api_key: API_KEY,
                    language: 'en-EN',
                },
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNWY4MGNhMjVjYWExNzgwMzUzNzE1MmJiNjRmZGZmNiIsIm5iZiI6MTY4NjM4OTEyMi43OTEwMDAxLCJzdWIiOiI2NDg0NDE4MmUzNzVjMDAxMWM3ZmFmOWMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.4UgPR15RWS_DO8W9VLFZJjTKGe6Stu0Dc9JWFKKX5RM'
                }
            });
            console.log(response);
            const trailer = response.data.results.find(
                (video) => video.type === 'Trailer' && video.site === 'YouTube'
            );
            console.log(trailer);

            return trailer ? `https://www.youtube.com/embed/${trailer.key}?autoplay=1&loop=1&controls=0&mute=1&playlist=${trailer.key}` : null;
        } catch (error) {
            console.error('Ошибка при получении трейлера:', error);
            return ''
        }
    }

    async getTopTenRatedMovies() {
        try {
            const response = await axios.get(`${BASE_URL}/movie/top_rated`, params)
            return response.data.results.slice(0, 10)
        } catch (error) {
            console.log(error);
            return []
        }
    }

    async getTrendingMovies() {
        try {
            const response = await axios.get(`${BASE_URL}/trending/movie/week`, params)
            return response.data.results.slice(0, 8)
        } catch (error) {
            console.log(error);
            return []
        }
    }
    async getMovieDetails(movieId, isSeries = false) {
        try {
            const url = isSeries ? `${BASE_URL}/tv/${movieId}` : `${BASE_URL}/movie/${movieId}`
            const response = await axios.get(url, params)
            return response.data
        } catch (error) {
            console.log(error);
            return []
        }
    }

    async getCast(movieId, isSeries = false) {
        try {
            const url = isSeries ? `${BASE_URL}/tv/${movieId}/credits` : `${BASE_URL}/movie/${movieId}/credits`
            const response = await axios.get(url, params)
            return response.data.cast
        } catch (error) {
            console.log(error);
            return []
        }
    }
    async getRecomendations(movieId, isSeries = false) {
        try {
            const url = isSeries ? `${BASE_URL}/tv/${movieId}/recommendations` : `${BASE_URL}/movie/${movieId}/recommendations`
            const response = await axios.get(url, params)
            return response.data.results
        } catch (error) {
            console.log(error);
            return []
        }
    }

    async searchMovie(query) {
        try {
            const response = await axios.get(`${BASE_URL}/search/multi`, {
                headers: params.headers,
                params: {
                    query: encodeURIComponent(query),
                    api_key: params.api_key,
                    language: 'ru-RU'
                }
            })
            return response.data.results.filter((movie) => movie.media_type != 'person')
        } catch (error) {
            console.log(error);
        }
    }
}

export default new API()