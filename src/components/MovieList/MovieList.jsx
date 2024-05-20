import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

export default function MovieList({ movies }) {
  const posterBasepath = "https://image.tmdb.org/t/p/w500";
  const location = useLocation();

  return (
    <ul className={css.list}>
      {movies.map((movie) => (
        <li className={css.item} key={movie.id}>
          <Link
            className={css.link}
            to={`/movies/${movie.id}`}
            state={location}>
            <img
              className={css.img}
              src={posterBasepath + movie.poster_path}
              width="250px"
              alt="movie-poster"
            />
            <h2 className={css.title}>{movie.title}</h2>
          </Link>
        </li>
      ))}
    </ul>
  );
}
