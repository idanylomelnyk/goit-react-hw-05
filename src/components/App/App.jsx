import { Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import css from "./App.module.css";
import { Suspense, lazy } from "react";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"))
const MoviesPage = lazy(() => import("../../pages/MoviesPage/MoviesPage"))
const MovieDetailsPage = lazy(() => import("../../pages/MovieDetailsPage/MovieDetailsPage"))
const NotFoundPage = lazy(() => import("../../pages/NotFoundPage/NotFoundPage"))
const MovieCast = lazy(() => import("../MovieCast/MovieCast"))
const MovieReviews = lazy(() => import("../MovieReviews/MovieReviews"))

export default function App() {
  return (
    <>
      
      <div className={css.container}>

      <Header />
        <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieID" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage/>} />
        </Routes>
        </Suspense>
      </div>
    </>
  );
}
