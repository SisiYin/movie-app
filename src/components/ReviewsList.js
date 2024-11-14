// src/components/ReviewList.js
import React from 'react';
//import './ReviewList.css';

export default function ReviewList({ reviews }) {
  return (
    <div className="review-list">
      <h2>Reviews</h2>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          // <div key={review.id} className="review-item">
          //   <div className="review-header">
          //     <strong>{review.author_details.username || 'Anonymous'}</strong>
          //     {review.author_details.rating && (
          //       <span className="review-rating">Rating: {review.author_details.rating} / 10</span>
          //     )}
          //   </div>
          //   <p className="review-content">{review.content}</p>
          //   <div className="review-footer">
          //     <a href={review.url} target="_blank" rel="noopener noreferrer">Read full review</a>
          //     <span className="review-date">
          //       {new Date(review.created_at).toLocaleDateString()}
          //     </span>
          //   </div>
          // </div>

          <ul>
            <li key={review.id}>
              <strong>Email:</strong> {review.email} <br />
              <strong>Rating:</strong> {review.rating} <br />
              <strong>Comment:</strong> {review.comment} <br />
              <strong>Time:</strong> {new Date(review.time).toLocaleString()}
            </li>
          </ul>
        ))
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
}
