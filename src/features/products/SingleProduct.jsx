import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductsByIdQuery } from './productsApi';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsLoggedIn,
  addToCart,
  removeFromCart,
  selectCart,
  selectUserId,
  setLoggedIn,
} from '../../store/authSlice';
import './productCard.css';

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userId = useSelector(selectUserId);
  const cart = useSelector(selectCart);
  const [displayLoginMessage, setDisplayLoginMessage] = useState(false);
  const { data, error, isLoading } = useGetProductsByIdQuery(id);

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

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      setDisplayLoginMessage(true);
      return;
    }

    if (!data || !data.id) {
      throw new Error('Product data is not available.');
    }

    const product = data;
    console.log('Product to add', data);

    const isInCart = cart.products.some((product) => product.productId === id);

    if (!isInCart) {
      dispatch(addToCart(product));
    }

    console.log('SessionStorage updated!', cart);
    updateSessionStorage(cart);
  };

  const handleRemoveFromCart = () => {
    if (!isLoggedIn) {
      setDisplayLoginMessage(true);
      return;
    }

    if (!id) {
      throw new Error('Product id not found');
    }

    console.log('Dispatch removeFromCart', id);
    dispatch(removeFromCart({ id }));
  };

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

  const { title, image, rating, price, description } = data;

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
          <form>
            <button
              className="single-product-button"
              type="button"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
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
