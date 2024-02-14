import React from 'react';
import {
  useGetProductsQuery,
  useGetProductsByCategoryQuery,
} from './productsApi';
import VerticalNav from '../VerticalNav';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectCategory } from '../../store/productSlice';
import ProductCard from './ProductCard';
import './index.css';

const ProductsList = () => {
  const { category } = useParams();
  const selectedCategory = useSelector(selectCategory);
  const categoryQuery = useGetProductsByCategoryQuery(category);
  const allProductsQuery = useGetProductsQuery();

  const query = selectedCategory ? categoryQuery : allProductsQuery;

  return (
    <main className="main-container">
      <div className="page-container">
        <VerticalNav />
        {query.isLoading && <div>Loading...</div>}
        {query.isError && <div>Error: {query.error.message}</div>}
        {query.isSuccess && (
          <ul className="product-container">
            {query.data.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ul>
        )}
        {query.isSuccess && query.data.length === 0 && (
          <div className="no-products-message">
            <p>Sorry, there are no products for the selected category.</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default ProductsList;
