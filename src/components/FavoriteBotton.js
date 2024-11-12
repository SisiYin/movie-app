// FavoriteButton.js

import React, { useState, useEffect } from 'react';
import './FavoriteButton.css';

const FavoriteButton = ({ movieId }) => {
  const [isFavorite, setIsFavorite] = useState(false); 

  // check favorite state:
  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      try {
        const url = `https://api.themoviedb.org/3/movie/${movieId}/account_states?api_key=54c539f0a2dca863d152652c08d28924&session_id=df14e615c6e8a37fc3396968bdc758d8c1e051a0`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.favorite) {
          setIsFavorite(true);
        }
      } catch (error) {
        console.error('Error fetching favorite status:', error);
      }
    };

    fetchFavoriteStatus();
  }, [movieId]);

  const handleFavoriteClick = async () => {
    try {
      const url = 'https://api.themoviedb.org/3/account/21613810/favorite?api_key=54c539f0a2dca863d152652c08d28924&session_id=df14e615c6e8a37fc3396968bdc758d8c1e051a0';
      const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          media_type: 'movie',
          media_id: movieId,
          favorite: !isFavorite
        }),
      };

      const response = await fetch(url, options);
      const data = await response.json();

      if (data.success) {
        setIsFavorite(!isFavorite); 
      } else {
        console.error('Failed to update favorite status:', data.status_message);
      }
    } catch (error) {
      console.error('Error updating favorite status:', error);
    }
  };

  return (
    <button className="favorite-button" onClick={handleFavoriteClick}>
      <span className={`heart-icon ${isFavorite ? 'favorite' : ''}`}>&#9829;</span> {/* Unicode for heart*/}
    </button>
  );
};

export default FavoriteButton;




