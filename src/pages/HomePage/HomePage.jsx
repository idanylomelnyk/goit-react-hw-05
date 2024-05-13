import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { getMovies } from "../../api";
import css from "./HomePage.module.css";

export default function HomePage() {
  const posterBasepath = "https://image.tmdb.org/t/p/w500";

  const [movies, setMovies] = useState([]);

  const location = useLocation()

  console.log(location.state)
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMovies();
        setMovies(data);
      } catch (error) {
        console.log(error.message);
      } finally {
        console.log("fetchMovies!");
      }
    };

    fetchMovies();
  }, []);

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
