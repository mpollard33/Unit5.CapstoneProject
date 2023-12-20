import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAddToUserCartMutation } from '../cart/cartApi';
import {
  selectIsLoggedIn,
  selectCart,
  selectUserId,
  addToCart,
  selectUserIdInCart,
} from '../../store/authSlice';
import { useGetProductByIdQuery } from './productsApi';
import './index.css';

const SingleProduct = () => {
  const { id } = useParams();
  console.log('id', id);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userId = useSelector(selectUserId);
  const cart = useSelector(selectCart);
  const cartId = useSelector(selectUserIdInCart);
  console.log('cartId', cartId);
  const [quantity, setQuantity] = useState(1);
  const { data: productById, error, isLoading } = useGetProductByIdQuery(id);
  const [addToCartMutation] = useAddToUserCartMutation();

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      return;
    }
    if (!productById) throw new Error('Product data is not available.');

    try {
      console.log('Request Payload:', {
        userId: 11,
        date: new Date().toISOString().split('T')[0],
        products: [{ productId: 1, quantity: 5 }],
      });

      const { data: updatedCart, error } = await addToCartMutation({
        userId: 11,
        date: '2020-02-03',
        products: [{ productId: 1, quantity: 5 }],
      });

      console.log('Response:', updatedCart);
      if (error) {
        console.error('Error adding to cart', error);
      }
      dispatch(addToCart(updatedCart));
      updateSessionStorage(updatedCart);
    } catch (error) {
      console.error('Error adding to cart', error);
    }
  };

  const handleRemoveFromCart = async () => {
    // if (!isLoggedIn) {
    //   return;
    // }
    // if (!productById.data) throw new Error('Product id not found');
    // try {
    //   // Assuming you have the updateQuantityMutation hook available
    //   const response = await updateQuantityMutation({ id, qty: 0 });
    //   console.log('RESPONSE', response);
    //   // dispatch(removeFromCart(product));
    // } catch (error) {
    //   console.error('Error removing from cart', error);
    // }
  };

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value, 10) || 0);
  };

  useEffect(() => {
    updateSessionStorage(cart);
  }, [cart]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (productById && productById.data) {
          const {
            title,
            image,
            price,
            rating,
            rate,
            description,
            count,
            id: idProduct,
          } = productById.data;

          console.log('Product data:', title, image, price);
        }
      } catch (error) {
        console.error('Error fetching product', error);
      }
    };

    fetchData();
  }, [productById]);

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
        <p className="single-product-price">${productById.price}</p>
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
