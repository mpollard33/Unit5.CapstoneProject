import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  useAddUserCartMutation,
  useGetAllCartsQuery,
  useGetAllUsersQuery,
  useRegisterMutation,
} from './authApi';
import { Link } from 'react-router-dom';
import {
  setLoggedIn,
  setCart,
  initializeUser,
  selectUserId,
  selectCurrentUser,
  selectCart,
  setCurrentUser,
} from '../../store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import './index.css';

const Registration = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const userState = useSelector(selectCurrentUser);
  const userId = useSelector(selectUserId);
  const [registerUser] = useRegisterMutation();
  const allCarts = useGetAllCartsQuery();
  const [createUserCart, { data: cartId }] = useAddUserCartMutation();
  const { data: users } = useGetAllUsersQuery();
  const { data: carts } = useGetAllCartsQuery();

  const selectedCart = useSelector(selectCart);

  const onSubmit = async (formData) => {
    try {
      const { data: registerResponse } = await registerUser(formData);

      if (registerResponse) {
        const apiCarts = JSON.stringify(allCarts.data);
        if (!sessionStorage.getItem('carts')) {
          sessionStorage.setItem('carts', apiCarts);
        }

        const registeredUserId = registerResponse.id;

        const currentUsers = JSON.parse(sessionStorage.getItem('users')) || [];

        const isDuplicateId = currentUsers.some(
          (user) => user.id === registeredUserId,
        );

        const updatedUserId = isDuplicateId
          ? currentUsers.length + 1
          : registeredUserId;
        const updatedUser = { id: updatedUserId, ...formData };

        dispatch(setLoggedIn(updatedUser));

        const updatedUsers = [...currentUsers, updatedUser];
        sessionStorage.setItem('users', JSON.stringify(updatedUsers));
        sessionStorage.setItem('currentUser', JSON.stringify(updatedUser));

        const getCartId = async (cartData) => {
          try {
            const { data: cartId } = await createUserCart(cartData);
            console.log('Cart created with cartId: ', cartId);
            if (cartId) return cartId;
            return null;
          } catch (error) {
            console.error('Error during registration', error);
            throw error;
          }
        };

        const userCartData = {
          id: currentUsers.length + 1,
          userId: currentUsers.length + 1,
          date: new Date().toISOString(),
          products: [],
        };

        const currentCarts = JSON.parse(sessionStorage.getItem('carts')) || [];

        const userCartId = await getCartId(userCartData);
        const updatedCarts = [...currentCarts, userCartData];

        dispatch(setCart(userCartData));
        console.log('Current cart set:', selectedCart);
      }
    } catch (error) {
      console.log('Error during registration', error);
    }
  };

  useEffect(() => {
    if (users && !sessionStorage.getItem('users')) {
      sessionStorage.setItem('users', JSON.stringify(users));
      console.log('Rendered from Register');
    }
    if (carts && !sessionStorage.getItem('carts')) {
      sessionStorage.setItem('carts', JSON.stringify(carts));
    }
    console.log('currentUser is:', userState);
  }, [users, carts]);

  useEffect(() => {
    if (!userState) {
      const storedUser = JSON.parse(sessionStorage.getItem('currentUser'));
      if (storedUser) {
        dispatch(setCurrentUser(storedUser));
      }
    }
  }, [userState, dispatch]);

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
