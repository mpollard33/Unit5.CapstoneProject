import React from 'react';
import { useGetProductsByIdQuery } from '../products/productsApi';
import { useSelector } from 'react-redux';
import { selectCartItemCount, selectTotalInCart } from '../../store/authSlice';

const CartProductCard = ({ id }) => {
  const { title, image, price, description, rating } =
    useGetProductsByIdQuery(id);

  // Use selectors to get cart item count and total from the state
  const cartItemCount = useSelector(selectCartItemCount);
  const totalInCart = useSelector(selectTotalInCart);

  return (
    <li className="cart-product-container">
      <div className="cart-product">
        <div className="cart-title-container">
          <img className="cart-product-image" src={image} alt={title} />
        </div>
        <div className="cart-description-container">
          <div className="cart-description">
            <p>{description}</p>
            <section className="rating-container"></section>
          </div>
        </div>
        <div className="cart-user-action-container">
          <header>
            <h2>{title}</h2>
          </header>
          <button>Update Quantity</button>
          <button>Remove from Cart</button>
        </div>
        <div>
          <p>Total Items: {cartItemCount}</p>
        </div>
      </div>
    </li>
  );
};

const generateStars = (rate) =>
  '★'.repeat(Math.round(rate)) + '☆'.repeat(5 - Math.round(rate));

export default CartProductCard;
