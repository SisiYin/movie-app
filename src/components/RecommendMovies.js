import React, { useState, useEffect } from "react"; 
import axios from "axios"
import MovieList from "./MovieList";
import RecommendMovieList from "./RecommendMovieList";


export default function RecommendMovies({genres}) {
  const [recommendMovies, setRecommendMovies] = useState([]);
  const [error, setError] = useState("");

  const genreIds = genres.map((genre) => genre.id)

  const fetchRecommendMovies = async () => {
    
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?with_genres=${genreIds.join(",")}&api_key=54c539f0a2dca863d152652c08d28924`
      );
      console.log(response.data)
      setRecommendMovies(response.data.results.slice(0, 10)||[]); 
    } catch (err) {
      setError("Failed to fetch movies. Please try again.");
    } 
  };

  useEffect(() => {
    fetchRecommendMovies();
  }, [genres]);

  return (
    <div>
      <h2>Recommended Movies</h2>
      <RecommendMovieList movies={recommendMovies} />
    </div>
  )
}
