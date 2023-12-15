import React from 'react';
import './index.css';
import { useGetProductsByIdQuery } from '../products/productsApi';

const CartProductCard = ({ id }) => {
  const { data, error, isLoading } = useGetProductsByIdQuery(id);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading product details</p>;
  }

  if (!data) {
    return <p>No data found for this product</p>;
  }

  const { title, image, price, description, rating } = data;

  return (
    <li className="cart-product-container">
      <div className="cart-product">
        <div className="cart-title-container">
          <img className="cart-product-image" src={image} alt={title} />
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
          <p className="cart-price">${price.toFixed(2)}</p>
          <button>Update Quantity</button>
          <button>Remove from Cart</button>
        </div>
      </div>
    </li>
  );
};

const generateStars = (rate) =>
  '★'.repeat(Math.round(rate)) + '☆'.repeat(5 - Math.round(rate));

export default CartProductCard;
