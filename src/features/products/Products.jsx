import React from 'react';
import { useGetProductsQuery } from './productsApi';
import ProductCard from './ProductCard';
import './index.css';

const Products = () => {
  const { data, error, isLoading } = useGetProductsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  console.log(data);

  return (
    <main className="main-container">
      <div className="page-container">
        <ul className="product-container">
          {data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Products;
