import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ShowTimes.css'

function ShowTimes() {
  const [theaters, setTheaters] = useState([]);
  const [movies, setMovies] = useState([]);
  const [selectedTab, setSelectedTab] = useState('theaters');

  // get data
  useEffect(() => {
    const fetchData = async () => {
      const theaterResponse = await axios.get('/api/theaters');
      setTheaters(theaterResponse.data);

      const movieResponse = await axios.get('/api/movies');
      setMovies(movieResponse.data);
    };

    fetchData();
  }, []);

  return (
    <div className="showtimes-container">
      <h1>ShowTimes</h1>
      <div className="tabs">
        <button onClick={() => setSelectedTab('theaters')} className={selectedTab === 'theaters' ? 'active' : ''}>
          Theaters ({theaters.length})
        </button>
        <button onClick={() => setSelectedTab('movies')} className={selectedTab === 'movies' ? 'active' : ''}>
          Movies ({movies.length})
        </button>
      </div>

      {selectedTab === 'theaters' && (
        <div>
          <h3>Showing {theaters.length} theaters with showtimes</h3>
          {theaters.map((theater) => (
            <div key={theater.id} className="theater">
              <h4>{theater.name}</h4>
              <p>{theater.location} - {theater.distance} km away</p>
            </div>
          ))}
        </div>
      )}

      {selectedTab === 'movies' && (
        <div>
          <h3>{movies.length} movies playing near you</h3>
          <select>
            <option>Sort by: Popularity</option>
            <option>Rating</option>
            <option>Release Date</option>
          </select>
          <div className="movie-list">
            {movies.map((movie) => (
              <div key={movie.id} className="movie">
                <h4>{movie.title} ({movie.runtime})</h4>
                <p>Rating: {movie.rating}</p>
                <p>Showtimes: {movie.showtimes.join(', ')}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowTimes;

