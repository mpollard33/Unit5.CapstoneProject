import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductsByIdQuery } from './productsApi';
import { useGetCartQuery } from '../account/authApi';
import { useDispatch } from 'react-redux';
import { addProductToCart, setCart } from '../../store/authSlice';
import './productCard.css';

const SingleProduct = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetProductsByIdQuery(id);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const productId = data.id;
    console.log('The product to add: ', data);

    if (!productId) return;

    // SEND THE PAYLOAD LIKE THIS:
    // JSON.parse(localStorage.getItem(CURR_USER)
    try {
      const existingCart = JSON.parse(localStorage.getItem('userCart')) || {
        products: [],
      };

      const existingProduct = existingCart.products.find(
        (product) => product.productId === productId,
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        existingCart.products.push({ productId, quantity: 1 });
      }

      localStorage.setItem('userCart', JSON.stringify(existingCart));

      dispatch(addProductToCart({ products: existingCart.products }));
    } catch (error) {
      console.error('Error while updating cart:', error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>error</div>;
  if (!data) return <div>No data found</div>;

  const { title, image, rating, price, description } = data;

  return (
    <div className="product-card-container">
      <img src={image} alt={title} className="single-product-image" />
      <div className="product-info">
        <header>
          <h2 className="single-product-title">{title}</h2>
        </header>
        <section className="rating-container">
          <div className="yellow-stars">{generateStars(rating.rate)}</div>
          <div className="rating">{rating.rate}</div>
          <div className="rating-count">{rating.count} reviews</div>
        </section>
        <p className="single-product-price">${price.toFixed(2)}</p>
        <p className="single-product-description">{description}</p>
        <form>
          <button
            className="single-product-button"
            type="button"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </form>
      </div>
    </div>
  );
};

const generateStars = (rating) =>
  '★'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating));

export default SingleProduct;
