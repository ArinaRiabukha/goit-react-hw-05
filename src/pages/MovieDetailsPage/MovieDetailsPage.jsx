import { useEffect, useState } from "react";
import { fetchMovieDetails } from "../../api";
import { NavLink, Outlet, useParams } from "react-router-dom";
import s from "./MovieDetails.module.css"
import clsx from "clsx";
import GoBackBtn from "../../components/GoBackBtn/GoBackBtn";

const buildLinkClass = ({ isActive }) => {
  return clsx(s.link, isActive && s.active);
};

const MovieDetailsPage = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    useEffect(() => {
        fetchMovieDetails(movieId)
            .then(data => {
                setMovie(data);
            })
            .catch(error => {
                alert("Error fetching movie", error);
            })
    }, [movieId]);

    if (!movie) {
        return <div className={s.loader}>Loading...</div>; 
    }

    const lowercaseFirstLetter = (text) => text.charAt(0).toLowerCase() + text.slice(1);

  return (
    <>
    <GoBackBtn/>
    <div className={s.container}>
            <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} className={s.poster}/>
            <div className={s.detailsContainer}>
            <h1 className={s.title}>{movie.title} ({movie.release_date})</h1>
            <p className={s.score}>Score: {Math.round(movie.vote_average * 10)}%</p>
            <p><span className={s.overviewTitle}>Overview:</span> {lowercaseFirstLetter(movie.overview)}</p>
            <p className={s.list}>
                <span className={s.genresTitle}>Genres: </span> 
                {movie.genres.map(genre => genre.name.toLowerCase()).join(", ")}
            </p>
            </div>

        </div>
            <nav className={s.navigation}>
                <NavLink to={`cast`} className={buildLinkClass}>Cast</NavLink>
                <NavLink to={`reviews`} className={buildLinkClass}>Reviews</NavLink>
            </nav>
        <Outlet/>
    </>
  )
}

export default MovieDetailsPage;