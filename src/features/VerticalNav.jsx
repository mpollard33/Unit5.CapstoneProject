import { useState } from 'react';
import '../index.css';

const VerticalNav = ({ handleSortChange, sortBy }) => {
  return (
    <ul className="vertical-nav-bar">
      <header>
        <h4>Filter</h4>
      </header>
      <div className="bottom-border"></div>

      <div className="list-container">
        Category:
        <div className="nav-dropdown">
          <select>
            <option value="">-- Select --</option>
            <option value="/">Jewelry</option>
            <option value="/">Electronic</option>
            <option value="/">Men's Clothing</option>
            <option value="/">Women's Clothing</option>
          </select>
        </div>
        <div className="bottom-border"></div>
        <div className="search-bar"></div>
      </div>
      <div>
        <label>
          Sort by Price: <span>{'  '} </span>
          <select onChange={handleSortChange} value={sortBy}>
            <option value="">-- Select --</option>
            <option value="low">Low to High</option>
            <option value="high">High to Low</option>
          </select>
        </label>
      </div>
    </ul>
  );
};

export default VerticalNav;
