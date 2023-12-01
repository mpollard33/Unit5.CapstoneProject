import React, { useState } from 'react';
import { useGetProductsQuery } from './productsApi';
import ProductCard from './ProductCard';
import './index.css';
import VerticalNav from '../VerticalNav';

const Products = () => {
  const { data, error, isLoading } = useGetProductsQuery();
  const [sort, setSort] = useState({ sortType: '', order: 'asc' }); // use state to manage sort type and order. Default order is ascending
  const [selectedCategory, setSelectedCategory] = useState(''); // use state to manage category state

  const sortData = (data, sort) => {

    return (data || []).slice().sort((a, b) => {
      // switch statement to manage sort state. Sets setType and uses boolean expression to manage asc/descending property
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

  const sortedData = sortData(data, sort);

  //  handles updating the sortState 
  const handleSortChange = (sortType) => {
    const prevSort = sort;
    setSort((current) => ({
      sortType,
      order:
        current.sortType === sortType && current.order === 'asc'
          ? 'desc'
          : 'asc',
    }));

    console.log('Selected sortType changed to: ', sortType);
    console.log('Previous sortType:', prevSort.sortType);
  };

  const handleCategoryChange = (category) => {
    const previousCategory = selectedCategory;
    setSelectedCategory(category);

    console.log('Selected category changed to: ', category);
    console.log('Previous Category:', previousCategory);
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
