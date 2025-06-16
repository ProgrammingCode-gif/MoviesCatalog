import React, { useEffect, useState } from 'react'
import styles from './NavBar.module.css'
import { Link, NavLink } from 'react-router-dom'
import Container from '../Container/Container'

import { FiSearch } from "react-icons/fi";
import { RiHome2Line } from "react-icons/ri";
import { MdOutlineMovie } from "react-icons/md";
import { MdOutlineLocalMovies } from "react-icons/md";
import { RiFilmAiLine } from "react-icons/ri";
import BurgerMenuBtn from '../BurgerMenuBtn/BurgerMenuBtn';
import { AnimatePresence, motion } from 'framer-motion';

const NavBar = () => {

    const [scrolled, setScrolled] = useState(false);
    const [isBurgerOpen, setIsBurgerOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <nav className={`${styles.navbar} ${scrolled || isBurgerOpen ? styles.scrolled : ""}`}>
            <Container className={styles.wrapper}>
                <div >
                    <Link className={styles.logo} to="/">AbsoluteCinema</Link>
                </div>
                <ul className={styles.navBarList}>

                    <li>
                        <NavLink className={({ isActive }) => isActive ? `${styles.navBarLink} ${styles.navBarLinkActive}` : styles.navBarLink} to="/"><RiHome2Line className={styles.linkIcon} /> Главная</NavLink>
                    </li>
                    <li>
                        <NavLink className={({ isActive }) => isActive ? `${styles.navBarLink} ${styles.navBarLinkActive}` : styles.navBarLink} to="/series"><MdOutlineLocalMovies className={styles.linkIcon} />Сериалы</NavLink>
                    </li>
                    <li>
                        <NavLink className={({ isActive }) => isActive ? `${styles.navBarLink} ${styles.navBarLinkActive}` : styles.navBarLink} to="/movies"><MdOutlineMovie className={styles.linkIcon} />Фильмы</NavLink>
                    </li>
                    <li>
                        <NavLink className={({ isActive }) => isActive ? `${styles.navBarLink} ${styles.navBarLinkActive}` : styles.navBarLink} to="/genres"><RiFilmAiLine className={styles.linkIcon} />Жанры</NavLink>
                    </li>
                    <li>
                        <NavLink className={({ isActive }) => isActive ? `${styles.navBarLink} ${styles.navBarLinkActive}` : styles.navBarLink} to="/search"><FiSearch className={`${styles.linkIcon} ${styles.searchIcon}`} /></NavLink>
                    </li>
                </ul>
                <ul className={styles.navBarListMobile}>
                    <li>
                        <NavLink className={({ isActive }) => isActive ? `${styles.navBarLink} ${styles.navBarLinkActive} ${styles.search}` : `${styles.navBarLink} ${styles.searchLink}`} to="/search"><FiSearch className={`${styles.linkIcon} ${styles.searchIcon}`} /></NavLink>
                    </li>
                    <li>
                        <BurgerMenuBtn isActive={isBurgerOpen} onBurger={() => setIsBurgerOpen(prev => !prev)} />
                    </li>
                </ul>
            </Container>
            <AnimatePresence>
                {isBurgerOpen && 
                    <motion.div className={styles.burgerOverlay}
                        onClick={() => setIsBurgerOpen(false)}
                        initial={{ opacity: 0 }}
                        exit={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    ></motion.div>
                }
            </AnimatePresence>

            <AnimatePresence>
                {isBurgerOpen &&
                    <motion.div className={styles.burgerMenu}
                        initial={{ opacity: 0, x: '-100%' }}
                        exit={{ opacity: 0, x: '-100%' }}
                        animate={{ opacity: 1, x: '0%' }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <Container className={styles.burgerMenuContainer}>
                            <p className={styles.burgerTitle}>Навигация</p>
                            <ul className={styles.burgerList}>
                                <li>
                                    <NavLink 
                                        className={({ isActive }) => isActive ? `${styles.navBarLink} ${styles.navBarLinkActive}` : styles.navBarLink} 
                                        to="/"
                                        onClick={() => setIsBurgerOpen(false)}
                                    >
                                        <RiHome2Line className={styles.linkIcon} /> Главная
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink 
                                        className={({ isActive }) => isActive ? `${styles.navBarLink} ${styles.navBarLinkActive}` : styles.navBarLink} 
                                        to="/series"
                                        onClick={() => setIsBurgerOpen(false)}
                                    >
                                        <MdOutlineLocalMovies className={styles.linkIcon} />Сериалы
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink 
                                        className={({ isActive }) => isActive ? `${styles.navBarLink} ${styles.navBarLinkActive}` : styles.navBarLink} 
                                        to="/movies"
                                        onClick={() => setIsBurgerOpen(false)}
                                    >
                                        <MdOutlineMovie className={styles.linkIcon} />Фильмы
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink 
                                        className={({ isActive }) => isActive ? `${styles.navBarLink} ${styles.navBarLinkActive}` : styles.navBarLink} 
                                        to="/genres"
                                        onClick={() => setIsBurgerOpen(false)}
                                    >
                                        <RiFilmAiLine className={styles.linkIcon} />Жанры
                                    </NavLink>
                                </li>
                            </ul>
                        </Container>
                    </motion.div>
                }
            </AnimatePresence>
        </nav>
    )
}

export default NavBar