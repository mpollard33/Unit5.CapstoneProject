import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCart,
  addProductToCart,
} from '../../store/authSlice';
import {useUpdateCartMutation } from '../account/authApi'

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const [selectedProduct, setSelectedProduct] = useState({
    productId: '',
    quantity: 1,
  });

  // Mutation hook for updating the cart in the API
  const [updateCart] = useUpdateCartMutation();

  const handleAddToCart = () => {
    // Update the local cart state
    dispatch(addProductToCart({ products: [...cart.products, selectedProduct] }));

    // Update the cart in the API
    updateCart({ id: cart.userId, action: { products: [...cart.products, selectedProduct] } });
  };

  useEffect(() => {
    // Handle any additional logic when the cart state changes
    // For example, you might want to update the UI or perform calculations
  }, [cart]);

  return (
    <div>
      <h2>Your Cart</h2>
      <ul>
        {cart.products.map((product, index) => (
          <li key={index}>
            Product ID: {product.productId}, Quantity: {product.quantity}
          </li>
        ))}
      </ul>
      <select
        value={selectedProduct.productId}
        onChange={(e) =>
          setSelectedProduct({ ...selectedProduct, productId: e.target.value })
        }
      >
        {/* Populate the dropdown with product options */}
        {/* You might fetch this list from your API or define it locally */}
        <option value="product1">Product 1</option>
        <option value="product2">Product 2</option>
        {/* Add more product options as needed */}
      </select>
      <input
        type="number"
        value={selectedProduct.quantity}
        onChange={(e) =>
          setSelectedProduct({ ...selectedProduct, quantity: e.target.value })
        }
      />
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default Cart;
