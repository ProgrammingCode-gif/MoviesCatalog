import React, { useState } from 'react'
import Container from '../../components/Container/Container'
import SearchBar from '../../components/SearchBar/SearchBar'
import MovieList from '../../components/MovieList/MovieList'
import SearchFilter from '../../components/SearchFilter/SearchFilter'
import { AnimatePresence, motion } from 'framer-motion'

const Search = () => {
    const [results, setResults] = useState([])
    const [isFiltering, setIsFiltering] = useState(false)
    return (
        <div>
            <Container>
                <SearchBar isFiltering={isFiltering} onFilter={setIsFiltering} onResults={setResults}/>
                <SearchFilter isFiltering={isFiltering} />
                <MovieList movies={results} />
            </Container>
        </div>
    )
}

export default Search