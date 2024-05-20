import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieCast } from "../../api";
import css from './MovieCast.module.css'

export default function MovieCast() {
  const [cast, setCast] = useState(null);
  const params = useParams();
  const imageBaseURL = "https://image.tmdb.org/t/p/w500/";

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMovieCast(params.movieID);
        setCast(data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchMovies();
  }, [params]);


  return (
    <>
      <ul className={css.list}>
        {cast !== null &&
          cast.map((actor) => (
            <li key={actor.id}>
              <img
                src={imageBaseURL + actor.profile_path}
                width="150px"
                alt="actor-photo"
              />
              <p className={css.name}>{actor.name}</p>
            </li>
          ))}
      </ul>
    </>
  );
}
