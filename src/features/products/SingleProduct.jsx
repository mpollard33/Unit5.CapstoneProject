import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductsByIdQuery } from './productsApi';
import { useAddToCartMutation, useGetCartQuery } from '../account/authApi';
import './productCard.css';

const ProductDetails = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetProductsByIdQuery(id);
  const addToCartMutation = useAddToCartMutation();
  const getCartQuery = useGetCartQuery(id);

  const handleAddToCart = () => {
    if (!getCartQuery.data) {
      const newCart = {
        userId: id,
        date: new Date().toISOString(),
        products: [
          {
            productId: data.id,
            quantity: 1,
          },
        ],
      };

      addToCartMutation.mutate(newCart);
    } else {
      const existingCart = getCartQuery.data;
      const updatedCart = {
        ...existingCart,
        products: [
          ...existingCart.products,
          {
            productId: data.id,
            quantity: 1,
          },
        ],
      };

      addToCartMutation.mutate(updatedCart);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data found</div>;

  const generateStars = (rating) => {
    const numberOfStars = Math.round(rating);
    return '★'.repeat(numberOfStars) + '☆'.repeat(5 - numberOfStars);
  };

  return (
    <>
      <div className="product-card-container">
        <img
          src={data.image}
          alt={data.title}
          className="single-product-image"
        />
        <div className="product-info">
          <header>
            <h2 className="single-product-title">{data.title}</h2>
          </header>
          <section className="rating-container">
            <div className="yellow-stars">
              {generateStars(data.rating.rate)}
            </div>
            <div className="rating">{data.rating.rate}</div>
            <div className="rating-count">{data.rating.count} reviews</div>
          </section>
          <p className="single-product-price">${data.price.toFixed(2)}</p>
          <p className="single-product-description">{data.description}</p>
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
    </>
  );
};

export default ProductDetails;
