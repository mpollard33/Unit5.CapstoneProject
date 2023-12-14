import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCart } from '../../store/authSlice';
import CartProductCard from './CartProductCard';

const Cart = () => {
  const userCart = useSelector(selectCart);

  useEffect(() => {
    console.log('itemCount changed:', userCart.itemCount);
  }, [userCart.itemCount]);

  return (
    <div>
      <h2>Your Cart</h2>
      <ul>
        {userCart.products.map((product) => (
          <CartProductCard key={product.productId} product={product} />
        ))}
        <CartProductCard product={userCart.products[0]} />
      </ul>
    </div>
  );
};

export default Cart;
