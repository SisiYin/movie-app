import React from 'react'
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import './MyFavoritesList.css';

export default function MyFavoritesList({movies}) {
  return (
    <div className="my-favorites-list">
      {/* <h2>Reviews</h2> */}
      {movies.length > 0 ? (
        movies.map ((movie) => (
          <div div key={movie.id} className="movie-item">
            <div className="movie-info-container">
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster"
              />
              <div className="movie-info">
                <h3 className="movie-title">{movie.title}</h3>
                <div className="release-runtime">
                  <span>{movie.release_date} | {movie.runtime} min</span>
                </div>
                <div className='movie-details'>
                  <span className='avr-rating'>Rating: {movie.averageRating} / 5.0</span>
                </div>
              </div>
            </div>
            
            <p className="movie-overview">{movie.overview}</p>
            <div className="movie-footer">
              <Link to={`/movies/${movie.id}`} className="details-link">Details &gt;&gt;</Link>
                {/* <p className="add-favorites-time">
                  Added on: {dayjs(movie.time).format('YYYY-MM-DD HH:mm:ss')}
                </p> */}
            </div>  
          </div>
         ))
      ) : (
        <p>No favorites available.</p>
      )}
    </div>
  );

}