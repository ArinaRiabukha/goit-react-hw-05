import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../../api";
import s from "./MovieCast.module.css"

const MovieCast = () => {
    const {movieId}= useParams()
    const [cast, setCast] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetchMovieCast(movieId)
            .then(data => {
                const filteredCast = data.filter(actor => actor.profile_path !== null);
                setCast(filteredCast);
            })
            .catch(error => {
                alert("Error fetching movie cast", error);
            })
            .finally(() => {
                setIsLoading(false); 
            });
    }, [movieId]);

    if (isLoading) {
        return <p className={s.loader}>Loading...</p>;
    }
    
  return (
    <div className={s.castContainer}>
    {cast.length > 0 ? (
        <ul className={s.list}>
            {cast.map(actor => (
                <li key={actor.id} className={s.castItem}>
                    <img 
                        src={actor.profile_path 
                            ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                            : "https://via.placeholder.com/200x300?text=No+Image"} 
                        alt={actor.name}
                        className={s.actorImage}
                    />
                    <div className={s.actorInfo}>
                        <h3 className={s.actorName}>{actor.name}</h3>
                        <p className={s.actorCharacter}>Character: {actor.character}</p>
                    </div>
                </li>
            ))}
        </ul>
    ) : (
        <p className={s.noInfo}>Sorry, we do not have any information regarding the cast of the movie.</p>
    )}
   </div>
  )
}

export default MovieCast;