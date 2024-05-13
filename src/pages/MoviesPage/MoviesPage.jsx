import { useEffect, useState, useMemo } from "react";
import { getMovieByQuery } from "../../api";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import css from "./MoviesPage.module.css";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";

export default function MoviesPage() {
  const [query, setQuery] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const posterBasepath = "https://image.tmdb.org/t/p/w500";

  const movieQueryValue = searchParams.get("movie") ?? "";

  const updateQueryParam = (newQuery) => {
    searchParams.set("movie", newQuery);
    setSearchParams(searchParams);
  };

  useMemo(() => {
    if (movieQueryValue) {
      setQuery(movieQueryValue);
    }
  }, [movieQueryValue]);

  function handleSubmit(e) {
    e.preventDefault();
    const newQuery = e.target.elements.movie.value.trim();

    setQuery(newQuery);
    updateQueryParam(newQuery);
    e.target.reset();
  }

  useEffect(() => {
    if (query === "") {
      return;
    }

    const fetchMovies = async () => {
      try {
        const data = await getMovieByQuery(query);

        if (data.length === 0) {
          setError(true);
        } else {
          setError(false);
        }

        setMovieList(data);
        setIsLoading(true);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  return (
    <>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          name="movie"
          autoComplete="off"
          placeholder="Search movie"
          autoFocus
        />
      </form>

      {error && <Error />}

      {isLoading && <Loader />}
      <ul className={css.list}>
        {movieList.map((movie) => (
          <li className={css.item} key={movie.id}>
            <Link
              className={css.link}
              to={`/movies/${movie.id}`}
              state={location}>
              <img
                className={css.img}
                src={posterBasepath + movie.poster_path}
                width="200px"
                alt="movie-poster"
              />
              <h2 className={css.title}>{movie.title}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
