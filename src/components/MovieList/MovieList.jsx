import { Link, useLocation } from "react-router-dom";
import s from "./MovieList.module.css"

const MovieList = ({movies, isLoading}) => {
  const location = useLocation(); 

  if (isLoading) {
    return <p className={s.loader}>Loading...</p>;
}

  return (
    <div>
      <ul>
        {movies.map(({id, title}) => (
          <li key={id}>
            <Link to={`/movies/${id}`} state={{ from: location }} className={s.link}>
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
};

export default MovieList;