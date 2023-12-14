import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductsByIdQuery } from './productsApi';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsLoggedIn,
  addProductToCart,
  removeProduct,
  selectCart,
  selectUserId,
  setLoggedIn,
  setCart,
} from '../../store/authSlice';
import './productCard.css';

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userId = useSelector(selectUserId);
  const cart = useSelector(selectCart);
  const [displayLoginMessage, setDisplayLoginMessage] = useState(false);
  const { data, error, isLoading } = useGetProductsByIdQuery(id);

  useEffect(() => {
    if (!userId) {
      dispatch(setLoggedIn(false));
    }
  }, [userId, dispatch]);

  const renderLoginMessage = () => (
    <p className="login-message">
      You must be logged in to add items to your cart.
    </p>
  );

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      setDisplayLoginMessage(true);
      return;
    }

    if (!data || !data.id) {
      console.error('Product data is not available.');
      return;
    }

    const product = data;
    const productId = id;
    const updatedCart = getUpdatedCart(productId, product);

    console.log('Dispatching addProductToCart:', {
      productId,
      quantity: 1,
      product,
    });
    console.log('Updated Cart:', updatedCart);

    dispatch(
      addProductToCart({ products: [{ productId, quantity: 1, product }] }),
    );
    updateSessionStorage(updatedCart);
  };

  const handleRemoveFromCart = () => {
    const productId = id;
    if (!productId) return;

    const updatedCart = getUpdatedCart(productId, true);
    console.log('HandleRemoveFromCart updatedCart', updatedCart);

    dispatch(removeProduct(updatedCart));
    updateSessionStorage(updatedCart);
  };

  const isProductInCart = () => {
    const productId = id;

    if (!productId) {
      console.error('Product ID is not available.');
      return false;
    }

    return cart.products.some((product) => product.productId === productId);
  };

  console.log('isProductInCart result', isProductInCart());

  const getUpdatedCart = (productId, remove = false) => {
    const updatedProducts = cart.products
      .map((p) => {
        if (p.productId === productId) {
          const existingQuantity = remove
            ? Math.max(p.quantity - 1, 0)
            : p.quantity + 1;

          if (existingQuantity > 0) {
            return { ...p, quantity: existingQuantity };
          } else {
            return null;
          }
        }
        return p;
      })
      .filter(Boolean);

    const updatedCart = {
      products: updatedProducts,
      itemCount: updatedProducts.reduce((total, p) => total + p.quantity, 0),
    };

    return updatedCart;
  };

  const updateSessionStorage = (updatedCart) => {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const existingCarts = JSON.parse(sessionStorage.getItem('carts')) || [];

    const userCartIndex = existingCarts.findIndex(
      (cart) => cart[currentUser?.id] !== undefined,
    );

    const updatedCarts =
      userCartIndex !== -1
        ? [
            ...existingCarts.slice(0, userCartIndex),
            { [currentUser?.id]: updatedCart },
            ...existingCarts.slice(userCartIndex + 1),
          ]
        : [...existingCarts, { [currentUser?.id]: updatedCart }];

    sessionStorage.setItem('carts', JSON.stringify(updatedCarts));
    sessionStorage.setItem('userCart', JSON.stringify(updatedCart));
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
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
        {isLoggedIn ? (
          <form>
            <button
              className="single-product-button"
              type="button"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            {
              <button
                className="single-product-button"
                type="button"
                onClick={handleRemoveFromCart}
              >
                Remove from Cart
              </button>
            }
          </form>
        ) : (
          <p>You must be logged in to add items to your cart</p>
        )}
      </div>
    </div>
  );
};

const generateStars = (rating) =>
  '★'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating));

export default SingleProduct;
