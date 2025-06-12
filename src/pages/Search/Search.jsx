import React, { useState } from 'react'
import Container from '../../components/Container/Container'
import SearchBar from '../../components/SearchBar/SearchBar'
import MovieList from '../../components/MovieList/MovieList'
import SearchFilter from '../../components/SearchFilter/SearchFilter'

import styles from './Search.module.css'
import PopularSeries from '../../components/PopularSeries/PopularSeries'
import SearchRecomendations from '../../components/SearchRecomendations/SearchRecomendations'

const Search = () => {
    const [results, setResults] = useState([])
    const [isFiltering, setIsFiltering] = useState(false)
    return (
        <div className={styles.searchPage}>
            <Container>
                <SearchBar results={results} isFiltering={isFiltering} onFilter={setIsFiltering} onResults={setResults}/>
                <SearchFilter isFiltering={isFiltering} />
                {results.length == 0 && <div className={styles.emptySearchTitle}>Поиск фильмов и сериалов</div>}
                <MovieList movies={results} /> 
            </Container>

            <SearchRecomendations />
        </div>
    )
}

export default Search