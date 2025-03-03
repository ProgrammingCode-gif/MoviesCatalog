import React, { useEffect, useState } from 'react'
import styles from './SearchFilterSelector.module.css'
import { FiChevronDown } from "react-icons/fi";
import { useSearchParams } from 'react-router-dom';
import utils from '../../utils/utils';

const SearchFilterSelector = ({options}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState({name: 'Не выбрано'});
    const [filterParams, setFilterParams] = useSearchParams();
    const [filterSelected, setFilterSelected] = useState()

    const handleSelect = (option) => {
        setSelected(option);
        setIsOpen(false);
    };

    const clearGenreFilter = () => {
        const params = new URLSearchParams(filterParams)
        params.delete('genre')
        setSelected({name: 'Не выбрано'})
        setFilterParams(params)

    }

    const handleFilter = (param, value) => {
        const params = new URLSearchParams(filterParams)

        // if(params.has(param, value)) {
        //     params.delete(param)
        //     setSelected({name: 'Не выбрано'})
        //     setFilterSelected(false)
        // } else {
            params.set(param, value)
            setFilterSelected(true)
        // }
        
        setFilterParams(params)
    }

    return (
        <div className={isOpen ? `${styles.selectContainerActive} ${styles.selectContainer}` :  styles.selectContainer} onClick={() => setIsOpen(!isOpen)}>
            <div className={styles.selected}>
                {utils.firtsLetterToUpper(selected?.name)}
                <FiChevronDown className={styles.icon} />
            </div>
            {isOpen && (
                <ul className={styles.dropdown}>
                        <li
                            className={selected?.name === 'Не выбрано' ? styles.active : ""}
                            onClick={() => {
                                clearGenreFilter()
                            }}
                        >
                            Не выбрано
                        </li>
                    {options.map((option) => (
                        <li
                            key={option.id}
                            className={option.id == selected?.id ? styles.active : ""}
                            onClick={() => {
                                handleSelect(option)
                                handleFilter('genre', option.id)
                            }}
                        >
                            {utils.firtsLetterToUpper(option.name)}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default SearchFilterSelector