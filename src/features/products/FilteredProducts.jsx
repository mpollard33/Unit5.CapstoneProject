import React from 'react';
import {
  useGetProductsByCategoryQuery,
  useGetProductsQuery,
} from './productsApi';
import ProductCard from './ProductCard';
import './index.css';
import VerticalNav from '../VerticalNav';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetSortOrderQuery } from '../cart/cartApi';

const FilteredProducts = () => {
  const { category } = useParams();
  const selectSortOrder = (state) => state.products.sort.order;
  const selectSortType = (state) => state.products.sort.sortType;

  const {
    data: productsByCategory,
    error,
    isLoading,
  } = useGetProductsByCategoryQuery(category);
  console.log('PRODUCTS BY CATEGORY RESULT', productsByCategory);

  const { data: orderedProducts, error: orderedError } =
    useGetSortOrderQuery(selectSortOrder);

//   console.log('SORT ORDER RESULT', orderedProducts);

  if (!productsByCategory) return <div>No data Found</div>;
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <main className="main-container">
      <div className="page-container">
        <VerticalNav />
        <ul className="product-container">
          {productsByCategory.length > 0 ? (
            productsByCategory.map((product) => (
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

export default FilteredProducts;

//  category + desc
// query order
// run .filter for category
// display filtered
