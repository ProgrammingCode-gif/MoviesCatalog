import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import NotFound from '../pages/NotFound/NotFound';
import MoviePage from '../pages/MoviePage/MoviePage';
const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movie/:movieId' element={<MoviePage />}/>
        <Route path='*' element={<NotFound />}/>
    </Routes>
  )
}

export default AppRoutes