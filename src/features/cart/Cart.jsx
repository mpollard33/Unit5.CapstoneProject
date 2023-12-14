import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setCart,
  removeProduct,
  selectUserId,
  selectCart,
} from '../../store/authSlice';
import CartProductCard from './CartProductCard';
import { useGetProductsQuery } from '../products/productsApi';

const Cart = () => {
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const userCart = useSelector(selectCart);
  const { data: allProducts } = useGetProductsQuery();

  const handleUpdateQuantity = (productId, newQuantity) => {};
  const handleRemoveProduct = (productId) => {};

  const cartString = JSON.stringify(userCart);
  return (
    <div>
      <h2>Your Cart</h2>
      {cartString}
    </div>
  );
};

export default Cart;
