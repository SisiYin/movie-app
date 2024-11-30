import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import dayjs from 'dayjs';
import './MyReviewsList.css';

export default function MyReviewsList({ reviews, movies,onDeleteReview }) {
  // 定义搜索关键字、排序方式和排序顺序的状态
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('recent');
  const [sortOrder, setSortOrder] = useState('desc'); // 默认排序顺序为降序

  // 切换排序顺序的函数
  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === 'desc' ? 'asc' : 'desc'));
  };

  // 根据用户选择的排序方式来对评论进行排序和过滤
  const displayedReviews = [...reviews]
    .filter((review) => {
      const movie = movies[review.movie_id];
      if (!movie) return false;
      const movieTitle = movie.title.toLowerCase();
      return (
        movieTitle.includes(searchTerm.toLowerCase()) 
      );
    })
    .sort((a, b) => {
      if (sortOption === 'recent') {
        return sortOrder === 'desc' ? new Date(b.time) - new Date(a.time) : new Date(a.time) - new Date(b.time);
      } else if (sortOption === 'rating') {
        return sortOrder === 'desc' ? b.rating - a.rating : a.rating - b.rating;
      } else if (sortOption === 'averageRating') {
        return sortOrder === 'desc' ? b.averageRating - a.averageRating : a.averageRating - b.averageRating;
      }
      return 0;
    });

  const handleDeleteReview = async (reviewId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/reviews/${reviewId}`);
      onDeleteReview(reviewId); // 通知父组件更新评论列表
    } catch (error) {
      console.error("Failed to delete review:", error);
    }
  };

  return (
    <div className="my-review-list">
      {/* 排序和搜索选项 */}
      <div className="filter-sort-container">
        <input
          type="text"
          placeholder="Search reviews..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        
        <div className="sort-options">
          <label htmlFor="sort">Sort by: </label>
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="recent">Most Recent</option>
            <option value="rating">My Rating</option>
            <option value="averageRating">Average Rating</option>
          </select>
          <button className="sort-order-button" onClick={toggleSortOrder}>
            {sortOrder === 'desc' ? '↓' : '↑'} {/* 显示箭头 */}
          </button>
        </div>
      </div>

      {displayedReviews.length > 0 ? (
        displayedReviews.map((review) => {
          const movie = movies[review.movie_id];
          if (!movie) return null;
          return (
            <div key={review.id} className="review-item">
              <div className="movie-info-container">
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-poster"
                />
                <div className="review-info">
                  <h3 className="movie-title">{movie.title}</h3>
                  <div className="release-runtime">
                    <span>{movie.release_date} | {movie.runtime} min</span>
                  </div>
                  <div className="movie-details">
                    <span className='avr-rating'> {review.averageRating} / 5.0</span>
                    <span className='my-rating'> {review.rating} / 5.0</span>
                  </div>
                </div>
              </div>
              <p className="review-comment">{review.comment}</p>
              <div className="review-footer">
                <Link to={`/movies/${movie.id}`} className="details-link">Details &gt;&gt;</Link>
                <p className="review-time">
                  Reviewed on: {dayjs(review.time).format('YYYY-MM-DD HH:mm:ss')}
                </p>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteReview(review.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
}


