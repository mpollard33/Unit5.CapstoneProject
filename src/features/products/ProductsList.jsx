import React, { useEffect, useState } from 'react';
import { useGetProductsQuery } from './productsApi';
import ProductCard from './ProductCard';
import VerticalNav from '../VerticalNav';
import sortData from './sortUtil';
import { useSelector } from 'react-redux';

const ProductsList = () => {
  const [sortedData, setSortedData] = useState([]);
  const { sortType, order } = useSelector((state) => state.products.sort);
  const { data, error, isLoading } = useGetProductsQuery();

  useEffect(() => {
    if (data) {
      const newData = sortData(data, sortType, order);
      setSortedData(newData);
    }
  }, [data, sortType, order]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <main className="main-container">
      <div className="page-container">
        <VerticalNav />
        {sortedData.length > 0 ? (
          <ul className="product-container">
            {sortedData.map((product) => (
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
