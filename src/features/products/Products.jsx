import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetProductByCategoryQuery } from './productsApi';
import ProductCard from './ProductCard';
import './index.css';
import VerticalNav from '../VerticalNav';

const sortData = (data, sort) => {
  return (data || []).slice().sort((a, b) => {
    switch (sort.sortType) {
      case 'price':
        return sort.order === 'asc' ? a.price - b.price : b.price - a.price;
      case 'rating':
        return sort.order === 'asc'
          ? a.rating.rate - b.rating.rate
          : b.rating.rate - a.rating.rate;
      case 'count':
        return sort.order === 'asc'
          ? a.rating.count - b.rating.count
          : b.rating.count - a.rating.count;
      default:
        return 0;
    }
  });
};

const Products = () => {
  const { data, error, isLoading } = useGetProductByCategoryQuery(
    useSelector((state) => state.products.selectedCategory),
  );
  const dispatch = useDispatch();
  const [sort, setSort] = useState({ sortType: '', order: 'asc' });

  const sortedData = data ? sortData(data, sort) : [];

  const handleSortChange = (sortType) => {
    const newSort = {
      sortType,
      order:
        sort.sortType === sortType && sort.order === 'asc' ? 'desc' : 'asc',
    };
    setSort(newSort);

    console.log('Selected sortType changed to: ', sortType);
    console.log('Previous sortType:', sort.sortType);
  };

  const handleCategoryChange = (category) => {
    // Assuming you dispatch an action to update the selected category
    dispatch({ type: 'SET_CATEGORY', payload: category });

    console.log('Selected category changed to: ', category);
    console.log('Previous Category:', category);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <main className="main-container">
      <div className="page-container">
        <VerticalNav
          handleSortChange={handleSortChange}
          handleCategoryChange={handleCategoryChange}
          sort={sort}
        />
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

export default Products;
