import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FilterTags.css';

const FilterTags = ({filters}) => {
    const [selectedFilter, setSelectedFilter] = useState(null); // Only one filter active at a time
    const navigate = useNavigate();

    // Define filter names and their corresponding routes
    // const filters = [
    //   { label: 'Top Rated', path: 'toprated' },
    //   { label: 'Up Coming', path: 'upcoming' },
    //   { label: 'Most Popular', path: 'popular' }
    // ];

    const handleFilterClick = (filter) => {
        const newFilter = selectedFilter === filter.label ? null : filter.label; // Toggle off if clicking the same filter
        setSelectedFilter(newFilter);

      if (newFilter) {
        // Navigate to the specific path if a filter is selected
        navigate(`/${filter.path}`);
      } else {
        // Navigate back to a general movies page if no filter is selected
        navigate('/');
      }
    };

    return (
        <div className="filter-tags">
            {filters.map((filter, index) => (
                <button 
                    key={index} 
                    className={`filter-button ${selectedFilter === filter ? 'active' : ''}`} 
                    onClick={() => handleFilterClick(filter)}
                >
                    {filter.label}
                </button>
            ))}
        </div>
    );
};

export default FilterTags;

