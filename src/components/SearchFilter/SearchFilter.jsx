import React from 'react'
import styles from './SearchFilter.module.css'

const SearchFilter = () => {
    return (
        <div className={styles.filter}>
            <div className={styles.filterSection}></div>
            <div className={styles.filterSection}></div>
            <div className={styles.filterSection}></div>
            <div className={styles.filterSection}></div>
        </div>
    )
}

export default SearchFilter