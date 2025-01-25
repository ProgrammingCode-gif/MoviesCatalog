import React from 'react'
import PopularMovies from '../../components/PopularMovies/PopularMovies'
import Container from '../../components/Container/Container'
import PopularSeries from '../../components/PopularSeries/PopularSeries'

const Home = () => {
  return (
    <div>
        <PopularMovies />
        <PopularSeries />
    </div>
  )
}

export default Home