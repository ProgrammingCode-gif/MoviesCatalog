import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation, Mousewheel, FreeMode } from 'swiper/modules';
import styles from './MovieSlider.module.css';
import 'swiper/css/navigation'; 
import MovieCard from '../MovieCard/MovieCard';
import Container from '../Container/Container';

import { SlArrowRight, SlArrowLeft } from 'react-icons/sl';
import TopRatedCard from '../TopRatedCard/TopRatedCard';

const MovieSlider = ({ movies, topRated }) => {
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    const swiperRef = useRef();
    const prevButtonRef = useRef(null);
    const nextButtonRef = useRef(null);

    // Обновление кнопок навигации
    const updateNavigationState = useCallback(() => {
        if (!swiperRef.current) return;
        const swiper = swiperRef.current.swiper;
        if (swiper) {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
        }
    }, []);

    useEffect(() => {
        if (swiperRef.current) {
            const swiperInstance = swiperRef.current.swiper;
            swiperInstance.params.navigation.prevEl = prevButtonRef.current;
            swiperInstance.params.navigation.nextEl = nextButtonRef.current;
            swiperInstance.navigation.init();
            swiperInstance.navigation.update();
            updateNavigationState();

            // Следим за обновлениями в `progress`
            swiperInstance.on('progress', updateNavigationState);
        }
    }, [updateNavigationState]);

    return (
        <div className={styles.movieSlider}>
            <Container>
                <Swiper
                    ref={swiperRef}
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
                    onSlideChange={updateNavigationState}
                    onProgress={updateNavigationState} // Теперь обновляется даже при скролле
                    className={styles.swiper}
                >
                    {movies?.map((movie, index) => (
                        <SwiperSlide key={movie.id} className={styles.movieItem}>
                            {topRated ? (
                                <TopRatedCard top={index + 1} posterPath={movie.poster_path} />
                            ) : (
                                <MovieCard posterPath={movie.poster_path} title={movie.title || movie.name} />
                            )}
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