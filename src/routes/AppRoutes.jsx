import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import NotFound from '../pages/NotFound/NotFound';
import MoviePage from '../pages/MoviePage/MoviePage';
import Search from '../pages/Search/Search';
const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/search' element={<Search />} />
        <Route path='/movies/:movieId' element={<MoviePage />}/>
        <Route path='/series/:movieId' element={<MoviePage series={true} />}/>
        <Route path='*' element={<NotFound />}/>
    </Routes>
  )
}

export default AppRoutes