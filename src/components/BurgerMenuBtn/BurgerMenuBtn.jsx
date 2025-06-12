import React from 'react'
import styles from './BurgerMenuBtn.module.css';

const BurgerMenuBtn = ({isActive, onBurger}) => {
    return (
        <div className={styles.burgerMenu}>
            <button className={`${styles.burgerButton} ${isActive ? styles.burgerButtonOpen : ''}`} onClick={() => onBurger()}>
                <span className={styles.burgerLine}></span>
                <span className={styles.burgerLine}></span>
                <span className={styles.burgerLine}></span>
            </button>
        </div>
    )
}

export default BurgerMenuBtn