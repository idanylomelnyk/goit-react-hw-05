import { useEffect, useState } from "react";
import { getMovieByQuery } from "../../api";
import { useSearchParams } from "react-router-dom";
import css from "./MoviesPage.module.css";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import MovieList from "../../components/MovieList/MovieList";

export default function MoviesPage() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const movieQueryValue = searchParams.get("movie") ?? "";

  useEffect(() => {
    if (movieQueryValue) {
      setQuery(movieQueryValue);
    }
  }, [movieQueryValue]);

  const updateQueryParam = (newQuery) => {
    searchParams.set("movie", newQuery);
    setSearchParams(searchParams);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newQuery = e.target.elements.movie.value.trim();

    setQuery(newQuery);
    updateQueryParam(newQuery);
    e.target.reset();
  };

  useEffect(() => {
    if (query === "") {
      return;
    }

    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const data = await getMovieByQuery(query);

        if (data.length === 0) {
          setError(true);
        } else {
          setError(false);
        }

        setMovies(data);
      } catch (error) {
        console.log(error.message);
        setError(true);
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
      {!isLoading && !error && <MovieList movies={movies} />}
    </>
  );
}
