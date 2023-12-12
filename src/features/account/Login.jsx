import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  setCurrentUser,
  setLoggedIn,
  initializeUser,
  setId,
} from '../../store/authSlice';
import { useGetAllUsersQuery } from './authApi';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: users } = useGetAllUsersQuery();

  useEffect(() => {
    if (users && !sessionStorage.getItem('users')) {
      sessionStorage.setItem('users', JSON.stringify(users));
    }
  }, [users]);

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
        dispatch(setCurrentUser(matchedUser.username));
        dispatch(setLoggedIn(true));
        dispatch(setId(matchedUser.id));
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
        <Link to="/auth/register">Don't have an account? Register here</Link>
      </div>
    </div>
  );
};

export default Login;
