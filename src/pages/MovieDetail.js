
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './MovieDetail.css';
import axios from 'axios';
import useUser from '../context/useUser';
import ReviewList from '../components/ReviewsList';
import FavoriteButton from '../components/FavoriteBotton';
import ReviewForm from '../components/ReviewForm';

const MovieDetail = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState('');
  const [reviews,setReviews]=useState([]);
  

  

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
      const response = await axios.get(`http://localhost:3001/movie/reviews/${movieId}`);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  }

  const addReview = (newReview) => {
    setReviews((prevReviews) => [newReview,...prevReviews]);
  };

  useEffect(() => {
    fetchMovies();
    fetchReviews()
  }, [movieId]);

  return (
    <div className="movie-detail">
      <div className="movie-backdrop" 
      // style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}
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
          <p><strong>Rating:</strong> {movie.vote_average} / 10 ({movie.vote_count} votes)</p>
          {/* <p><strong>Languages:</strong> {movie.spoken_languages.map(lang => lang.english_name).join(', ')}</p> */}
          <FavoriteButton movieId={movieId} />
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
        </div>
      </div>
      <div className="reviews-info">
        <h3>Reviews</h3>
        <ReviewForm movieId={movieId} addReview={addReview}/>
        <ReviewList reviews={reviews} />
      </div>
    </div>
  );
};

export default MovieDetail;
