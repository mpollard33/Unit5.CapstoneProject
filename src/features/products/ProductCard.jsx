import React from "react";
import { Link } from "react-router-dom";

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
          <p>See Details</p>
        </div>
      </li>
    </Link>
  );
};

export default ProductCard;
