import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUserId } from '../../store/authSlice';
import Cart from './Cart';

const CartWrapper = () => {
  const navigate = useNavigate();
  const id = useSelector(selectUserId);

  useEffect(() => {
    if (id) {
      navigate(`/carts/user/${id}`);
    } else {
      console.log('No userId found', id || null);
    }
  }, [id, navigate]);

  return <Cart />;
};

export default CartWrapper;

