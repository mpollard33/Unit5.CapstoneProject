import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCart } from '../../store/authSlice';
import CartProductCard from './CartProductCard';

const Cart = () => {
  const userCart = useSelector(selectCart);
  // console.log('userCart', userCart);
  // console.log('userCart length', userCart.products.length);
  // console.log('First product', userCart.products[0].product.title);

  const toProductObject = (cart) => {
    const formattedCart = [];
    let i = 0;
    let userCart = cart.products[i].product;
    console.log('userCart', userCart);

    for (i; i < cart.products.length; i++) {
      let product = {
        id: cart.products[i].product.id,
        title: cart.products[i].product.title,
        price: cart.products[i].product.price,
        description: cart.products[i].product.description,
        category: cart.products[i].product.category,
        image: cart.products[i].product.image,
        rating: {
          rate: cart.products[i].product.rating.rate,
          count: cart.products[i].product.rating.count,
        },
      };
      console.log('product', product);
      formattedCart.push(product);
    }
    console.log('reached push');
    return formattedCart;
  };

  console.log('formattedCart', toProductObject(userCart));

  // {
  //   "id": 1,
  //   "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  //   "price": 109.95,
  //   "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  //   "category": "men's clothing",
  //   "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  //   "rating": {
  //       "rate": 3.9,
  //       "count": 120
  //   }

  useEffect(() => {}, [userCart.itemCount]);

  return (
    <div>
      <h2>Your Cart</h2>
      <ul>{/* <CartProductCard product={userCart.products[0]} /> */}</ul>
    </div>
  );
};

export default Cart;
