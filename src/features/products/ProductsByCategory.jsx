import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetProductsByCategoryQuery } from './productsApi';
import ProductCard from './ProductCard';
import VerticalNav from '../VerticalNav';
import './index.css';

const ProductsByCategory = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  const { data, error, isLoading } = useGetProductsByCategoryQuery(category);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <main className="main-container">
      <div className="page-container">
        <VerticalNav />

        <ul className="product-container">
          {data && data.length > 0 ? (
            data.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="no-products-message">
              <p>Sorry, there are no products for the selected category.</p>
            </div>
          )}
        </ul>
      </div>
    </main>
  );
};

export default ProductsByCategory;
