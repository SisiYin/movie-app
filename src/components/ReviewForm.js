import React, { useState, useEffect } from 'react';
import useUser from '../context/useUser';
//import './ReviewForm.css';

const url = process.env.REACT_APP_API_URL

const ReviewForm = ({movieId}) => {
  const { user } = useUser();
  const [rating, setRating] = useState('');
  const [newComment, setNewComment] = useState(''); 
  const maxLength = 255; 

  const handleAddReview = async(e) => {
    e.preventDefault();
    if (rating || newComment) {
      try {
        const response = await fetch(url + "/movie/reviews", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            movieId: movieId,
            accountId: user?.id,
            email: user?.email,
            rating: rating,
            comment: newComment,
          }),
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log("Review added successfully", data);
          setRating('');
          setNewComment(''); // Clear the review input field after submission
        } else {
          const errorData = await response.json();
          alert(errorData.message || 'Failed to add review');
        }
        
      } catch (error) {
        console.error('Error submitting review:', error);
        alert('An error occurred. Please try again later.');
      }
    } else {
      alert("Review cannot be empty");
    }
  };

  return (
    <form onSubmit={handleAddReview} className='review-form'>
      <h3>Rate and Review</h3>
      <label>
        Rating (0 - 5.0):
        <input
          type="number"
          step="0.5"
          min="0"
          max="5.0"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        />
      </label>
      <br />
      <div>Comment:</div>
        <textarea
        maxLength={maxLength}
        placeholder="Write a review..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        />
      <div>
        <span className="useCount" id="useCount">{newComment.length}</span>
        <span>/</span>
        <span>{maxLength}</span>
      </div>
      
      <button type="submit">Add Review</button>
    </form>
  );
}

export default ReviewForm;

