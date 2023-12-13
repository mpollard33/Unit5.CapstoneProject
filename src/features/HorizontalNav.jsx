import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  logout,
  selectState,
  selectToken,
  selectUserId,
  setLoggedIn,
  selectCartItemCount,
} from '../store/authSlice';
import { useGetAllUsersQuery } from './account/authApi';

const HorizontalNav = () => {
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector(selectState);
  const { data: users } = useGetAllUsersQuery();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/products');
  };

  const handleRegister = async () => {
    try {
      if (!sessionStorage.getItem('users')) {
        sessionStorage.setItem('users', JSON.stringify(users));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (users && !sessionStorage.getItem('users')) {
      sessionStorage.setItem('users', JSON.stringify(users));
    }
  }, [users]);

  const cartItemCount = useSelector(selectCartItemCount);

  return (
    <nav className={'horizontal-nav'}>
      <ul className="nav-bar">
        <li>
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/products" className="nav-link">
            Products
          </Link>
        </li>
        <li className="search-input">
          <input type="text" placeholder="Search Products" />
        </li>
        {userId ? (
          <>
            <li>
              <Link to="/users/account" className="nav-link">
                Account
              </Link>
            </li>
            <li onClick={handleLogout} className="nav-link">
              Logout
            </li>
            <li>
              <Link to="/carts/" className="nav-link">
                Cart {cartItemCount > 0 && `(${cartItemCount})`}
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/auth/login" className="nav-link">
                Login
              </Link>
            </li>
            <li>
              <Link
                to="auth/register"
                onClick={handleRegister}
                className="nav-link"
              >
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default HorizontalNav;
