import React, { useState } from 'react';
import useUser from '../context/useUser';
import { useNavigate } from 'react-router-dom'; 
import dayjs from 'dayjs'
import './ReviewForm.css';

const url = process.env.REACT_APP_API_URL

const ReviewForm = ({movieId,addReview }) => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [rating, setRating] = useState('');
  const [newComment, setNewComment] = useState(''); 
  const maxLength = 255; 

  const handleAddReview = async(e) => {
    e.preventDefault();

    if (!user.id) {
      alert("Please log in to add a review.");
      navigate('/signin'); // Redirect to login page if user is not logged in
      return;
    }

    if (rating || newComment) {
      try {
        const response = await fetch(url + "/movie/reviews", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            movieId: movieId,
            accountId: user.id,
            email: user.email,
            rating: rating,
            comment: newComment,
            time: new Date().toISOString(),
          }),
        });
        
        if (response.ok) {
          const data = await response.json();
          const formattedTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
          addReview({
            email: user.email,
            rating: parseFloat(rating).toFixed(1),
            comment: newComment,
            time: new Date().toISOString(),
          });
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
      <h3>Write a Review</h3>
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

