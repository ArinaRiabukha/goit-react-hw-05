import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../../api";
import MovieList from "../../components/MovieList/MovieList";
import s from "./MoviesPage.module.css"

const MoviesPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState(searchParams.get("query") || "");
    const [movies, setMovies] = useState(() => {
        const savedMovies = searchParams.get("movies");
        return savedMovies ? JSON.parse(savedMovies) : [];
    });
    const [isLoading, setIsLoading] = useState(false);

    const updateSearchParams = (key, value) => {
        const updatedParams = new URLSearchParams(searchParams);
        updatedParams.set(key, value);
        setSearchParams(updatedParams);
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const result = await searchMovies(query);
            setMovies(result);
            updateSearchParams("query", query);
            updateSearchParams("movies", JSON.stringify(result)); 
        } catch (error) {
            console.error("Error searching movies:", error);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <>
            <form onSubmit={handleSearch} className={s.container}>
                <input value={query} onChange={(e) => setQuery(e.target.value)} className={s.search}/>
                <button type="submit" className={s.searchBtn}>Search</button>
            </form>
            <MovieList movies={movies} isLoading={isLoading} />
        </>
    );
}

export default MoviesPage;