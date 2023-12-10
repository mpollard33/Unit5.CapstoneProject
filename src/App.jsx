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
        <Route path="/auth/logout" element={<ProductsList />} />
        <Route path="/auth/register" element={<Registration />} />
        <Route path="/users/account" element={<Account />} />
        <Route path="/carts/user" element={<CartWrapper />} />
      </Routes>
    </>
  );
}
const CartWrapper = () => {
  const navigate = useNavigate();
  const id = useSelector(selectUserId);
  const authState = useSelector(selectState);

  useEffect(() => {
    if (id) {
      navigate(`/carts/user/${id}`);
    } else {
      console.log('No userId found');
      console.log('auth state', authState);
      navigate(`/carts/`);
      return <Cart />;
    }
  }, [id, navigate]);

  return <Cart />;
};
export default App;
