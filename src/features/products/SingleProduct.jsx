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
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userId = useSelector(selectUserId);
  const [displayLoginMessage, setDisplayLoginMessage] = useState(false);

  const {
    data: singleProduct,
    error: singleProductError,
    isLoading: singleProductIsLoading,
  } = useGetProductsByIdQuery(id);

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

    if (!singleProduct || !singleProduct.id) {
      console.error('Product data is not available.');
      return;
    }

    const product = singleProduct;
    const productId = product.id;
    const updatedCart = getUpdatedCart(productId, product);
    dispatch(addProductToCart(updatedCart));
    updateSessionStorage(updatedCart);
  };

  const handleRemoveFromCart = () => {
    const productId = singleProduct?.id;
    if (!productId) return;

    const updatedCart = getUpdatedCart(productId, null, true);
    dispatch(removeProduct(updatedCart));
    updateSessionStorage(updatedCart);
  };

  const isProductInCart = () => {
    return cart.products.some(
      (product) => product.productId === singleProduct?.id,
    );
  };

  const getProductQuantityInCart = () => {
    const productInCart = cart.products.find(
      (product) => product.productId === singleProduct?.id,
    );
    return productInCart ? productInCart.quantity : 0;
  };

  const getUpdatedCart = (productId, product, remove = false) => {
    const updatedProducts = cart.products.reduce((acc, p) => {
      if (p.productId === productId) {
        const existingQuantity = remove
          ? Math.max(p.quantity - 1, 0)
          : p.quantity + 1;
        if (existingQuantity > 0) {
          acc.push({ ...p, quantity: existingQuantity });
        }
      } else {
        acc.push(p);
      }
      return acc;
    }, []);

    let updatedItemCount = updatedProducts.reduce(
      (total, product) => total + product.quantity,
      0,
    );

    if (!remove && product) {
      const existingProductIndex = updatedProducts.findIndex(
        (p) => p.productId === productId,
      );
      if (existingProductIndex !== -1) {
        updatedProducts[existingProductIndex].quantity += 1;
      } else {
        updatedProducts.push({ productId, product, quantity: 1 });
      }
      updatedItemCount += 1;
    }

    return {
      products: updatedProducts,
      itemCount: updatedItemCount,
    };
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

  if (singleProductIsLoading) return <div>Loading...</div>;
  if (singleProductError) return <div>Error</div>;
  if (!singleProduct) return <div>No data found</div>;

  const { title, image, rating, price, description } = singleProduct;

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
