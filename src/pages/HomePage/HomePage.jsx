import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { fetchTrendingMovies } from "../../api";
import s from "./HomePage.module.css"

const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
      setIsLoading(true);
      fetchTrendingMovies()
          .then(data => {
            setMovies(data); 
          })
          .catch(error => {
              alert("Error fetching movies", error);
          })
          .finally(() => {
              setIsLoading(false);
          });
  }, []);
  return (
    <div>
        <h1 className={s.title}>Trending Today</h1>
        <MovieList movies={movies} isLoading={isLoading}/>
    </div>
  )
}

export default HomePage;