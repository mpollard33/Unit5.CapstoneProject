import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from './CartProductCard';
import { selectCart, selectProductsInCart } from '../../store/authSlice';
import './index.css';

const Cart = () => {
  const cart = useSelector(selectCart);

  if (!cart || cart.products === 0 || !Array.isArray(cart.products)) {
    return <div>Your cart is empty.</div>;
  }

  const { products } = cart;
  console.log('cart'.products);

  return (
    <div>
      <header className="cart-header">
        <h2>Your Cart</h2>
      </header>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
};

export default Cart;
