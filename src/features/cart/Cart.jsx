import React from 'react';
import { useSelector } from 'react-redux';
import CartProductCard from './CartProductCard';
import { selectCartItemCount, selectTotalInCart } from '../../store/authSlice';

const Cart = () => {
  const userCart = useSelector((state) => state.auth.cart);
  const cartItemCount = useSelector(selectCartItemCount);
  const total = useSelector(selectTotalInCart);

  return (
    <div>
      <h2>Your Cart</h2>
      {userCart.products.length > 0 ? (
        <div>
          {userCart.products.map((product) => (
            <CartProductCard
              key={product.data.products[0].id}
              product={product}
            />
          ))}
          <div>
            <p>Total Items: {cartItemCount}</p>
            <p>Total Cost: {total}</p>
          </div>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
