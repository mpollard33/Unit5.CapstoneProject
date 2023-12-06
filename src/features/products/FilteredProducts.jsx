import React from 'react';
import { useGetProductsQuery } from './productsApi';
import ProductCard from './ProductCard';
import './index.css';
import VerticalNav from '../VerticalNav';
import { useParams } from 'react-router-dom';
import sortData from './sortUtil';
import { useSelector } from 'react-redux';

const FilteredProducts = () => {
  const { category } = useParams();

  const { data, error, isLoading } = useGetProductsQuery();
  const sortType = useSelector((state) => state.products.sort.sortType);
  const sortOrder = useSelector((state) => state.products.sort.order);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!data) return <div>No data Found</div>;

  const filteredData = data.filter((product) => product.category === category);

  const sortedData = sortData(filteredData, sortType, sortOrder);

  return (
    <main className="main-container">
      <div className="page-container">
        <VerticalNav />
        <ul className="product-container">
          {sortedData.length > 0 ? (
            sortedData.map((product) => (
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
