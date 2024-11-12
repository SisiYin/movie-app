// CommentSection.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommentSection = ({ postId, accountId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  
  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`/comments/${movieId}`);
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  // add new comment
  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/comments/create`, {
        movieId: movieId,
        accountId: accountId,
        comment: newComment,
      });
      setComments([response.data, ...comments]);
      setNewComment(''); // 清空输入框
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  // delete comment
  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`/comments/delete/${commentId}`);
      setComments(comments.filter(comment => comment.id !== commentId));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div className="comment-section">
      <h3>Comments</h3>

      {/* 评论输入表单 */}
      <form onSubmit={handleAddComment}>
        <textarea
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button type="submit">Add Comment</button>
      </form>

      {/* 评论列表 */}
      <ul className="comment-list">
        {comments.map((comment) => (
          <li key={comment.id} className="comment-item">
            <p>{comment.comment}</p>
            <small>{new Date(comment.date).toLocaleString()}</small>
            <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentSection;
