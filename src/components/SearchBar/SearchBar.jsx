import { FiSearch } from "react-icons/fi";
import { FiFilter } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import styles from './SearchBar.module.css'
import { useEffect, useState } from "react";
import api from "../../services/api";
import { useParams, useSearchParams } from "react-router-dom";
import utils from "../../utils/utils";

const SearchBar = ({onResults, onFilter, isFiltering, results}) => {
    const [query, setQuery] = useState('')
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [searchParams] = useSearchParams()


    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(query)
        }, 500)

        return () => clearTimeout(handler)
    }, [query])

    useEffect(() => {

        const fetchGenreMovies = async (genreId) => {
            try {
                const data = await api.getMoviesByGenre(genreId)
                const sortedData = utils.sortMovies(data, searchParams)
                onResults(sortedData || [])
            } catch (error) {
                console.log(error);
            }
        }
        
        if(!debouncedQuery.trim()) {
            const genreId = searchParams.get('genre')
            if(genreId) {
                fetchGenreMovies(genreId)
                return
            }
            return
        }

        
        const fetchMovies = async () => {
            try {
                const data = await api.searchMovie(debouncedQuery)
                const sortedData = utils.sortMovies(data, searchParams)
                onResults(sortedData || [])
            } catch (error) {
                console.log(error);
            }
        }

        fetchMovies()

    }, [debouncedQuery, searchParams])

    return (
        <div className={styles.searchBar}>
            {
                isFiltering 
                    ? <AiOutlineClose className={styles.icon} onClick={() => onFilter(false)} /> 
                    : <FiFilter className={styles.icon} onClick={() => onFilter(true)} />
            }
            <input className={styles.input} onChange={(e) => setQuery(e.target.value)} placeholder='Поиск...' type="text" />
            <FiSearch onClick={() => setDebouncedQuery(query)} className={styles.icon} />
        </div>
    )
}

export default SearchBar