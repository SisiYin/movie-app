// src/components/FilteredMovieList.js
import React, { useState, useEffect } from 'react';
import MovieCarousel from './MovieCarousel';

const MovieCarouselList = ({ type }) => {
  const [movies, setMovies] = useState([]);

  // Fetch movies based on the provided type (e.g., "now_playing")
  const fetchMovies = async () => {
    const url = `https://api.themoviedb.org/3/movie/${type}`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NGM1MzlmMGEyZGNhODYzZDE1MjY1MmMwOGQyODkyNCIsIm5iZiI6MTczMDkzMzU5Ny4wNDU3NjksInN1YiI6IjY3MmIwY2VlMmY2NGViZThjOGU0ZGVmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6pw2lCXSmmNW75P1F8EVCq-dMxYpyPwn2QcF3f7PV7Y', 
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setMovies(data.results.slice(0, 10) || []); // Get only the first three movies
    } catch (error) {
      console.error('Failed to fetch movies:', error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [type]);

  return (
    <div className="filtered-movie-list">
      <MovieCarousel movies={movies} /> {/* Pass movies to MovieCarousel */}
    </div>
  );
};

export default MovieCarouselList;
