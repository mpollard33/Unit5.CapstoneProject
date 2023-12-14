import React from 'react';
import { useGetProductsQuery } from '../products/productsApi';

const CartProductCard = ({ product, onUpdateQuantity, onRemoveProduct }) => {
  const { productId, quantity } = product;

  const {
    data: productData,
    isLoading,
    isError,
  } = useGetProductsQuery(productId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !productData) {
    return <div>Error loading product information</div>;
  }

  const { title, image, price } = productData;
  console.log("product")
  console.log("title")

  return (
    <div className="cart-product-card">
      <img src={image} alt={title} className="cart-product-image" />
      <div className="cart-product-info">
        <h3 className="cart-product-title">{title}</h3>
        <p className="cart-product-price">${price}</p>
        <div className="cart-product-quantity">
          <label htmlFor={`quantity-${productId}`}>Quantity:</label>
          <input
            type="number"
            id={`quantity-${productId}`}
            value={quantity}
            onChange={(e) =>
              onUpdateQuantity(productId, parseInt(e.target.value, 10) || 1)
            }
          />
        </div>
      </div>
      <div className="cart-product-actions">
        <p className="cart-product-subtotal">Subtotal: ${price * quantity}</p>
        <button onClick={() => onRemoveProduct(productId)}>
          Remove from Cart
        </button>
      </div>
    </div>
  );
};

export default CartProductCard;
