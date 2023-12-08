import { Routes, Route } from 'react-router-dom';
import './App.css';
import HorizontalNav from './features/HorizontalNav';
import ProductsList from './features/products/ProductsList';
import ProductDetails from './features/products/SingleProduct';
import FilteredProducts from './features/products/FilteredProducts';
import Registration from './features/account/Register';
import Cart from './features/cart/Cart';
import Account from './features/account/Account';

function App() {
  return (
    <>
      <HorizontalNav />
      <Routes>
        <Route path="/" element={<ProductsList />} />
        <Route path="/products" element={<ProductsList />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/:category" element={<FilteredProducts />} />
        <Route path="/auth/login" element={<Registration />} />
        <Route path="/auth/logout" element={<ProductsList /> } />
        <Route path="/auth/register" element={<Registration /> } /> 
        <Route path="/users/account" element={<Account />} />
        <Route path="/users/cart" element={<Cart />} />
      </Routes>
    </>
  );
}

export default App;
