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
} from '../../store/authSlice';
import './productCard.css';

const SingleProduct = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetProductsByIdQuery(id);
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const [quantity, setQuantity] = useState(1);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userId = useSelector(selectUserId);

  const [displayLoginMessage, setDisplayLoginMessage] = useState(false);

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
    
    const productId = data.id;
    const updatedCart = getUpdatedCart(productId);
    dispatch(addProductToCart(updatedCart));
    updateSessionStorage(updatedCart);
  };

  const handleRemoveFromCart = () => {
    const productId = data.id;
    if (!productId) return;

    const updatedCart = getUpdatedCart(productId, true);
    dispatch(removeProduct(updatedCart));
    updateSessionStorage(updatedCart);
  };

  const isProductInCart = () => {
    return cart.products.some((product) => product.productId === data.id);
  };

  const getProductQuantityInCart = () => {
    const productInCart = cart.products.find(
      (product) => product.productId === data.id,
    );
    return productInCart ? productInCart.quantity : 0;
  };

  const getUpdatedCart = (productId, remove = false) => {
    const existingProduct = cart.products.find(
      (product) => product.productId === productId,
    );

    const existingQuantity = existingProduct ? existingProduct.quantity : 0;

    const newQuantity = remove
      ? Math.max(existingQuantity - quantity, 0)
      : existingQuantity + quantity;

    const updatedProducts =
      newQuantity > 0
        ? [
            ...cart.products.filter(
              (product) => product.productId !== productId,
            ),
            { productId, quantity: newQuantity },
          ]
        : cart.products.filter((product) => product.productId !== productId);

    return {
      products: updatedProducts,
    };
  };

  const updateSessionStorage = (updatedCart) => {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

    const existingCarts = JSON.parse(sessionStorage.getItem('carts')) || [];

    const userCartIndex = existingCarts.findIndex(
      (cart) => cart[currentUser.id] !== undefined,
    );

    const updatedCarts =
      userCartIndex !== -1
        ? [
            ...existingCarts.slice(0, userCartIndex),
            { [currentUser.id]: updatedCart },
            ...existingCarts.slice(userCartIndex + 1),
          ]
        : [...existingCarts, { [currentUser.id]: updatedCart }];

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
        <form>
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value, 10) || 1)}
          />
          <button
            className="single-product-button"
            type="button"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
          {displayLoginMessage && renderLoginMessage()}
          {isProductInCart() && (
            <>
              {getProductQuantityInCart() > 0 && (
                <>
                  {isLoggedIn ? (
                    <>
                      <button
                        className="single-product-button"
                        type="button"
                        onClick={handleRemoveFromCart}
                      >
                        Remove from Cart
                      </button>
                      <p>
                        You have {getProductQuantityInCart()} of this product in
                        your cart!
                      </p>
                    </>
                  ) : (
                    <p>You must be logged in to add items to the cart.</p>
                  )}
                </>
              )}
            </>
          )}
        </form>
      </div>
    </div>
  );
};

const generateStars = (rating) =>
  '★'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating));

export default SingleProduct;
