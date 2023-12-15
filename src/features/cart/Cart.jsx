import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import CartProductCard from './CartProductCard';
import {
  selectCart,
  selectTotalInCart,
  selectCartItemCount,
} from '../../store/authSlice';

const Cart = () => {
  const userCart = useSelector(selectCart);
  const total = useSelector(selectTotalInCart);
  const itemCount = useSelector(selectCartItemCount);

  useEffect(() => {}, [userCart.itemCount]);

  return (
    <div>
      <h2>Your Cart</h2>
      {userCart.products.length > 0 ? (
        <div>
          <ul>
            {userCart.products.map((product) => (
              <CartProductCard key={product.productId} product={product} />
            ))}
          </ul>
          <div>
            <p>Total Items: {itemCount}</p>
            <p>Total Price: ${total.toFixed(2)}</p>
          </div>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
