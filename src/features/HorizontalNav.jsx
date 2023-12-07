import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import './products/index.css'; 
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectToken } from '../store/authSlice';


const HorizontalNav = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleMenuToggle = () => {  // To-implement
    setMenuOpen(!isMenuOpen);
  };

  
  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  }
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
        <li><Link to='/users/account' className="nav-link">Account</Link></li>
        {token ? (
          <>
            <li onClick={handleLogout} className="nav-link">Logout</li>
            <li><Link to='/users/cart' className="nav-link">Cart</Link></li>
          </>
        ) : (
          <>
            <li><Link to='/auth/login' className="nav-link">Login</Link></li> 
          </>
        )}
      </ul>
    </nav>
  );
};

export default HorizontalNav;
