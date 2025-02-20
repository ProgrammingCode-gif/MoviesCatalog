import React, { useEffect, useState } from 'react'
import styles from './SearchFilterOption.module.css'
import { useSearchParams } from 'react-router-dom'

const SearchFilterOption = ({title, query, value}) => {
    // const [filterQuery, setFilterQuery] = useState()
    const [filterParams, setFilterParams] = useSearchParams()
    const [isSelected, setIsSelected] = useState()

    
    const handleFilter = (param, value) => {
        const params = new URLSearchParams(filterParams)

        if(params.has(param, value)) {
            params.delete(param)
            setIsSelected(false)
        } else {
            params.set(param, value)
            setIsSelected(true)
        }

        setFilterParams(params)
    }

    useEffect(() => {
        const params = new URLSearchParams(filterParams)
        if(params.has(query, value)) {
            setIsSelected(true)
        } else {
            setIsSelected(false)
        }
    }, [filterParams])

    return (
        <div onClick={() => handleFilter(query, value)} className={isSelected ? `${styles.sectionOption} ${styles.optionActive}` : styles.sectionOption}>{title}</div>
    )
}

export default SearchFilterOption