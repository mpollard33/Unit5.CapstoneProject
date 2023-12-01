import React from 'react';
import { Link } from 'react-router-dom';
import './productCard.css';

const generateStars = (rating) => {
  const numberOfStars = Math.round(rating);

  return '★'.repeat(numberOfStars) + '☆'.repeat(5 - numberOfStars);
};

const ProductCard = ({ product }) => {
  return (
    <Link to={`/products/${product.id}`} className="product-card-link">
      <li>
        <img src={product.image} alt={product.title} />
        <header>
          <h3>{product.title}</h3>
        </header>
        <p className="price">${product.price.toFixed(2)}</p>
        <div className="blue-box">
          <p>{product.description}</p>
          <section className="rating-container">
            <div className="yellow-stars">
              {generateStars(product.rating.rate)}
            </div>
            <div className="rating-count">{product.rating.count} reviews</div>
          </section>
        </div>
      </li>
    </Link>
  );
};

export default ProductCard;
