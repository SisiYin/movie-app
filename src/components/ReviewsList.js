import React from 'react';
import dayjs from 'dayjs';
import './ReviewsList.css';

export default function ReviewList({ reviews }) {
  return (
    <div className="review-list">
      {/* <h2>Reviews</h2> */}
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className="review-item">
            <div className="review-header">
              <strong>{review.email}</strong>
              {review.rating && (
                <span className="review-rating">  {review.rating} / 5.0</span>
              )}
            </div>
            <p className="review-comment">{review.comment}</p>
            <div className="review-footer">
              {/* <a href={review.url} target="_blank" rel="noopener noreferrer">Read full review</a> */}
              <span className="review-date">
              {dayjs(review.time).format('YYYY-MM-DD HH:mm:ss')}
              </span>
            </div>
          </div>
        ))
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
}
