import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  useAddUserCartMutation,
  useGetAllCartsQuery,
  useRegisterMutation,
} from './authApi';
import { Link } from 'react-router-dom';
import {
  setId,
  setCart,
  setCartId,
  setLoggedIn,
  selectUserId,
  initializeUser,
  selectCurrentUser,
  selectCart,
  setCurrentUser,
  selectIsLoggedIn,
} from '../../store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import './index.css';

const Registration = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const activeUser = useSelector(selectCurrentUser);
  const userId = useSelector(selectUserId);
  const [registerUser] = useRegisterMutation();
  const allCarts = useGetAllCartsQuery();
  const [createUserCart, { data: cartId }] = useAddUserCartMutation();

  useEffect(() => {
    if (!activeUser) {
      const storedUser = JSON.parse(sessionStorage.getItem('currentUser'));
      if (storedUser) {
        dispatch(setCurrentUser(storedUser));
      }
    }
  }, [activeUser, dispatch]);
  const onSubmit = async (formData) => {
    try {
      const { data } = await registerUser(formData);

      if (data) {
        const apiCarts = JSON.stringify(allCarts.data);
        if (!sessionStorage.getItem('carts')) {
          sessionStorage.setItem('carts', apiCarts);
        }

        const registeredUserId = data.id;

        const currentUsers = JSON.parse(sessionStorage.getItem('users')) || [];

        const isDuplicateId = currentUsers.some(
          (user) => user.id === registeredUserId,
        );
        const updatedUserId = isDuplicateId
          ? currentUsers.length + 1
          : registeredUserId;
        const updatedUser = { ...formData, id: updatedUserId };

        dispatch(setCurrentUser(updatedUser));
        dispatch(setLoggedIn(true));
        dispatch(setId(updatedUserId));

        const updatedUsers = [...currentUsers, updatedUser];
        sessionStorage.setItem('users', JSON.stringify(updatedUsers));
        sessionStorage.setItem('currentUser', JSON.stringify(updatedUser));

        const userCartData = {
          id: registeredUserId,
          userId: 5,
          date: new Date().toISOString(),
          products: [],
        };

        const getCartId = async (cartData) => {
          try {
            const { data: cartId } = await createUserCart(cartData);
            console.log('CartId', cartId);
            if (cartId) return cartId;
            return 55;
          } catch (error) {
            console.error('Error during registration', error);
            throw error;
          }
        };
        const userId = await getCartId(userCartData);
        // debug
        console.log('Before');
      }
    } catch (error) {
      console.log('Error during registration', error);
    }
  };

  useEffect(() => {
    if (activeUser) {
      console.log('UseEffect -> Active User ', activeUser);
    }
  }, [activeUser]);

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
