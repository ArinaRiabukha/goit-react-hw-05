import axios from "axios";

const API_KEY= "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNWVkYjA0MWVhYTNmNjkzNjk0NzMwMzJjMjZhZGE1ZSIsIm5iZiI6MTczOTAyMTA3My42OCwic3ViIjoiNjdhNzViMTFlNGJkMDJlNjRjZTA2M2JlIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.5NPhHbhO6obOJf4PZPCnt95qUPNNF1R4pmwPByEeVic";
const BASE_URL= "https://api.themoviedb.org/3";

const axiosInstance= axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
    },
});

export const fetchTrendingMovies= async() =>{
    const response = await axiosInstance.get("/trending/movie/day");
    return response.data.results;
};
export const fetchMovieDetails= async(movieId) =>{
    const response = await axiosInstance.get(`/movie/${movieId}`);
    return response.data;
};
export const fetchMovieCast= async(movieId) =>{
    const response = await axiosInstance.get(`/movie/${movieId}/credits`);
    return response.data.cast;
};
export const fetchMovieReviews= async(movieId) =>{
    const response = await axiosInstance.get(`/movie/${movieId}/reviews`);
    return response.data.results;
};
export async function searchMovies(query) {
    const response = await axiosInstance.get("/search/movie", {
        params: { query },
    });
    return response.data.results;
}