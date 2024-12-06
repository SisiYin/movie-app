// src/components/Header.js
import React, { useContext, useState } from 'react';
import homeIcon from "../assets/Home.svg"
import profileIcon from "../assets/Profile.svg"
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import FilterTags from './FilterTags';
import {UserContext} from '../context/UserContext.js'; 
import './Header.css';

const filters = [
  { label: 'Top Rated', path: 'movies/toprated' },
  { label: 'Up Coming', path: 'movies/upcoming' },
  { label: 'Most Popular', path: 'movies/popular' },
  { label: 'Show Times', path: 'showtimes' },
  { label: 'Groups', path: 'groups' },
  {label:'Shares', path:'shares'}
];

const Header = () => {
  // const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const { user, signOut } = useContext(UserContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // const toggleFilterMenu = () => {
  //   setIsFilterMenuOpen(!isFilterMenuOpen);
  // };
  const navigate = useNavigate();
  const handleSignOut = () => {
    signOut();
    navigate("/signin"); 
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleNavigate = (path) => {
    setIsDropdownOpen(false); 
    navigate(path);
  };

  const handleDeleteAccount = () => {
    // deleteAccount();
    navigate("/signin"); 
  };

  return (
    <header className="header">
      <div className="header-content">
        {/* Left side: Logo */}
        <div className="header-logo">
          <Link to="/"><img src={homeIcon} className='homeIcon'></img></Link>
        </div>

        {/* Center: filters */}
        <div className="header-filters">
          <FilterTags filters={filters}/>
        </div>

        {/* Center: Search Bar */}
        {/* <div className="header-search">
          <SearchBar />
        </div> */}

        {/* Right side: Login/register or Welcome back */}
        <div className="login">
        {user && user.email ? (
            <>
              {/* <Link to={`/user/${user.id}/profile`} className='login-content'>Account</Link>| */}
              <Link onClick={handleSignOut} className='login-content'>Sign Out</Link>
            </>
          ) : (
            <>
              <Link to="/signin" className='login-content'>Login</Link> | <Link to="/signup" className='login-content'>Register</Link>
            </>
          )}
        </div>

        {/* Right side: Profile icon */}
        {/* Right side: Profile icon and dropdown menu */}
        <div className="header-user">
          <img
            src={profileIcon}
            className="profileIcon"
            alt="Profile"
            onClick={toggleDropdown}
          />
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <div onClick={() => handleNavigate(`/user/${user.id}/account`)} className="dropdown-item">My Account</div>
              <div onClick={() => handleNavigate(`/user/${user.id}/favorite`)} className="dropdown-item">My Favorites</div>
              <div onClick={() => handleNavigate(`/user/${user.id}/review`)} className="dropdown-item">My Reviews</div>
              <div onClick={() => handleNavigate(`/user/${user.id}/group`)} className="dropdown-item">My Groups</div>
              {/*<div onClick={() => handleNavigate(`/user/${user.id}/settings`)} className="dropdown-item">Account settings</div> */}
              <div onClick={handleDeleteAccount} className="dropdown-item">Delete Account</div>
            </div>
          )}
        </div>

      {/* Filter tags (below Search Bar on larger screens, dropdown menu on smaller screens) */}
      {/* <div className="filter-container">
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
        )}*/}
      </div> 
    </header>
  );
};

export default Header;