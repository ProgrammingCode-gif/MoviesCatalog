import React, { useCallback, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation, Mousewheel, FreeMode } from 'swiper/modules';
import styles from './MovieSlider.module.css';
import 'swiper/css/navigation';
import MovieCard from '../MovieCard/MovieCard';
import Container from '../Container/Container';

import { SlArrowRight } from 'react-icons/sl';
import { SlArrowLeft } from 'react-icons/sl';
import TopRatedCard from '../TopRatedCard/TopRatedCard';

const MovieSlider = ({ movies, topRated }) => {
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    // Используем useRef для уникальных кнопок навигации
    const prevButtonRef = useRef(null);
    const nextButtonRef = useRef(null);

    const handleSlideChange = useCallback((swiper) => {
        setIsBeginning(swiper.isBeginning || swiper.progress <= 0);
        setIsEnd(swiper.isEnd || swiper.progress >= 1);
    }, []);

    return (
        <div className={styles.movieSlider}>
            <Container>
                <Swiper
                    slidesPerView={'auto'}
                    spaceBetween={10}
                    modules={[Mousewheel, Navigation, FreeMode]}
                    freeMode={{
                        enabled: true,
                        momentum: true,
                    }}
                    mousewheel={{
                        enabled: true,
                        forceToAxis: true,
                        releaseOnEdges: false,
                    }}
                    navigation={{
                        nextEl: nextButtonRef.current,
                        prevEl: prevButtonRef.current,
                    }}
                    onSlideChange={handleSlideChange}
                    onSetTranslate={handleSlideChange}
                    onInit={(swiper) => {
                        swiper.params.navigation.prevEl = prevButtonRef.current;
                        swiper.params.navigation.nextEl = nextButtonRef.current;
                        swiper.navigation.init();
                        swiper.navigation.update();

                        handleSlideChange(swiper);
                    }}
                    className={styles.swiper}
                >
                    {movies?.map((movie, index) => (
                        <SwiperSlide key={movie.id} className={styles.movieItem}>
                            {
                                topRated ? 
                                    <TopRatedCard top={(index + 1)} posterPath={movie.poster_path}
                                    /> 
                                :
                                    <MovieCard
                                        posterPath={movie.poster_path}
                                        title={movie.title || movie.name}
                                    />
                            }
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Container>

            <div
                ref={prevButtonRef}
                className={`${styles.buttonPrev} ${isBeginning ? styles.btnDisabled : ''}`}
            >
                <SlArrowLeft className={styles.btn} />
            </div>
            <div
                ref={nextButtonRef}
                className={`${styles.buttonNext} ${isEnd ? styles.btnDisabled : ''}`}
            >
                <SlArrowRight className={styles.btn} />
            </div>
        </div>
    );
};

export default MovieSlider;