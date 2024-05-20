import { useState, useEffect } from "react";
import { getMovies } from "../../api";

import MovieList from "../../components/MovieList/MovieList";

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMovies();
        setMovies(data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchMovies();
  }, []);

  return (
    <>
      <MovieList movies={movies} />
    </>
  );
}
