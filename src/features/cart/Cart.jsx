import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from './CartProductCard';
import { selectCart } from '../../store/authSlice';
import './index.css';

const Cart = () => {
  const cart = useSelector(selectCart);

  if (!cart || !cart.products || !Array.isArray(cart.products)) {
    return <div>Your cart is empty.</div>;
  }

  const { products } = cart;

  return (
    <div>
      <header className="cart-header">
        <h2>Your Cart</h2>
      </header>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Cart;
