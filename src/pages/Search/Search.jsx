import React, { useState } from 'react'
import Container from '../../components/Container/Container'
import SearchBar from '../../components/SearchBar/SearchBar'
import MovieList from '../../components/MovieList/MovieList'

const Search = () => {
    const [results, setResults] = useState([])
    return (
        <div>
            <Container>
                <SearchBar onResults={setResults}/>
                <MovieList movies={results} />
            </Container>
        </div>
    )
}

export default Search