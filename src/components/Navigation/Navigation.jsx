import { Link } from "react-router-dom";
import css from './Navigation.module.css'

export default function Navigation() {
  return (
    <nav className={css.navigation}>
      <Link className={css.link} to="/">
        Home
      </Link>
      <Link className={css.link} to="/movies">
        Movies
      </Link>
    </nav>
  );
}
