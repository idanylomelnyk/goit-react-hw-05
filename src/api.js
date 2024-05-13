import axios from "axios";

const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YTMzZTFjNGM2NzlkYjk5ZWEyMDQ0NTQ1Njg1NmMyNiIsInN1YiI6IjY2M2EyZGU4ZTkyZDgzMDEyYWQ0OWUyNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MId6LgM4gCHpptqRM6FSFGHq_IjnzTAQ8MUprMmv-v8",
  },
};

export const getMovies = async () => {
  const url = "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
  const response = await axios.get(url, options);
  return response.data.results;
};

export const getMovieByID = async (movieID) => {
  const url = "https://api.themoviedb.org/3/movie/" + movieID;
  const response = await axios.get(url, options);
  return response.data;
};

export const getMovieByQuery = async (query) => {
  const url = "https://api.themoviedb.org/3/search/movie?query=" + query;
  const response = await axios.get(url, options);
  return response.data.results;
};

export const getMovieCast = async (movieID) => {
  const url = `https://api.themoviedb.org/3/movie/${movieID}/credits`;
  const response = await axios.get(url, options);
  return response.data.cast;
};

export const getMovieReviews = async (movieID) => {
  const url = `https://api.themoviedb.org/3/movie/${movieID}/reviews?language=en-US&page=1`;
  const response = await axios.get(url, options);
  return response.data.results;
};
