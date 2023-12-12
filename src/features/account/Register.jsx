import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGetAllUsersQuery, useRegisterMutation } from './authApi';
import { Link, useNavigate } from 'react-router-dom';
import {
  setId,
  setLoggedIn,
  selectToken,
  selectIsLoggedIn,
  selectUserId,
  initializeUser,
} from '../../store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import './index.css';

const Registration = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const currentToken = useSelector(selectToken);
  const dispatch = useDispatch();
  const loggedIn = useSelector(selectIsLoggedIn);
  const userId = useSelector(selectUserId);
  const [registerUser, {data} ] = useRegisterMutation();
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const onSubmit = async (formData) => {
    try {
      const { data } = await registerUser(formData);

      if (data) {
        console.log('id -> ', data);
        const registeredUserId = data.id;
        dispatch(setId({ id: registeredUserId }));
        dispatch(setLoggedIn(true));
        const currentUsers = JSON.parse(localStorage.getItem('users')) || [];
        const updatedUsers = [...currentUsers, formData];

        localStorage.setItem('users', JSON.stringify(updatedUsers));
        setRegistrationSuccess(true);
      }
    } catch (error) {
      console.log('Error during registration', error);
    }
  };
  
  useEffect(() => {
    if (userId) {
      console.log('UseEffect -> userId: ', userId);
    }
  }, [userId]);

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
        <div className="registration-container">
          <h2 className="register-text">Register</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              {...register('username', { required: true })}
            />
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              {...register('email', { required: true })}
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              {...register('password', { required: true })}
            />
            <label htmlFor="firstname">First Name:</label>
            <input
              type="text"
              id="firstname"
              {...register('name.firstname', { required: true })}
            />
            <label htmlFor="lastname">Last Name:</label>
            <input
              type="text"
              id="lastname"
              {...register('name.lastname', { required: true })}
            />
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              {...register('address.city', { required: true })}
            />
            <label htmlFor="street">Street:</label>
            <input
              type="text"
              id="street"
              {...register('address.street', { required: true })}
            />
            <label htmlFor="number">Number:</label>
            <input
              type="number"
              id="number"
              {...register('address.number', { required: true })}
            />
            <label htmlFor="zipcode">Zip Code:</label>
            <input
              type="text"
              id="zipcode"
              {...register('address.zipcode', { required: true })}
            />
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              id="phone"
              {...register('phone', { required: true })}
            />
            <button className="register-button" type="submit">
              Register
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Registration;
