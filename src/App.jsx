import { Routes, Route } from 'react-router-dom';
import './App.css';
import HorizontalNav from './features/HorizontalNav';
import Products from './features/products/Products';

function App() {
  return (
    <>
      <header>
        <h1>E-Commerce Site</h1>
      </header>
      <HorizontalNav />
      <Routes>
        <Route path="/" element={<h2>/home</h2>} />
        <Route path="/products" element={<Products />} />
        <Route path="/account" element={<h2>/account</h2>} />
        <Route path="/cart" element={<h2>/cart</h2>} />
      </Routes>
    </>
  );
}

export default App;
