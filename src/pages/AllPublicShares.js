import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AllPublicShares.css';

const url = process.env.REACT_APP_API_URL
const basicUrl = 'http://localhost:3000'

const AllPublicShares = () => {
  const [shares, setShares] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 获取所有公开分享的用户数据
    axios
      .get(url+'/user/shares') 
      .then((response) => {
        console.log(response.data.rows)
        setShares(response.data.rows);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='all-public-shares'>
      <h1>Public Favorite Lists</h1>
      <ul>
        {shares.map((share, index) => (
          <li key={index}>
            <strong>{share.email}</strong>: 
            <a href={`${basicUrl}/share/${share.share_url}`} target="_blank" rel="noopener noreferrer">
              View Favorites
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllPublicShares;
