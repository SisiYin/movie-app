import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFavorites, setFilteredFavorites] = useState([]);

  useEffect(() => {
    // 获取收藏的电影/电视剧数据
    const fetchFavorites = async () => {
      try {
        const response = await axios.get('/api/movie/favorites'); // 假设有一个获取收藏列表的 API
        setFavorites(response.data);
        setFilteredFavorites(response.data); // 默认展示全部
      } catch (error) {
        console.error('Failed to fetch favorites:', error);
      }
    };

    fetchFavorites();
  }, []);

  // 根据搜索关键字筛选收藏内容
  useEffect(() => {
    const filtered = favorites.filter(movie =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFavorites(filtered);
  }, [searchTerm, favorites]);

  // 删除收藏
  const handleRemoveFavorite = async (movieId) => {
    try {
      await axios.delete(`/api/movie/favorites/${movieId}`); // 删除指定收藏项
      setFavorites(favorites.filter(movie => movie.id !== movieId));
    } catch (error) {
      console.error('Failed to remove favorite:', error);
    }
  };

  return (
    <div className="favorites-container">
      <h1>My Favorites</h1>
      <input
        type="text"
        placeholder="Search favorites..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="favorites-list">
        {filteredFavorites.map(movie => (
          <div key={movie.id} className="favorite-card">
            <img src={movie.poster_url} alt={movie.title} />
            <div className="favorite-details">
              <h3>{movie.title}</h3>
              <p>Rating: {movie.rating}</p>
              <p>{movie.description}</p>
              <button onClick={() => handleRemoveFavorite(movie.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyFavorites;

