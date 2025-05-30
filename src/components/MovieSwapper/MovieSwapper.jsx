import { useCallback, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import { EffectFade, Autoplay } from "swiper/modules";
import MovieSwapperItem from "../MovieSwapperItem/MovieSwapperItem";

const MovieSwapper = ({content}) => {
    const [activeMovie, setActiveMovie] = useState(null);
    const [nextMovieIndex, setNextMovieIndex] = useState(1)

    useEffect(() => {
        const getMovies = async () => {
            try {
                setActiveMovie(content[0])
            } catch (error) {
                console.log(error);
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
                setActiveMovie(content[swiper.realIndex])
                if(swiper.realIndex < content.length - 1) {
                    setNextMovieIndex(swiper.realIndex + 1)
                } else {
                    setNextMovieIndex(0)
                }
            }}
        >
            {
                content.map(movie => <SwiperSlide key={movie.id}><MovieSwapperItem setActiveMovie={setActiveMovie} movie={movie} movies={content} activeMovie={activeMovie} nextMovieIndex={nextMovieIndex}/> </SwiperSlide>)
            }
        </Swiper>
    )
}

export default MovieSwapper