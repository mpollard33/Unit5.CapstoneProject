import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCurrentUser,
  setLoggedIn,
  setId,
  selectUserId,
  selectIsLoggedIn,
} from '../../store/authSlice';
import { useGetAllCartsQuery, useGetAllUsersQuery } from './authApi';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector(selectUserId);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { data: users } = useGetAllUsersQuery();
  const allCarts = useGetAllCartsQuery();

  useEffect(() => {
    if (users && !sessionStorage.getItem('users')) {
      sessionStorage.setItem('users', JSON.stringify(users));
    }
  }, [users]);

  useEffect(() => {
    if (!userId) {
      dispatch(setLoggedIn(false));
    }
  }, [userId]);

  const handleLogin = (e) => {
    e.preventDefault();
    try {
      const storedUsers = JSON.parse(sessionStorage.getItem('users')) || [];
      const matchedUser = storedUsers.find(
        (user) =>
          user.username === formData.username &&
          user.password === formData.password,
      );

      if (matchedUser) {
        dispatch(setCurrentUser({ ...matchedUser, id: matchedUser.id }));
        dispatch(setLoggedIn(true));
        dispatch(setId(matchedUser.id));

        if (!sessionStorage.getItem('carts')) {
          const storedCarts = JSON.stringify(allCarts.data);
          sessionStorage.setItem('carts', storedCarts);
        }

        sessionStorage.setItem(
          'currentUser',
          JSON.stringify({ ...matchedUser, id: matchedUser.id }),
        );

        navigate('/users/account');
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      console.error('Error during login', error);
      setError('An error occurred during login');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="registration-container">
      {userId ? (
        <div className="registration-success">
          <header>
            <h2>Success!!!</h2>
            <div className="success-text">
              <Link to="/">Browse our Products!</Link>
            </div>
          </header>
        </div>
      ) : (
        <div className="login-container">
          <h2 className="login-text">Login</h2>
          <form onSubmit={handleLogin} className="login-form">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {error && <div className="error-message">{error}</div>}
            <button className="login-button" type="submit">
              Login
            </button>
          </form>
          <div className="register-link">
            <Link to="/auth/register">
              Don't have an account? Register here
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
