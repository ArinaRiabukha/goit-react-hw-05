import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../../api";
import MovieList from "../../components/MovieList/MovieList";
import s from "./MoviesPage.module.css"

const MoviesPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const queryParam = searchParams.get("query") || "";
    
    const [query, setQuery] = useState(queryParam);
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!queryParam) return; 
        const fetchMovies = async () => {
            setIsLoading(true);
            try {
                const result = await searchMovies(queryParam);
                setMovies(result);
            } catch (error) {
                console.error("Error searching movies:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchMovies();
    }, [queryParam]);

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchParams({ query }); 
    };

    return (
        <>
            <form onSubmit={handleSearch} className={s.container}>
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className={s.search}
                />
                <button type="submit" className={s.searchBtn}>Search</button>
            </form>
            <MovieList movies={movies} isLoading={isLoading} />
        </>
    );
}

export default MoviesPage;