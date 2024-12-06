
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './MovieDetail.css';
import axios from 'axios';
import useUser from '../context/useUser';
import MovieReviewsList from '../components/MovieReviewsList';
import star from "../assets/star.svg"
import FavoriteButton from '../components/FavoriteBotton';
import ReviewForm from '../components/ReviewForm';
import GroupSelectionModal from '../components/GroupSelection';

const MovieDetail = () => {
  const { movieId } = useParams();
  const { user } = useUser();
  const [movie, setMovie] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviews,setReviews]=useState([]);
  const [averageRating,setAverageRating] = useState('')
  const [showGroup, setShowGroup] = useState(false);
  // fetch data
  const fetchMovies = async () => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}`;
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
      setMovie(data);
    } catch (error) {
      console.error('Failed to fetch movies:', error);
    }
  };

  // const fetchReviews = async () => {
  //   const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews`;
  //   const options = {
  //     method: 'GET',
  //     headers: {
  //       accept: 'application/json',
  //       Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NGM1MzlmMGEyZGNhODYzZDE1MjY1MmMwOGQyODkyNCIsIm5iZiI6MTczMDkzMzU5Ny4wNDU3NjksInN1YiI6IjY3MmIwY2VlMmY2NGViZThjOGU0ZGVmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6pw2lCXSmmNW75P1F8EVCq-dMxYpyPwn2QcF3f7PV7Y', 
  //     },
  //   };

  //   try {
  //     const response = await fetch(url, options);
  //     const data = await response.json();
  //     setReviews(data.results);
  //   } catch (error) {
  //     console.error('Failed to fetch movies:', error);
  //   }
  // };
  const fetchReviews = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/movie/${movieId}/reviews`);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  }

  const fetchAverageRating = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/movie/${movieId}/rating`);
      setAverageRating(response.data[0].averagerating);
      console.log(response.data[0].averagerating)
    } catch (error) {
      console.error('Error fetching rating:', error);
    }
  }

  const handleAddToGroup = (movie) => {
    setShowGroup(true); 
  };

  const addReview = (newReview) => {
    setReviews((prevReviews) => [newReview,...prevReviews]);
  };

  useEffect(() => {
    fetchMovies();
    fetchReviews();
    fetchAverageRating();
  }, [movieId,user]);

  return (
    <div className="movie-detail">
      <div className="movie-backdrop" 
      style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}
      >
        <div className="movie-title">
          <h1>{movie.title}</h1>
          <p className="movie-tagline">{movie.tagline}</p>
        </div>
      </div>

      <div className="movie-info">
        <img className="movie-poster" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />

        <div className="movie-details">
          <p><strong>Overview:</strong> {movie.overview}</p>
          {/* <p><strong>Genres:</strong> {movie.genres.map(genre => genre.name).join(', ')}</p> */}
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
          <p><img src={star} className='starIcon'></img>{averageRating} / 5.0(votes)</p>
          {/* <p><strong>Languages:</strong> {movie.spoken_languages.map(lang => lang.english_name).join(', ')}</p> */}
          <FavoriteButton movieId={movieId} />
          <span className="average-rating">  {averageRating} / 5.0</span>
          <p><strong>Production Companies:</strong></p>
          {/* <ul>
            {movie.production_companies.map(company => (
              <li key={company.id}>
                {company.logo_path ? (
                  <img src={`https://image.tmdb.org/t/p/w200${company.logo_path}`} alt={company.name} className="company-logo" />
                ) : null}
                {company.name}
              </li>
            ))}
          </ul> */}
          <p><a href={movie.homepage} target="_blank" rel="noopener noreferrer">Visit Official Website</a></p>
          <button onClick={() => handleAddToGroup(movie)}>Add to group</button>
        </div>
      </div>

      {/* add to group */}
      
      {showGroup && (
        <GroupSelectionModal
          movie={movie}
          onClose={() => setShowGroup(false)}
        />
      )}


      <div className="reviews-section">
        <div className="reviews-header">
          <h2>Reviews</h2>
          <button className="add-review-btn" onClick={() => user.id? setShowReviewForm(true) : alert("Please log in to add a review.")}> Add Review </button>
        </div>

        {showReviewForm && (
        <div className="modal">
          <div className="modal-content">
            <button
              className="close-modal"
              onClick={() => setShowReviewForm(false)}
            >
              ×
            </button>
            <ReviewForm
              movieId={movieId}
              addReview={addReview}
              closeForm={() => setShowReviewForm(false)}
            />
          </div>
        </div>
      )}

        <MovieReviewsList reviews={reviews} />
      </div>
    </div>
  );
};

export default MovieDetail;
