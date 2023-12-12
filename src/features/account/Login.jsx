import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser, setLoggedIn, initializeUser } from '../../store/authSlice';
import { useGetAllUsersQuery } from './authApi';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: users } = useGetAllUsersQuery();

  useEffect(() => {
    if (users) {
      if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify(users));
      }
    }
  }, [users]);

  const handleLogin = () => {
    try {
      const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
      const matchedUser = storedUsers.find(
        (user) => user.username === username && user.password === password
      );

      if (matchedUser) {
        dispatch(setUser(matchedUser));
        dispatch(setLoggedIn(true));
        dispatch(initializeUser());
        navigate('/users/account');
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      console.error('Error during login', error);
      setError('An error occurred during login');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-text">Login</h2>
      <form className="login-container">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <div className="error-message">{error}</div>}
        <button className="login-button" type="button" onClick={handleLogin}>
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
