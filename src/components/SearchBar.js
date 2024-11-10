import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

const SearchBar = () => {
  const [searchTitle,setSearchTitle] = useState('')
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTitle.trim()) { 
      navigate('/movies/title/' + searchTitle);
    }
  };

  return (
    <div className="search-bar">
      <div className="search-input-group">
                {/* <select 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)} 
                    className="category-dropdown"
                >
                    {categories.map((cat, index) => (
                        <option key={index} value={cat}>{cat}</option>
                    ))}
                </select> */}
          <input 
            type="text" 
            placeholder="Search movies..." 
            value={searchTitle} 
            onChange={(e) => setSearchTitle(e.target.value)}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">Search</button>
      </div>
    </div>
    );
};

export default SearchBar;



