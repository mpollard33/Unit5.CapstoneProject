import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeProduct, setCart, selectUserId } from '../../store/authSlice';
import CartProductCard from './CartProductCard';

const Cart = () => {
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);

  useEffect(() => {
    const storedCart = JSON.parse(sessionStorage.getItem('userCart')) || {};
    const userCart = storedCart[userId] || { products: [] };

    dispatch(setCart({ products: userCart.products }));
  }, [userId, dispatch]);

  const handleUpdateQuantity = (productId, newQuantity) => {
    const storedCart = JSON.parse(sessionStorage.getItem('userCart')) || {};
    const userCart = storedCart[userId] || { products: [] };

    const updatedCart = {
      ...userCart,
      products: userCart.products.map((product) =>
        product.productId === productId
          ? { ...product, quantity: newQuantity }
          : product,
      ),
    };

    storedCart[userId] = updatedCart;
    sessionStorage.setItem('userCart', JSON.stringify(storedCart));

    dispatch(setCart({ products: updatedCart.products }));
  };

  const handleRemoveProduct = (productId) => {
    const storedCart = JSON.parse(sessionStorage.getItem('userCart')) || {};
    const userCart = storedCart[userId] || { products: [] };

    const updatedCart = {
      ...userCart,
      products: userCart.products.filter(
        (product) => product.productId !== productId,
      ),
    };

    storedCart[userId] = updatedCart;
    sessionStorage.setItem('userCart', JSON.stringify(storedCart));

    dispatch(removeProduct({ products: updatedCart.products }));
  };

  const userCart = useSelector((state) => state.auth.cart);

  return (
    <div>
      <h2>Your Cart</h2>
      {userCart.products.map((product) => (
        <CartProductCard
          key={product.productId}
          product={product}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveProduct={handleRemoveProduct}
        />
      ))}
    </div>
  );
};

export default Cart;
