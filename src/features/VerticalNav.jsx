import React from 'react';
import '../index.css';

const VerticalNav = ({ handleSortChange, handleCategoryChange, sort }) => {
  const categories = [
    'jewelry',
    'electronics',
    'mens-clothing',
    'womens-clothing',
  ];

  return (
    <ul className="vertical-nav-bar">
      <header>
        <h4>Filter</h4>
      </header>
      <div className="bottom-border"></div>
      <div className="list-container">
        <div className="nav-dropdown">
          <label>
            Sort by Category:
            <select
              onChange={(e) => {
                handleCategoryChange(e.target.value.replace(' ', '-'));
              }}
              value={sort.category || ''}
            >
              <option value=""> -- All Categories --</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.replace('-', ' ')}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="bottom-border"></div>
      </div>
      {['Price', 'Rating', 'Rating Count'].map((option) => (
        <div key={option.toLowerCase()} className="nav-option">
          <label className="single-filter">
            Sort by {option}:{' '}
            <select
              onChange={() => handleSortChange(option.toLowerCase())}
              value={sort.sortType === option.toLowerCase() ? sort.order : ''}
            >
              <option value="">-- Select --</option>
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
          </label>
        </div>
      ))}
    </ul>
  );
};

export default VerticalNav;
