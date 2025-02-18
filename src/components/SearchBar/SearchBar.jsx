import { FiSearch } from "react-icons/fi";
import { FiFilter } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import styles from './SearchBar.module.css'
import { useEffect, useState } from "react";
import api from "../../services/api";

const SearchBar = ({onResults, onFilter, isFiltering}) => {
    const [query, setQuery] = useState('')
    const [debouncedQuery, setDebouncedQuery] = useState("");

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(query)
        }, 500)

        return () => clearTimeout(handler)
    }, [query])

    useEffect(() => {
        
        if(!debouncedQuery.trim()) return

        const fetchMovies = async () => {
            try {
                console.log(debouncedQuery);
                const data = await api.searchMovie(debouncedQuery)
                console.log(data);
                onResults(data || [])
            } catch (error) {
                console.log(error);
            }
        }

        fetchMovies()

    }, [debouncedQuery])

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