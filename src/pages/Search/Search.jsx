import React, { useState } from 'react'
import Container from '../../components/Container/Container'
import SearchBar from '../../components/SearchBar/SearchBar'
import MovieList from '../../components/MovieList/MovieList'
import SearchFilter from '../../components/SearchFilter/SearchFilter'

const Search = () => {
    const [results, setResults] = useState([])
    const [isFiltering, setIsFiltering] = useState(false)
    return (
        <div>
            <Container>
                <SearchBar isFiltering={isFiltering} onFilter={setIsFiltering} onResults={setResults}/>
                {
                    isFiltering && <SearchFilter />
                }
                <MovieList movies={results} />
            </Container>
        </div>
    )
}

export default Search