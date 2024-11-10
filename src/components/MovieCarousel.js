// src/components/MovieCarousel.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MovieCarousel.css';

const MovieCarousel = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  if (!movies.length) return <div>Loading...</div>; // Loading message if movies array is empty

  // Set main featured movie when a thumbnail is clicked
  const setFeaturedMovie = (index) => {
    setCurrentIndex(index);
  };

  // Scroll next and previous for the thumbnail list with wrap-around
  const scrollNext = () => setCurrentIndex((currentIndex + 1) % movies.length);
  const scrollPrev = () => setCurrentIndex((currentIndex - 1 + movies.length) % movies.length);

  return (
    <div className="carousel-container">
      {/* Main Featured Movie */}
      <div 
        className="featured-movie" 
        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movies[currentIndex].backdrop_path})` }}
      >
        <button className="carousel-control prev" onClick={scrollPrev}>&lt;</button>
        <button className="carousel-control next" onClick={scrollNext}>&gt;</button>
        <div className="overlay">
          <h2>{movies[currentIndex].title}</h2>
          <button 
            className="play-button" 
            onClick={() => navigate(`/movies/${movies[currentIndex].id}`)}
          >
            ▶ Play
          </button>
        </div>
      </div>

      {/* Thumbnail Carousel */}
      <div className="thumbnail-carousel">
        <div className="thumbnails">
          {movies.map((movie, index) => (
            <div
              key={movie.id}
              className={`thumbnail ${index === currentIndex ? 'active' : ''}`}
              style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})` }}
              onClick={() => setFeaturedMovie(index)}
            />
          ))}
        </div>
      </div>

      {/* Category Buttons */}
      <div className="categories">
        {['Action', 'Comedy', 'Drama', 'Horror', 'Romance'].map((category) => (
          <button key={category} className="category-button">{category}</button>
        ))}
      </div>
    </div>
  );
};

export default MovieCarousel;



