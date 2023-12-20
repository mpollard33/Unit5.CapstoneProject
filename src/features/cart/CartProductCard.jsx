import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const CartProductCard = ({ product }) => {
  return (
    <section className="cart-product-container">
      <Link to={`/products/${product.id}`} className="cart-product-card-link">
        <li className="cart-product">
          <div className="cart-description-container">
            <img
              src={product.image}
              alt={product.title}
              className="cart-product-image"
            />

            <div className="product-box">
              <header>
                <h3 className="cart-title">{product.title}</h3>
                <p className="cart-price">${product.price.toFixed(2)}</p>
              </header>
              <div className="cart-title-container"></div>
              <p>{product.description}</p>
              <p>Quantity: {product.quantity}</p>
              <section className="rating-container">
                <div className="yellow-stars">
                  {generateStars(product.rating.rate)}
                </div>
                <div className="rating-count">
                  {product.rating.count} reviews
                </div>
              </section>{' '}
            </div>
            <div className="cart-user-action-container">
              <button className="cart-user-action">Update Quantity</button>
              <button className="cart-user-action">Remove From Cart</button>
            </div>
          </div>
        </li>
      </Link>
    </section>
  );
};

const generateStars = (rating) => {
  const numberOfStars = Math.round(rating);
  return '★'.repeat(numberOfStars) + '☆'.repeat(5 - numberOfStars);
};

export default CartProductCard;
