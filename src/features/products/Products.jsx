import React, { useState } from 'react';
import { useGetProductsQuery } from './productsApi';
import ProductCard from './ProductCard';
import './index.css';
import VerticalNav from '../VerticalNav';

const Products = () => {
  const { data, error, isLoading } = useGetProductsQuery();
  const [sortBy, setSortBy] = useState('');

  const sortData = (data, sortBy) => {
    return (data || []).slice().sort((a, b) => {
      if (sortBy === 'low') {
        return a.price - b.price;
      } else if (sortBy === 'high') {
        return b.price - a.price;
      } else {
        return 0;
      }
    });
  };

  const sortedData = sortData(data, sortBy);

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <main className="main-container">
      <div className="page-container">
        <VerticalNav handleSortChange={handleSortChange} sortBy={sortBy} />
        <ul className="product-container">
          {sortedData.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Products;
