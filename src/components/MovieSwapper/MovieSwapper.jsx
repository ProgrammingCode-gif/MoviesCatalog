import { useCallback, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import styles from './MovieSwapper.module.css'
import { EffectFade, Autoplay } from "swiper/modules";
import api from "../../services/api";
import MovieSwapperItem from "../MovieSwapperItem/MovieSwapperItem";

const MovieSwapper = () => {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeMovie, setActiveMovie] = useState(null);
    const [nextMovieIndex, setNextMovieIndex] = useState(1)

    const setNextMovie = useCallback(() => {
        setActiveMovie(movies[nextMovieIndex])
    }, [])

    useEffect(() => {
        const getMovies = async () => {
            try {
                const data = await api.getTrendingMovies()
                setMovies(data)
                setActiveMovie(data[0])
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false)
            }
        }

        getMovies()
    }, [])
    return (
        <Swiper
            modules={[EffectFade, Autoplay]}
            effect="fade"
            autoplay={{ delay: 8000 }}
            allowTouchMove={false}
            
            fadeEffect={{ crossFade: true }}
            onSlideChange={(swiper) => {
                setActiveMovie(movies[swiper.realIndex])
                if(swiper.realIndex < movies.length - 1) {
                    setNextMovieIndex(swiper.realIndex + 1)
                } else {
                    setNextMovieIndex(0)
                }
            }}
        >
            {
            !loading &&
                movies.map(movie => <SwiperSlide key={movie.id}><MovieSwapperItem setActiveMovie={setActiveMovie} movie={movie} movies={movies} activeMovie={activeMovie} nextMovieIndex={nextMovieIndex}/> </SwiperSlide>)
            }
        </Swiper>
    )
}

export default MovieSwapper