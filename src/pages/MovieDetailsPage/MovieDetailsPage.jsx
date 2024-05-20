import { useEffect, useState, useRef, Suspense } from "react";
import { useParams, Link, Outlet, useLocation } from "react-router-dom";
import { getMovieByID } from "../../api";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const [movieDetails, setMovieDetails] = useState({});

  const params = useParams();
  const imageBaseURL = "https://image.tmdb.org/t/p/w500/";
  const location = useLocation();

  const backLinkRef = useRef(location.state ?? "/");

  useEffect(() => {
    const fetchMoviesByID = async () => {
      try {
        const data = await getMovieByID(params.movieID);
        setMovieDetails(data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchMoviesByID();
  }, [params]);

  return (
    <>
      <Link to={backLinkRef.current}>Go back</Link>
      <div className={css.wrapper}>
        <img
          src={imageBaseURL + movieDetails.poster_path}
          width="250px"
          alt="poster"
        />
        <div className={css.info}>
          <h1 className={css.title}>{movieDetails.original_title}</h1>
          <div className={css.details}>
            <span className={css.numbers}>
              Rank: {movieDetails.vote_average}
            </span>
            <span className={css.numbers}>
              Date: {movieDetails.release_date}
            </span>
          </div>
          <p className={css.description}>{movieDetails.overview}</p>
        </div>
      </div>

      <ul className={css.list}>
        <li>
          <Link className={css.link} to="cast">
            Cast
          </Link>
        </li>
        <li>
          <Link className={css.link} to="reviews">
            Reviews
          </Link>
        </li>
      </ul>
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </>
  );
}
