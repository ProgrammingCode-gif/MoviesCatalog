import React from 'react';
import styles from './GenreGroup.module.css';
import Container from '../../Container/Container';
import MovieSlider from '../../MovieScroll/MovieSlider';
import { useInfiniteQuery } from '@tanstack/react-query';
import api from '../../../services/api';

const GenreGroup = ({ genre }) => {
    console.log(genre);

    const name = genre.name.charAt(0).toUpperCase() + genre.name.slice(1);

    const { data, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: [`databyGenre${genre.id}`],
        queryFn: async ({ pageParam }) => await api.getMoviesByGenre(genre.id, pageParam),
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length > 0 ? allPages.length + 1 : undefined
        }
    })
    const movies = data?.pages.flat() || []

    return (
        <div className={styles.wrapper}>
            {!isLoading &&
                <>
                    <Container>
                        <p className={styles.title}>{name}</p>
                    </Container>
                    <MovieSlider
                        loading={isFetchingNextPage}
                        movies={movies}
                        genreId={genre.id}
                        isInfinite={true}
                        onReachEnd={() => {
                            if (hasNextPage && !isFetchingNextPage) {
                                fetchNextPage()
                            }
                        }}
                    />
                </>
            }
        </div>
    );
};

export default GenreGroup;