import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserId, selectCart } from '../../store/authSlice';
import CartProductCard from './CartProductCard';
import { useGetProductsQuery } from '../products/productsApi';

const Cart = () => {
  const userId = useSelector(selectUserId);
  const userCart = useSelector(selectCart);

  const userCartString = JSON.stringify(userCart);

  console.log('cartString', userCartString);
  console.log("title", userCart.products[0].product.title)

  return (
    <div>
      <h2>Your Cart</h2>
      {userCartString}
      <h3>{userCart.products[0].title}</h3>
      <div>
        {}
      </div>
    </div>
  );
};

export default Cart;
