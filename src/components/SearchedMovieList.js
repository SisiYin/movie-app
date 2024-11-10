import React, { useState, useEffect } from 'react';
import MovieList from './MovieList';


export default function SearchedMovieList({searchTitle}) {
  const [movies, setMovies] = useState([]);
  
  // fetch data
  const fetchMovies = async () => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${searchTitle}`;
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
      setMovies(data.results || []);
    } catch (error) {
      console.error('Failed to fetch movies:', error);
    }
  };

  
  useEffect(() => {
    fetchMovies(searchTitle);
  }, [searchTitle]);

  return (
    <div>
      <MovieList movies={movies} />
    </div>
  );
}
