import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../api";
import s from "./MovieReviews.module.css"

const MovieReviews = () => {
    const {movieId}= useParams();
    const [reviews, setReviews]= useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetchMovieReviews(movieId)
            .then(data => {
                setReviews(data);
            })
            .catch(error => {
                alert("Error fetching movie reviews", error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [movieId]);
    if (isLoading) {
        return <p className={s.loader}>Loading...</p>;
    }

  return (
    <div>
    {reviews.length > 0 ? (
        <ul className={s.list}>
            {reviews.map(review => (
                <li key={review.id} className={s.reviewItem}>
                    <h2 className={s.authorName}>{review.author}</h2>
                    <p className={s.reviewContent}>{review.content}</p>
                </li>
            ))}
        </ul>
     ) : (
            <p className={s.noInfo}>There are no reviews for this movie</p>
        )}
    </div>
  )
}

export default MovieReviews;