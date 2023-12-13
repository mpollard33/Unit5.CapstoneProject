import React from 'react';

const CartProductCard = ({ product, onUpdateQuantity, onRemoveProduct }) => {
  const { productId, title, image, price, quantity } = product;

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
