import { Routes, Route } from 'react-router-dom';
import './App.css';
import HorizontalNav from './features/HorizontalNav';
import ProductsList from './features/products/ProductsList';
import ProductDetails from './features/products/SingleProduct';
import Registration from './features/account/Register';
import Account from './features/account/Account';
import Login from './features/account/Login';

function App() {
  return (
    <>
      <HorizontalNav />
      <Routes>
        <Route path="/products/category/:category" element={<ProductsList />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/products" element={<ProductsList />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/logout" element={<Login />} />
        <Route path="/auth/register" element={<Registration />} />
        <Route path="/users/account" element={<Account />} />
        <Route path="/" element={<ProductsList />}>
          <Route index element={<ProductDetails />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
