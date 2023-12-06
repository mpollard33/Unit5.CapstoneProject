import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './products/index.css'; 

const HorizontalNav = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {  // To-implement
    setMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`horizontal-nav ${isMenuOpen ? 'menu-open' : ''}`}>
      <button className="pullout-button" onClick={handleMenuToggle}>
        ☰
      </button>
      <ul className="nav-bar">
        <li><Link to='/' className="nav-link">Home</Link></li>
        <li><Link to='/products' className="nav-link">Products</Link></li>
        <li className="search-bar">
          <form>
            <label>
              <input type="text" className="search-input" placeholder="Search Products" />
            </label>
          </form>
        </li>
        <li><Link to='/users/account' className="nav-link">Log In</Link></li>
        <li><Link to='/users/register' className="nav-link">Register</Link></li>
        <li><Link to='/users/cart' className="nav-link">Cart</Link></li>
      </ul>
    </nav>
  );
};

export default HorizontalNav;
