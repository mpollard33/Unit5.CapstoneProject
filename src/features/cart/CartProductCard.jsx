import React from 'react';

const CartProductCard = ({ product }) => {
  return (
    <div className="cart-product-card">
      <h3>{product.data.dateAdded}</h3>
      <p>
        <strong>Product ID:</strong> {product.data.products[0].id}
      </p>
      <p>
        <strong>Quantity:</strong> {product.data.products[0].quantity}
      </p>
    </div>
  );
};

export default CartProductCard;
