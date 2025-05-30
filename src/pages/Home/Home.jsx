import React, { useEffect, useState } from 'react'
import PopularMovies from '../../components/PopularMovies/PopularMovies'
import PopularSeries from '../../components/PopularSeries/PopularSeries'
import TopRated from '../../components/TopRated/TopRated'
import MovieSwapper from '../../components/MovieSwapper/MovieSwapper'
import TrailerPreview from '../../components/TrailerPreview/TrailerPreview'
import api from '../../services/api'
import Loading from '../../components/Loading/Loading'

const Home = () => {
  const [movieWithTrailerId, setMovieWithTrailerId] = useState()
  const [loading, setLoading] = useState(true)

  const [swapperMovies, setSwapperMovies] = useState([])
  const [popularMovies, setPopularMovies] = useState([])
  const [popularSeries, setPopularSeries] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const swapperData = await api.getTrendingMoviesAndSeries()
        const popularMoviesData = await api.getPopularMovies()
        const popularSeriesData = await api.getTrendingSeries()
        setPopularSeries(popularSeriesData)
        setPopularMovies(popularMoviesData)
        setSwapperMovies(swapperData)
        setLoading(true)
        await api.getTrendingMoviesAndSeries()
      } catch (error) {
        console.error('Error fetching trending movies and series:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])
  
  return (
    <div>
      {loading ? <Loading /> : <>
        <MovieSwapper content={swapperMovies} />
        <PopularMovies movies={popularMovies} onTrailer={setMovieWithTrailerId} />
        {movieWithTrailerId ? <TrailerPreview movieId={movieWithTrailerId} /> : ''}
        <PopularSeries series={popularSeries} />
      </>}
    </div>
  )
}

export default Home