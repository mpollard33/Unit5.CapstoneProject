import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import HorizontalNav from './features/HorizontalNav';
import ProductsList from './features/products/ProductsList';
import ProductDetails from './features/products/SingleProduct';
import FilteredProducts from './features/products/FilteredProducts';
import Registration from './features/account/Register';
import Cart from './features/cart/Cart';
import Account from './features/account/Account';
import { selectState, selectUserId } from './store/authSlice';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Login from './features/account/Login';

function App() {
  return (
    <>
      <HorizontalNav />
      <Routes>
        <Route path="/" element={<ProductsList />} />
        <Route path="/products" element={<ProductsList />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/:category" element={<FilteredProducts />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/logout" element={<ProductsList />} />
        <Route path="/auth/register" element={<Registration />} />
        <Route path="/users/account" element={<Account />} />
        <Route path="/carts/" element={<CartWrapper />} />
      </Routes>
    </>
  );
}
const CartWrapper = () => {
  const navigate = useNavigate();
  const id = useSelector(selectUserId);

    if (id) {
      navigate(`/carts/user/${id}`);
      console.log(`navigate to carts/user/${id}`);
    } else {
      console.log('No userId found', id || null);
    }

  return <Cart />;
};
export default App;
