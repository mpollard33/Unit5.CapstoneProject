import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCart } from '../../store/authSlice';
import CartProductCard from './CartProductCard';

const Cart = () => {
  const userCart = useSelector(selectCart);

  return (
    <div>
      <h2>Your Cart</h2>
      <ul>
        {userCart.products.map((product) => (
          <CartProductCard key={product.productId} product={product} />
        ))}
      </ul>
    </div>
  );
};

export default Cart;
