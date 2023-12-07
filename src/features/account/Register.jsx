import React from 'react';
import { useForm } from 'react-hook-form';
import { useRegisterMutation } from './authApi';
import './index.css';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();
  const [] = useRegisterMutation();

  const [registerMutation, { data, error }] = useRegisterMutation();

  const onSubmit = async (formData) => {
    try {
      const attemptRegister = await registerMutation(formData);

      console.log('Form submitted:', attemptRegister);
      // navigate('/auth/login');
    } catch (error) {
      console.log('Error during registration', error);
    }
  };

  return (
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

        <label htmlFor="lat">Latitude:</label>
        <input
          type="text"
          id="lat"
          {...register('address.geolocation.lat', { required: true })}
        />

        <label htmlFor="long">Longitude:</label>
        <input
          type="text"
          id="long"
          {...register('address.geolocation.long', { required: true })}
        />

        <label htmlFor="phone">Phone:</label>
        <input
          type="text"
          id="phone"
          {...register('phone', { required: true })}
        />

        <button
          className="register-button"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>
        {error && <div>Error: {error.message}</div>}
      </form>
    </div>
  );
};

export default Registration;