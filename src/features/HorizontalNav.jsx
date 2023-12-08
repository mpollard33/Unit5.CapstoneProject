import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './products/index.css'; 
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectToken } from '../store/authSlice';

const HorizontalNav = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className={`horizontal-nav ${isMenuOpen ? 'menu-open' : ''}`}>
      <button className="pullout-button" onClick={() => setMenuOpen(!isMenuOpen)}>
        ☰
      </button>
      <ul className="nav-bar">
        <li><Link to='/' className="nav-link">Home</Link></li>
        <li><Link to='/products' className="nav-link">Products</Link></li>
        <li className="search-input">
          <input type="text" placeholder="Search Products" />
        </li>
        {token ? (
          <>
            <li><Link to='/users/account' className="nav-link">Account</Link></li>
            <li onClick={handleLogout} className="nav-link">Logout</li>
            <li><Link to='/users/cart' className="nav-link">Cart</Link></li>
          </>
        ) : (
          <li><Link to='/auth/login' className="nav-link">Login</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default HorizontalNav;
