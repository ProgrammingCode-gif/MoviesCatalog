import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import PopularMovies from '../../components/PopularMovies/PopularMovies'
import PopularSeries from '../../components/PopularSeries/PopularSeries'
import MovieSwapper from '../../components/MovieSwapper/MovieSwapper'
import TrailerPreview from '../../components/TrailerPreview/TrailerPreview'
import Loading from '../../components/Loading/Loading'

import api from '../../services/api'

const Home = () => {
  const [movieWithTrailerId, setMovieWithTrailerId] = useState()

  const { data, isLoading, isError } = useQuery({
    queryKey: ["homeData"],
    queryFn: async () => {
      const [swapper, movies, series] = await Promise.all([
        api.getTrendingMoviesAndSeries(),
        api.getTrendingMoviesAndSeries(),
        api.getTrendingSeries(),
      ])
      return {swapper, movies, series}
    }
  })
  
  if(isError) {
    return <div>Произошла ошибка</div>
  }
  return (
    <main>
      {isLoading ? <Loading /> : <>
        <MovieSwapper content={data.swapper} />
        <PopularMovies isLoading={isLoading} movies={data.movies} onTrailer={setMovieWithTrailerId} />
        {movieWithTrailerId && <TrailerPreview movieId={movieWithTrailerId} />}
        <PopularSeries loading={isLoading} series={data.series} />
      </>}
    </main>
  )
}

export default Home