import React, { useRef }from "react";
import { useNavigate } from 'react-router-dom';
import './RecommendMovieList.css';

export default function RecommendMovieList({ movies }) {
  const navigate = useNavigate();
  const listRef = useRef();

  const handleMovieClick = (movieId) => {
    navigate('/movies/'+ movieId);
  };

  const scrollLeft = () => {
    listRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    listRef.current.scrollBy({ left: 300, behavior: "smooth" }); 
  };

  return (
    <div className="movie-list-container">
      <button className="scroll-button left" onClick={scrollLeft}>{'<'}</button>
      <div className="movie-list" ref={listRef}>
        {movies.map((movie) => (
          <div 
            key={movie.id} 
            className="movie-card"
            onClick={() => handleMovieClick(movie.id)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              className="movielist-image"
            />
            <h2 className="movie-title">{movie.title}</h2>
          </div>
        ))}
      </div>
      <button className="scroll-button right" onClick={scrollRight}>{'>'}</button>
    </div>
  );
}
