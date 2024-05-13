import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../api";
import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  const [reviews, setReviews] = useState(null);
  const { movieID } = useParams();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getMovieReviews(movieID);
        setReviews(data);
      } catch (error) {
        console.log(reviews);
      }
    };

    fetchReviews();
  }, [movieID]);

  console.log(reviews);

  return (
    <>
      <ul className={css.list}>
        {reviews !== null &&
          reviews.map((review) => (
            <li key={review.id}>
              <span className={css.author}>{review.author}</span>
              <p className={css.description}>{review.content}</p>
            </li>
          ))}
      </ul>
    </>
  );
}
