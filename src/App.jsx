import { Routes, Route } from 'react-router-dom';
import './App.css';
import HorizontalNav from './features/HorizontalNav';
import ProductsList from './features/products/ProductsList';
import ProductDetails from './features/products/SingleProduct';
import FilteredProducts from './features/products/FilteredProducts';

function App() {
  return (
    <>
      <HorizontalNav />
      <Routes>
        <Route path="/" element={<ProductsList />} />
        <Route path="/products" element={<ProductsList />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/:category" element={<FilteredProducts />} />
        <Route path="/account" element={<h2>/account</h2>} />
        <Route path="/cart" element={<h2>/cart</h2>} />
      </Routes>
    </>
  );
}

export default App;
