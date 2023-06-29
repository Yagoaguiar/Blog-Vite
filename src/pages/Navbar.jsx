import { NavLink, Outlet } from "react-router-dom";
import { useAuthentication } from "../hooks/useAuthentication";
import { useAuthValue } from "../content/AuthContext";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  const { user } = useAuthValue();
  const { logout } = useAuthentication();

  return (
    <>
      <nav className={styles.navbar}>
        <ul className={styles.links_list}>
          {!user && (
            <>
              <li>
                <NavLink to="/" end>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/login">Entrar</NavLink>
              </li>
              <li>
                <NavLink to="/register">Cadastrar</NavLink>
              </li>
            </>
          )}

          {user && (
            <>
              <li>
                <NavLink to="/posts/create">Novo post</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard">Dashboard</NavLink>
              </li>
            </>
          )}
          <li>
            <NavLink to="/about">Sobre</NavLink>
          </li>
          {user && (
            <li>
              <button onClick={logout}>Sair</button>
            </li>
          )}
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
