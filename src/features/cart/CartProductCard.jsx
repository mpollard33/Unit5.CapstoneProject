import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsLoggedIn,
  selectUserId,
  selectUserIdInCart,
  selectCart,
  removeFromCart,
} from '../../store/authSlice';
import { useUpdateCartMutation } from './cartApi';
import { useGetProductByIdQuery } from '../products/productsApi';

const CartProductCard = ({ product }) => {
  const { id } = useParams();
  const userId = useSelector(selectUserId);
  const cartId = useSelector(selectUserIdInCart);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [updateCartMutation] = useUpdateCartMutation();
  const { data: productById, error, isLoading } = useGetProductByIdQuery(id);
  const cart = useSelector(selectCart);

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value, 10) || 0);
  };
  const handleRemoveFromCart = async () => {
    if (!isLoggedIn) {
      return;
    }
    if (!productById) throw new Error('Product id not found');

    console.log('UpdateCart(removeAll) Payload:', {
      userId: userId,
      date: new Date().toISOString().split('T')[0],
      products: [{ productId: productById, quantity: quantity }],
    });

    try {
      const { data: updateCart, error } = await updateCartMutation({
        userId: userId,
        date: new Date().toISOString().split('T')[0],
        products: [{ productId: productById, quantity: quantity }],
        id: id,
      });

      console.log('Response:', updateCart);
      if (error) {
        console.error('Error adding to cart', error);
      }

      const cartToReducer = { id: updateCart.id, quantity: 0 };
      const cartString = JSON.stringify(cartToReducer);

      console.log('cartToReducer', cartToReducer);
      dispatch(removeFromCart(cartToReducer));
      updateSessionStorage(cartString);
    } catch (error) {
      console.error('Error removing from cart', error);
    }
  };

  const handleUpdateToCart = async () => {
    if (!isLoggedIn) {
      return;
    }
    if (!productById) throw new Error('Product data is not available.');

    try {
      console.log('updateProduct Payload:', {
        userId: userId,
        date: new Date().toISOString().split('T')[0],
        products: [{ productId: productById, quantity: quantity }],
      });

      const { data: productUpdate, error } = await updateCartMutation({
        userId: userId,
        date: new Date().toISOString().split('T')[0],
        products: [{ productId: productById, quantity: quantity }],
      });

      // console.log('Response:', newCartProduct);
      if (error) {
        console.error('Error updating product quantity', error);
      }

      const cartToReducer = { ...productById, quantity: quantity };
      const cartString = JSON.stringify(cartToReducer);

      console.log('cartToReducer', cartToReducer);
      dispatch(updateCart(cartToReducer));
      updateSessionStorage(cartString);
    } catch (error) {
      console.error('Error adding to cart', error);
    }
  };

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

  if (cart.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <section className="cart-product-container">
      <Link to={`/products/${product.id}`} className="cart-product-card-link">
        <li className="cart-product">
          <div className="cart-description-container">
            <img
              src={product.image}
              alt={product.title}
              className="cart-product-image"
            />

            <div className="product-box">
              <header>
                <h3 className="cart-title">{product.title}</h3>
                <p className="cart-price">${product.price.toFixed(2)}</p>
              </header>
              <div className="cart-title-container"></div>
              <p>{product.description}</p>
              <p>Quantity: {product.quantity}</p>
              <section className="rating-container">
                <div className="yellow-stars">
                  {generateStars(product.rating.rate)}
                </div>
                <div className="rating-count">
                  {product.rating.count} reviews
                </div>
              </section>{' '}
            </div>
          </div>
        </li>
      </Link>

      <div className="cart-user-action-container">
        <input
          className="single-product-button"
          id="quantity"
          type="number"
          min="0"
          value={product.quantity}
          step="1"
          onChange={handleQuantityChange}
        />
        <button
          className="cart-user-action"
          type="button"
          onClick={handleUpdateToCart}
        >
          Update Quantity
        </button>
        <button
          className="cart-user-action"
          type="button"
          onClick={handleRemoveFromCart}
        >
          Remove From Cart
        </button>
      </div>
    </section>
  );
};

const generateStars = (rating) => {
  const numberOfStars = Math.round(rating);
  return '★'.repeat(numberOfStars) + '☆'.repeat(5 - numberOfStars);
};

export default CartProductCard;
