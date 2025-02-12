import React from 'react'
import PopularMovies from '../../components/PopularMovies/PopularMovies'
import PopularSeries from '../../components/PopularSeries/PopularSeries'
import TopRated from '../../components/TopRated/TopRated'
import MovieSwapper from '../../components/MovieSwapper/MovieSwapper'

const Home = () => {
  return (
    <div>
      <MovieSwapper />
      <PopularMovies />
      <PopularSeries />
      <TopRated />
    </div>
  )
}

export default Home