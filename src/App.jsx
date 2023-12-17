import { Routes, Route } from 'react-router-dom';
import './App.css';
import HorizontalNav from './features/HorizontalNav';
import ProductsList from './features/products/ProductsList';
import ProductDetails from './features/products/SingleProduct';
import Registration from './features/account/Register';
import Cart from './features/cart/Cart';
import Account from './features/account/Account';
import Login from './features/account/Login';
import CartWrapper from './features/cart/CartWrapper';
import { useSelector } from 'react-redux';
import { selectUserId } from './store/authSlice';
import FilteredProducts from './features/products/FilteredProducts';

function App() {
  return (
    <>
      <HorizontalNav />
      <Routes>
        <Route path="/" element={<ProductsList />} />
        <Route path="/products" element={<ProductsList />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/products/category/:category" element={<FilteredProducts />} />
        <Route path="/:category" element={<ProductsList />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/logout" element={<Login />} />
        <Route path="/auth/register" element={<Registration />} />
        <Route path="/users/account" element={<Account />} />
        <Route path="/carts/user/:id" element={<CartWrapper />} />{' '}
        <Route path="/carts/" element={<CartWrapper />} />
      </Routes>
    </>
  );
}

export default App;
