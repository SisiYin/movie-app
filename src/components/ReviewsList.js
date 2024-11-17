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
                <span className="review-rating">Rating: {review.rating} / 5.0</span>
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
        //   <ul>
        //     <li key={review.id}>
        //       <strong>Email:</strong> {review.email} <br />
        //       <strong>Rating:</strong> {review.rating} <br />
        //       <strong>Comment:</strong> {review.comment} <br />
        //       <strong>Time:</strong> {new Date(review.time).toLocaleString()}
        //     </li>
        //   </ul>
        // ))
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
}
