import { NavLink } from "react-router-dom";

import styles from "../styles/Navbar.module.css"

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
        <NavLink to="/" className={styles.brand}>
            Mini <span>Blog</span>
        </NavLink>
        <ul className={styles.links_list}>
            <li>
                <NavLink to="/Home" className={({isActive}) => (isActive ? styles.active : '')} >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink to="/About" className={({isActive}) => (isActive ? styles.active : '')}>
                    Sobre
                </NavLink>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar