import React, { useEffect, useState } from 'react';
import { useGetProductsQuery } from './productsApi';
import ProductCard from './ProductCard';
import VerticalNav from '../VerticalNav';
import { useSelector } from 'react-redux';

const ProductsList = () => {
  const { data: products, error, isLoading } = useGetProductsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <main className="main-container">
      <div className="page-container">
        <VerticalNav />
        {products.length > 0 ? (
          <ul className="product-container">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ul>
        ) : (
          <div className="no-products-message">
            <p>Sorry, there are no products for the selected category.</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default ProductsList;
