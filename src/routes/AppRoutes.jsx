import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import NotFound from '../pages/NotFound/NotFound';
import MoviePage from '../pages/MoviePage/MoviePage';
import Search from '../pages/Search/Search';
import Movies from '../pages/Movies/Movies';
import Series from '../pages/Series/Series';
import Genres from '../pages/Genres/Genres';
import Signup from '../pages/Signup/Signup';

const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/search' element={<Search />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/series' element={<Series />} />
        <Route path='/genres' element={<Genres />} />
        <Route path='/movies/:movieId' element={<MoviePage />}/>
        <Route path='/series/:movieId' element={<MoviePage series={true} />}/>
        <Route path='*' element={<NotFound />}/>
        <Route path='/signup' element={<Signup />} />
    </Routes>
  )
}

export default AppRoutes