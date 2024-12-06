// src/components/ShowtimeList.js
import React from 'react';
import dayjs from 'dayjs';
import './ShowtimeList.css';

const ShowtimeList = ({showtime}) => {
  return (
    <li key={showtime.id} className="showtime-content-item">
      <div className="content-header">
        <span className="username">
          <strong>{showtime.username}</strong>
        </span>
        <span className="created-at">
          Added at: {dayjs(showtime.created_at).format('YYYY-MM-DD')}
        </span>
      </div>
      <div className="content-description">
        <p>{showtime.description}</p>
      </div>
    </li>        
  );
};

export default ShowtimeList;
