import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import CartProductCard from './CartProductCard';
import { selectCartItemCount, selectTotalInCart } from '../../store/authSlice';

const Cart = () => {
  const userCart = useSelector((state) => state.auth.cart);
  const cartItemCount = useSelector(selectCartItemCount);
  const total = useSelector(selectTotalInCart);
  

  useEffect(() => {}, [userCart.itemCount]);

  return (
    <div>
      <h2>Your Cart</h2>
      {userCart.products.length > 0 ? (
        <div>
          <ul>
            {userCart.products.map((product) => (
              <CartProductCard key={product.productId} id={product.productId} />
            ))}
          </ul>
          <div>{JSON.stringify(userCart)}</div>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
