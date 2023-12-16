import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  useUpdateCartMutation,
  useUpdateCartQuantityMutation,
} from '../cart/cartApi';
import {
  selectIsLoggedIn,
  removeFromCart,
  selectCart,
  selectUserId,
  setLoggedIn,
  addToCart,
} from '../../store/authSlice';
import './productCard.css';
import { useGetSingleUserQuery } from '../account/authApi';
import { useGetProductsByIdQuery } from './productsApi';
import './index.css';

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userId = useGetSingleUserQuery(id);
  const cart = useSelector(selectCart);
  const [displayLoginMessage, setDisplayLoginMessage] = useState(false);
  const { data, error, isLoading } = useGetProductsByIdQuery(id);
  const { mutate: product } = useUpdateCartMutation(id);
  const [createMutation, { mutate: quantityMutation }] =
    useUpdateCartQuantityMutation(id);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!userId) {
      dispatch(setLoggedIn(false));
    }
  }, [userId, dispatch]);

  const renderLoginMessage = (message) => (
    <p className="login-message">
      {message || 'Please include a login message to render'}
    </p>
  );

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      setDisplayLoginMessage(true);
      return;
    }
    if (!data) throw new Error('Product data is not available.');

    const response = await createMutation({ id, qty: quantity });
    dispatch(addToCart(response));

    updateSessionStorage(cart);
  };

  const handleRemoveFromCart = async () => {
    if (!isLoggedIn) {
      setDisplayLoginMessage(true);
      return;
    }
    if (!data) throw new Error('Product id not found');
    try {
      const response = await createMutation({ id, qty: 0 })
      console.log("RESPONSE", response);
      dispatch(removeFromCart(response));
    } catch (error) {
      console.error('Error removing from cart', error);
    }
  };

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value, 10) || 0);
  };

  const handlePlaceholder = () => {};

  useEffect(() => {
    console.log('SessionStorage updated!', cart);
    updateSessionStorage(cart);
  }, [cart]);

  const updateSessionStorage = (updatedCart) => {
    const existingUsers = JSON.parse(sessionStorage.getItem('currentUser'));
    const existingCarts = JSON.parse(sessionStorage.getItem('carts')) || [];

    const userCartIndex = existingCarts.findIndex(
      (cart) => cart[existingUsers?.id] !== undefined,
    );

    const updatedCarts =
      userCartIndex !== -1
        ? [
            ...existingCarts.slice(0, userCartIndex),
            { [existingUsers?.id]: updatedCart },
            ...existingCarts.slice(userCartIndex + 1),
          ]
        : [...existingCarts, { [existingUsers?.id]: updatedCart }];

    sessionStorage.setItem('carts', JSON.stringify(updatedCarts));
    sessionStorage.setItem('userCart', JSON.stringify(updatedCart));
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  if (!data) return <div>No data found</div>;

  const { title, image, price, rating, description } = data;
  return (
    <div className="product-card-container">
      <img src={image} alt={title} className="single-product-image" />
      <div className="product-info">
        <header>
          <h2 className="single-product-title">{title}</h2>
        </header>
        <section className="rating-container">
          <div className="yellow-stars">{generateStars(rating.rate)}</div>
          <div className="rating">{rating.rate}</div>
          <div className="rating-count">{rating.count} reviews</div>
        </section>
        <p className="single-product-price">${price.toFixed(2)}</p>
        <p className="single-product-description">{description}</p>
        {isLoggedIn ? (
          <form className="single-product-button-container">
            <button
              className="single-product-button"
              type="button"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <input
              className="single-product-button"
              id="quantity"
              type="number"
              min="0"
              value={quantity}
              step="1"
              onChange={handleQuantityChange}
            />
            <div className="spacer"></div>
            <button
              className="single-product-button"
              type="button"
              onClick={handleRemoveFromCart}
            >
              Remove from Cart
            </button>
          </form>
        ) : (
          <p>You must be logged in to add items to your cart</p>
        )}
      </div>
    </div>
  );
};
const generateStars = (rating) =>
  '★'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating));

export default SingleProduct;
