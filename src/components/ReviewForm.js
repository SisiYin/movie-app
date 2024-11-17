import React, { useState } from 'react';
import useUser from '../context/useUser';
import { useNavigate } from 'react-router-dom'; 
import './ReviewForm.css';

const url = process.env.REACT_APP_API_URL

const ReviewForm = ({movieId,addReview }) => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
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
      
      <div className="rating-section">
        <label>Your Rating:</label>
        <div className="stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${rating >= star ? 'selected' : ''}`}
              onClick={() => setRating(star)}
            >
              ★
            </span>
          ))}
        </div>
        <span>{rating} / 5</span>
      </div>

      <div>Comment:</div>
      <textarea
        maxLength={maxLength}
        placeholder="Write a review..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <div>
        <span className="useCount" id="useCount">{newComment.length}/{maxLength}</span>
      </div>

      <button type="submit">Add Review</button>
    </form>
  );
}

export default ReviewForm;

