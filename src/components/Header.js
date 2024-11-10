// src/components/Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import FilterTags from './FilterTags';
import './Header.css';

const filters = [
  { label: 'Top Rated', path: 'movies/toprated' },
  { label: 'Up Coming', path: 'movies/upcoming' },
  { label: 'Most Popular', path: 'movies/popular' },
  { label: 'Show Times', path: 'showtimes' },
  { label: 'Groups', path: 'groups' }
];

const Header = () => {
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  const toggleFilterMenu = () => {
    setIsFilterMenuOpen(!isFilterMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-content">
        {/* Left side: Logo */}
        <div className="header-logo">
          <h1><Link to="/">Movie Log</Link></h1>
        </div>

        {/* Center: Search Bar */}
        <div className="header-search">
          <SearchBar />
        </div>

        {/* Right side: User options */}
        <div className="header-user">
          <Link to="/profile">Account</Link>
          <Link to="/signin">Login</Link> | <Link to="/signup">Register</Link>
        </div>
      </div>

      {/* Filter tags (below Search Bar on larger screens, dropdown menu on smaller screens) */}
      <div className="filter-container">
        <div className="filter-tags-desktop">
          <FilterTags filters={filters}/>
        </div>
        <button className="filter-menu-toggle" onClick={toggleFilterMenu}>
          ☰
        </button>
        {isFilterMenuOpen && (
          <div className="filter-menu">
            <FilterTags filters={filters}/>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;