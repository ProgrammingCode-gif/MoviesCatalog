import React from 'react'
import PopularMovies from '../../components/PopularMovies/PopularMovies'
import Container from '../../components/Container/Container'
import PopularSeries from '../../components/PopularSeries/PopularSeries'
import TopRated from '../../components/TopRated/TopRated'
import MovieSwapper from '../../components/MovieSwapper/MovieSwapper'
import TrailerPreview from '../../components/TrailerPreview/TrailerPreview'

const Home = () => {
  return (
    <div>
        <MovieSwapper />
        <PopularMovies />
        <TrailerPreview movieId={939243} />
        <PopularSeries />
        <TopRated />

    </div>
  )
}

export default Home