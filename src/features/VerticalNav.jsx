
import React from 'react';
import '../index.css';

const VerticalNav = ({ handleSortChange, handleCategoryChange, sort }) => {
  const categories = [
    'jewelry',
    'electronic',
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
                handleCategoryChange(e.target.value);
              }}
              value={sort.sortType === 'category' ? sort.order : ''}
            >
              <option value=""> -- Select --</option>
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
          <label className ="single-filter">
            Sort by {option}:{' '}
            <select
              onChange={() => handleSortChange(option.toLowerCase())}
              value={sort.sortType === option.toLowerCase() ? sort.order : ''}
            >
              <option value="">-- Select --</option>
              <option value="low">Low to High</option>
              <option value="high">High to Low</option>
            </select>
          </label>
        </div>
      ))}
    </ul>
  );
};

export default VerticalNav;
