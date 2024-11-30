import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './MyReviewsPage.css';
import useUser from '../context/useUser';
import MyReviewsList from '../components/MyReviewsList';

const url = process.env.REACT_APP_API_URL;

export default function MyReviewsPage() {
  const { user } = useUser();
  const [reviews, setReviews] = useState([]);
  const [movies, setMovies] = useState({}); // Store movie details with movieId as key

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${url}/user/${user.id}/reviews`);
        setReviews(response.data);
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
      }
    };

    fetchReviews();
  }, [user.id]);

  

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const movieIds = reviews.map((review) => review.movie_id);
      const uniqueMovieIds = [...new Set(movieIds)];

      try {
        const moviePromises = uniqueMovieIds.map((movieId) =>
          fetch(
            `https://api.themoviedb.org/3/movie/${movieId}?api_key=54c539f0a2dca863d152652c08d28924`
          )
            .then((res) => res.json())
            .catch((err) => {
              console.error('Error fetching movie details:', err);
              return null;
            })
        );
        const movieData = await Promise.all(moviePromises);

        const movieDetails = {};
        movieData.forEach((movie) => {
          if (movie) {
            movieDetails[movie.id] = movie;
          }
        });

        setMovies(movieDetails);
      } catch (error) {
        console.error('Failed to fetch movie details:', error);
      }
    };

    if (reviews.length > 0) {
      fetchMovieDetails(); // Fetch movie details after reviews
    }
  }, [reviews]);

  useEffect(() => {
    const fetchAverageRatings = async () => {
      try {
        const updatedReviews = await Promise.all(
          reviews.map(async (review) => {
            try {
              const response = await axios.get(`http://localhost:3001/movie/${review.movie_id}/rating`);
              const averageRating = response.data[0]?.averagerating || 'N/A';
              return { ...review, averageRating };
            } catch (error) {
              console.error(`Error fetching rating for movieId ${review.movie_id}:`, error);
              return { ...review, averageRating: 'N/A' };
            }
          })
        );

        setReviews(updatedReviews);
      } catch (error) {
        console.error('Error updating reviews with average ratings:', error);
      }
    };

    if (reviews.length > 0) {
      fetchAverageRatings(); // Fetch average ratings after reviews are loaded
    }
  }, [reviews]);

  return (
    <div className="reviews-page">
      <h1>My Reviews</h1>
      <MyReviewsList reviews={reviews} movies={movies} />
      
   
      {/* <div className="my-reviews-list">
        {reviews.map((review) => {
          const movie = movies[review.movie_id];
          if (!movie) return null; // Skip if movie details not available yet

          return (
            
            <div key={review.id} className="review-item">
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster"
              />
              <div className="review-info">
                <h3 className="movie-title">
                  <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
                </h3>
                <div className="movie-details">
                  <span>{movie.release_date} | {movie.runtime} min</span>
                  <span>Rating: {review.vote_average}</span>
                </div>
                <p className="review-text">{review.comment}</p>
                <div className="review-footer">
                  <p className="rating">Your Rating: {review.rating}</p>
                  <p className="time">
                    Reviewed on: {new Date(review.time).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div> */}
    </div>
  );
}




