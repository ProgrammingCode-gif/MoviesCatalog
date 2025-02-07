import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Mousewheel, FreeMode } from 'swiper/modules';
import styles from './MovieSlider.module.css';
import MovieCard from '../MovieCard/MovieCard';
import Container from '../Container/Container';
import { SlArrowRight, SlArrowLeft } from 'react-icons/sl';
import TopRatedCard from '../TopRatedCard/TopRatedCard';

const MovieSlider = ({ movies, topRated }) => {
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const swiperRef = useRef(null);
    const prevButtonRef = useRef(null);
    const nextButtonRef = useRef(null);

    useEffect(() => {
        if (!swiperRef.current) return;
        const swiper = swiperRef.current.swiper;

        const updateButtons = () => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
        };

        swiper.params.navigation.prevEl = prevButtonRef.current;
        swiper.params.navigation.nextEl = nextButtonRef.current;
        swiper.navigation.init();
        swiper.navigation.update();
        updateButtons();

        swiper.on('slideChange', updateButtons);
    }, []);

    return (
        <div className={styles.movieSlider}>
            <Container>
                <Swiper
                    ref={swiperRef}
                    slidesPerView={'auto'}
                    spaceBetween={10}
                    modules={[Mousewheel, Navigation, FreeMode]}
                    freeMode={true}
                    mousewheel={{ forceToAxis: true }}
                    navigation={{ prevEl: prevButtonRef.current, nextEl: nextButtonRef.current }}
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

            <div ref={prevButtonRef} className={`${styles.buttonPrev} ${isBeginning ? styles.btnDisabled : ''}`}>
                <SlArrowLeft className={styles.btn} />
            </div>
            <div ref={nextButtonRef} className={`${styles.buttonNext} ${isEnd ? styles.btnDisabled : ''}`}>
                <SlArrowRight className={styles.btn} />
            </div>
        </div>
    );
};

export default MovieSlider;