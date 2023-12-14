import React from 'react';
import './index.css';

const CartProductCard = ({ product }) => {
  const { title, image, price, description, rating } = product.product;

  const generateStars = (rate) =>
    '★'.repeat(Math.round(rate)) + '☆'.repeat(5 - Math.round(rate));

  return (
    <li className="cart-product-container">
      <div className="cart-product">
        <div className="cart-title-container">
          <img className="cart-product-image"src={image} alt={title} />
        </div>
        <div className="cart-description-container">
          <div className="cart-description">
            <p>{description}</p>
            <section className="rating-container">
              <div className="yellow-stars">{generateStars(rating.rate)}</div>
              <div className="rating-count">{rating.count} reviews</div>
            </section>
          </div>
        </div>
        <div className="cart-user-action-container">
          <header>
            <h2>{title}</h2>
          </header>
          <p className="cart-price">${price}</p>
          <button>Update Quantity</button>
          <button>Remove from Cart</button>
        </div>
      </div>
    </li>
  );
};

export default CartProductCard;
