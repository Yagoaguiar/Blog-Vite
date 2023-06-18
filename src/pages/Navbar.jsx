import { NavLink } from "react-router-dom";

import styles from "../styles/Navbar.module.css"

const Navbar = () => {
  return (
    <nav>
        <NavLink to="/">
            Mini <span>Blog</span>
        </NavLink>
        <ul>
            <li>
                <NavLink to="/Home">
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink to="/About">
                    Sobre
                </NavLink>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar