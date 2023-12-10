import React from 'react';
import { format } from 'date-fns';
import { useUpdateCartMutation, useGetCartQuery } from '../account/authApi';

const Cart = () => {
  const currentDate = new Date();
  const formattedDate = format(currentDate, 'yyyy-MM-dd');
  // const {
  //   data: cart,
  //   error,
  //   isLoading,
  // } = useGetCartQuery({
  // });
  // change to updateCart
  // const removeFromCartMutation = useRemoveFromCartMutation();
  // const useUpdateCartMutation = useUpdateCartMutation();

  const handleQuantityChange = async (productId, newQuantity) => {
    try {
    } catch (error) {
      console.error('Failed to update quantity:', error);
    }
  };

  const handleRemoveProduct = async (productId) => {
    try {
    } catch (error) {}
  };

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>error</div>;
  // if (!data) return <div>No data found</div>;

  return (
    <div className="cart-container">
      <header>
        <h2>Cart</h2>
      </header>
      <h3>Contents: </h3>
      <p>User ID: id </p>
      <p>Date: {formattedDate}</p>
      <ul>
        {/* {cart.products.map((product) => (
          <li>
            Product ID: id, Quantity: quantity
            <input
              type="number"
              value={product.quantity}
              onChange={(e) => {}}
              min="1"
            />
            Remove Product
          </li>
        ))} */}
        CART PLACEHOLDER
      </ul>
    </div>
  );
};

export default Cart;

/*
add user cart
/POST /carts

get user Cart
/GET /carts/user/:id

get single cart
/GET /carts/:id

update user cart
/PUT /carts/:id

get a user
/GET /users/:id
*/
