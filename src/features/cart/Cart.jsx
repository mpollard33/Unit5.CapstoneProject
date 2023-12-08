import React from 'react';
import { format } from 'date-fns';
import {
  useRemoveFromCartMutation,
  useUpdateCartQuantityMutation,
  useGetCartQuery,
} from '../account/authApi';

const Cart = () => {
  const currentDate = new Date();
  const formattedDate = format(currentDate, 'yyyy-MM-dd');
  const { data: cart, error, isLoading } = useGetCartQuery();

  const removeFromCartMutation = useRemoveFromCartMutation();
  const updateCartQuantityMutation = useUpdateCartQuantityMutation();

  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      await updateCartQuantityMutation.mutateAsync({
        productId,
        quantity: newQuantity,
      });
    } catch (error) {
      console.error('Failed to update quantity:', error);
    }
  };

  const handleRemoveProduct = async (productId) => {
    try {
      await removeFromCartMutation.mutateAsync({ productId });
    } catch (error) {
      console.error('Failed to remove product:', error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="cart-container">
      <header>
        <h2>Cart</h2>
      </header>
      <h3>Contents: </h3>
      <p>User ID: {cart.userId}</p>
      <p>Date: {formattedDate}</p>
      <ul>
        {cart.products.map((product) => (
          <li key={product.productId}>
            Product ID: {product.productId}, Quantity: {product.quantity}
            <input
              type="number"
              value={product.quantity}
              onChange={(e) =>
                handleQuantityChange(product.productId, parseInt(e.target.value, 10))
              }
              min="1"
            />
            <button onClick={() => handleRemoveProduct(product.productId)}>
              Remove Product
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
