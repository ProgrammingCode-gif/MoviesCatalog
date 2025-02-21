import React, { useEffect, useState } from 'react'
import styles from './SearchFilter.module.css'
import api from '../../services/api'
import { Link, useSearchParams } from 'react-router-dom'
import SearchFilterOption from '../SearchFilterOption/SearchFilterOption'

const SearchFilter = ({isFiltering}) => {
    const [genres, setGenres] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getGenres = async () => {
            try {
                const data = await api.getMoviesGenres()
                setGenres(data)
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false)
            }
        }
        getGenres()
    }, [])

    return (
        <div className={isFiltering ? `${styles.filter} ${styles.filterActive}` : styles.filter }>
            <div className={styles.filterSection}>
                <p className={styles.sectionName}>Категории</p>
                <div className={styles.sectionOptions}>
                <SearchFilterOption title='Фильмы' query='category' value='movie' />
                <SearchFilterOption title='Сериалы' query='category' value='tv' />
                </div>
            </div>
            <div className={styles.filterSection}>
                <p className={styles.sectionName}>Жанр</p>
                <div className={styles.sectionOptions}>

                    {!loading && genres.map((genre) => <SearchFilterOption key={genre.id} title={genre.name} query='genre' value={genre.id} />)}
                </div>
            </div>
            <div className={styles.filterSection}>
                <p className={styles.sectionName}>Сортировка</p>
                <div className={styles.sectionOptions}>
                    <SearchFilterOption title='По алфавиту' query='sortType' value='alphabet' />
                    <SearchFilterOption title='По популярности' query='sortType' value='popular' />
                    <SearchFilterOption title='По дате' query='sortType' value='date' />

                </div>
            </div>
        </div>
    )
}

export default SearchFilter