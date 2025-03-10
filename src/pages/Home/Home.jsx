import React, { useState } from 'react'
import PopularMovies from '../../components/PopularMovies/PopularMovies'
import PopularSeries from '../../components/PopularSeries/PopularSeries'
import TopRated from '../../components/TopRated/TopRated'
import MovieSwapper from '../../components/MovieSwapper/MovieSwapper'
import TrailerPreview from '../../components/TrailerPreview/TrailerPreview'
import api from '../../services/api'

const Home = () => {
  const [movieWithTrailerId, setMovieWithTrailerId] = useState()
  return (
    <div>
      <MovieSwapper fetching={api.getTrendingMoviesAndSeries} />
      <PopularMovies onTrailer={setMovieWithTrailerId} />
      {movieWithTrailerId ? <TrailerPreview movieId={movieWithTrailerId} /> : ''}
      <PopularSeries />
      <TopRated />
    </div>
  )
}

export default Home