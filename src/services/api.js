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
        }
    }
    async getMovieTrailerUrl(movieId) {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?&language=en-US`, {
                params: {
                    api_key: API_KEY,
                    language: 'ru-RU',
                },
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNWY4MGNhMjVjYWExNzgwMzUzNzE1MmJiNjRmZGZmNiIsIm5iZiI6MTY4NjM4OTEyMi43OTEwMDAxLCJzdWIiOiI2NDg0NDE4MmUzNzVjMDAxMWM3ZmFmOWMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.4UgPR15RWS_DO8W9VLFZJjTKGe6Stu0Dc9JWFKKX5RM'
                }
            });
            console.log(response);
            const data = await response.json();
            console.log(data);
            const trailer = data.results.find(
                (video) => video.type === 'Trailer' && video.site === 'YouTube'
            );
            console.log(trailer);

            return trailer
        } catch (error) {
            console.error('Ошибка при получении трейлера:', error);
            return ''
        }
    }
}

export default new API()