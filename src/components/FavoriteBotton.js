import React, { useState, useEffect } from 'react';
import useUser from '../context/useUser';
import './FavoriteButton.css';

const url = process.env.REACT_APP_API_URL

const FavoriteButton = ({ movieId }) => {
  const { user } = useUser();
  const [isFavorite, setIsFavorite] = useState(false); 

  // check favorite state:
  useEffect(() => {
    if (!user.id) {
      setIsFavorite(false); 
      return;
    }

    const fetchFavoriteStatus = async () => {
      try {
        // const url = `https://api.themoviedb.org/3/movie/${movieId}/account_states?api_key=54c539f0a2dca863d152652c08d28924&session_id=df14e615c6e8a37fc3396968bdc758d8c1e051a0`;
        // const response = await fetch(url);

        //from backend
        const response = await fetch(`${url}/movie/favorites/${user.id}/${movieId}`);
        const data = await response.json();
        console.log(data)
        if (data.isFavorite) {
          setIsFavorite(true);
        }
      } catch (error) {
        console.error('Error fetching favorite status:', error);
      }
    };

    fetchFavoriteStatus();
  }, [movieId,user.id]);

  const handleFavoriteClick = async () => {
    //check login
    if (!user.id) {
      alert("Please log in to add movies to your favorites.");
      return;
    }
    try {
      // const url = 'https://api.themoviedb.org/3/account/21613810/favorite?api_key=54c539f0a2dca863d152652c08d28924&session_id=df14e615c6e8a37fc3396968bdc758d8c1e051a0';
      // const options = {
      //   method: 'POST',
      //   headers: {
      //     accept: 'application/json',
      //     'content-type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     media_type: 'movie',
      //     media_id: movieId,
      //     favorite: !isFavorite
      //   }),
      // };

      // const response = await fetch(url, options);

      //from databese
      const response = await fetch(url + "/movie/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accountId: user.id,
          movieId: movieId,
          favorite: !isFavorite,
        }),
      });
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
      <p className={`heart-icon ${isFavorite ? 'favorite' : ''}`}>&#9829;</p> {/* Unicode for heart*/}
    </button>
  );
};

export default FavoriteButton;




