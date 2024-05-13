import { Link } from "react-router-dom";
import css from "./Header.module.css";

export default function Header() {
  return (
    <header className={css.header}>
      <nav className={css.navigation}>
        <Link className={css.link} to="/">Home</Link>
        <Link className={css.link} to="/movies">Movies</Link>
      </nav>
    </header>
  );
}
