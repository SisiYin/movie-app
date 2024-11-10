// src/App.js
// client/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieSearch from './components/SearchBar';

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSignup = async () => {
    await axios.post('http://localhost:5000/api/auth/signup', { email, password });
    alert("User registered!");
  };

  const handleSignin = async () => {
    const response = await axios.post('http://localhost:5000/api/auth/signin', { email, password });
    localStorage.setItem('token', response.data.token);
    setIsAuthenticated(true);
  };

  const handleDeleteAccount = async () => {
    const token = localStorage.getItem('token');
    await axios.delete('http://localhost:5000/api/auth/delete', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setIsAuthenticated(false);
    alert("Account deleted!");
  };

  const searchMovies = async () => {
    const response = await axios.get('http://localhost:5000/api/movies/search', { params: { query } });
    setMovies(response.data);
  };

  return (
    <div>
      <h1>Movie App</h1>

      {!isAuthenticated ? (
        <div>
          <h2>Sign Up</h2>
          <input type="email" onChange={e => setEmail(e.target.value)} placeholder="Email" />
          <input type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" />
          <button onClick={handleSignup}>Sign Up</button>

          <h2>Sign In</h2>
          <button onClick={handleSignin}>Sign In</button>
        </div>
      ) : (
        <div>
          <button onClick={handleDeleteAccount}>Delete Account</button>
        </div>
      )}

      <div>
        <h2>Search Movies</h2>
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by title" />
        <button onClick={searchMovies}>Search</button>

        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
  <MovieSearch />
}

export default App;

