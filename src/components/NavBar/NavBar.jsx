import React from 'react'
import styles from './NavBar.module.css'
import { Link, NavLink } from 'react-router-dom'
import Container from '../Container/Container'

const NavBar = () => {
    return (
        <nav className={styles.navbar}>
            <Container className={styles.wrapper}>
            <div >
                <Link className={styles.logo} to="/">AbsoluteCinema</Link>
            </div>
            <ul className={styles.navBarList}>
                <li>
                    <NavLink className={({isActive}) => isActive ? `${styles.navBarLink} ${styles.navBarLinkActive}` : styles.navBarLink} to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink className={({isActive}) => isActive ? `${styles.navBarLink} ${styles.navBarLinkActive}` : styles.navBarLink} to="/catalog">Catalog</NavLink>
                </li>
                <li>
                    <NavLink className={({isActive}) => isActive ? `${styles.navBarLink} ${styles.navBarLinkActive}` : styles.navBarLink} to="/search">Search</NavLink>
                </li>
            </ul>

            </Container>
        </nav>
    )
}

export default NavBar