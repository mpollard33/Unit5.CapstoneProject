import React, { useEffect, useState } from 'react';
import { useGetProductsQuery } from './productsApi';
import ProductCard from './ProductCard';
import VerticalNav from '../VerticalNav';
import sortData from './sortUtil';
import { useSelector } from 'react-redux';

const ProductsList = () => {
  const [sortedData, setSortedData] = useState([]);
  const sortType = useSelector((state) => state.products.sort.sortType);
  const sortOrder = useSelector((state) => state.products.sort.order);

  const { data, error, isLoading } = useGetProductsQuery();

  useEffect(() => {
    if (data) {
      const newData = sortData(data, sortType, sortOrder);
      setSortedData(newData);
    }
  }, [data, sortType, sortOrder]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <main className="main-container">
      <div className="page-container">
        <VerticalNav />
        <ul className="product-container">
          {sortedData && sortedData.length > 0 ? (
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

export default ProductsList;
