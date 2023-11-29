import React from 'react';
import { Link } from 'react-router-dom';

const HorizontalNav = () => {
  return (
    <nav className="horizontal-nav">
      <ul>
        <li><Link to='/' className="nav-link">Home</Link></li>
        <li><Link to='/products' className="nav-link">Products</Link></li>
        <li><Link to='/account' className="nav-link">Account</Link></li>
        <li><Link to='/cart' className="nav-link">Cart</Link></li>
      </ul>
    </nav>
  );
};

export default HorizontalNav;
