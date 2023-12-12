import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './products/index.css'; 
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectState, selectToken } from '../store/authSlice';

const HorizontalNav = () => {
  const currentToken = useSelector(selectToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector(selectState);
  
  const handleLogout = () => {
    console.log("before logout", state );
    dispatch(logout());
    console.log("after logout", state);
    navigate('/products');
  };

  useEffect(() => {
      console.log('Use Effect -> Token changed', currentToken);
  }, [currentToken]);

  return (
    <nav className={"horizontal-nav"}>
      <ul className="nav-bar">
        <li><Link to='/' className="nav-link">Home</Link></li>
        <li><Link to='/products' className="nav-link">Products</Link></li>
        <li className="search-input">
          <input type="text" placeholder="Search Products" />
        </li>
        {currentToken ? (
          <>
            <li><Link to='/users/account' className="nav-link">Account</Link></li>
            <li onClick={handleLogout} className="nav-link">Logout</li>
            <li><Link to='/carts/' className="nav-link">Cart</Link></li>
          </>
        ) : (
          <>
          <li><Link to='/auth/login' className="nav-link">Login</Link></li>
          <li><Link to='auth/register' className="nav-link">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default HorizontalNav;
