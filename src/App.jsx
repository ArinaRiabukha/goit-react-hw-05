import { Route, Routes } from 'react-router-dom'
import { Suspense, lazy } from "react";
import './App.css'
const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage/MovieDetailsPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));

import Navigation from "./components/Navigation/Navigation";
import MovieCast from './components/MovieCast/MovieCast';
import MovieReviews from './components/MovieReviews/MovieReviews';

function App() {
    return(
        <main>
            <Navigation/>
            <Suspense fallback={<p className='loader'>Loading...</p>}>
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/movies' element={<MoviesPage/>}/>
                <Route path="/movies/:movieId" element={<MovieDetailsPage />} >
                    <Route path="cast" element={<MovieCast />} />
                    <Route path="reviews" element={<MovieReviews />} />
                </Route>
                <Route path='*' element={<NotFoundPage/>} />
            </Routes>
            </Suspense>
        </main>
    )
}

export default App;
