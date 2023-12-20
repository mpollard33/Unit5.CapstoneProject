import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  useAddToUserCartMutation,
  useUpdateCartMutation,
} from '../cart/cartApi';
import {
  selectIsLoggedIn,
  selectCart,
  selectUserId,
  addToCart,
  selectUserIdInCart,
  removeFromCart,
} from '../../store/authSlice';
import { useGetProductByIdQuery } from './productsApi';
import './index.css';

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userId = useSelector(selectUserId);
  const cart = useSelector(selectCart);
  const cartId = useSelector(selectUserIdInCart);
  const [quantity, setQuantity] = useState(1);
  const { data: productById, error, isLoading } = useGetProductByIdQuery(id);
  const [addToCartMutation] = useAddToUserCartMutation();
  const [updateCartMutation] = useUpdateCartMutation();

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value, 10) || 0);
  };

  const handleAddToCart = async () => {
    if (!isLoggedIn || !productById) {
      return;
    }

    try {
      const { data: newCartProduct, error } = await addToCartMutation({
        userId: userId,
        date: new Date().toISOString().split('T')[0],
        products: [{ productId: productById, quantity: quantity }],
      });

      if (error) {
        console.error('Error adding to cart', error);
      }

      const cartToReducer = { ...productById, quantity: quantity };
      const cartString = JSON.stringify(cartToReducer);

      dispatch(addToCart(cartToReducer));
      updateSessionStorage(cartString);
    } catch (error) {
      console.error('Error adding to cart', error);
    }
  };

  const handleRemoveFromCart = async () => {
    if (!isLoggedIn || !productById) {
      return;
    }

    try {
      const { data: updateCart, error } = await addToCartMutation({
        userId: userId,
        date: new Date().toISOString().split('T')[0],
        products: [{ productId: productById, quantity: quantity }],
        id: id,
      });

      if (error) {
        console.error('Error adding to cart', error);
      }

      const cartToReducer = { id: updateCart.id, quantity: 0 };
      const cartString = JSON.stringify(cartToReducer);

      dispatch(removeFromCart(cartToReducer));
      updateSessionStorage(cartString);
    } catch (error) {
      console.error('Error removing from cart', error);
    }
  };

  useEffect(() => {
    updateSessionStorage(cart);
  }, [cart]);

  useEffect(() => {
    console.log('param id changed', id);
  }, [id]);

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
  if (error) return <div>Error: {error.message}</div>;
  if (!productById) return <div>No data found</div>;

  return (
    <div className="product-card-container">
      <img
        src={productById.image}
        alt={productById.title}
        className="single-product-image"
      />
      <div className="product-info">
        <header>
          <h2 className="single-product-title">{productById.title}</h2>
        </header>
        <section className="rating-container">{/*  */}</section>
        <p className="single-product-price">${productById.price.toFixed(2)}</p>
        <p className="single-product-description">{productById.description}</p>
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
