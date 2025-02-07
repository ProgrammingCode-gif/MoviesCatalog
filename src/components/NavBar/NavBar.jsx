import React, { useEffect, useState } from 'react'
import styles from './NavBar.module.css'
import { Link, NavLink } from 'react-router-dom'
import Container from '../Container/Container'

import { FiSearch } from "react-icons/fi";
import { RiHome2Line } from "react-icons/ri";
import { MdOutlineMovie } from "react-icons/md";
import { MdOutlineLocalMovies } from "react-icons/md";

const NavBar = () => {

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50); // Если прокрутили вниз на 50px — меняем цвет
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
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
                        <NavLink className={({ isActive }) => isActive ? `${styles.navBarLink} ${styles.navBarLinkActive}` : styles.navBarLink} to="/search"><FiSearch className={styles.linkIcon} /></NavLink>
                    </li>
                </ul>

            </Container>
        </nav>
    )
}

export default NavBar