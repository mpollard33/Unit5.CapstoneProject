import { useSelector } from 'react-redux';
import { useGetProductsQuery } from './productsApi';
import ProductCard from './ProductCard';
import './index.css';
import VerticalNav from '../VerticalNav';
import { useEffect, useState } from 'react';

const Products = () => {
  const sortType = useSelector((state) => state.products.sort.sortType);
  const sortOrder = useSelector((state) => state.products.sort.order);
  const [sortedData, setSortedData] = useState([]);

  const { data, error, isLoading } = useGetProductsQuery();

  const sortData = () => {
    return (data || []).slice().sort((a, b) => {
      switch (sortType) {
        case 'price':
          return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
        case 'rating':
          return sortOrder === 'asc'
            ? a.rating.rate - b.rating.rate
            : b.rating.rate - a.rating.rate;
        case 'rating count':
          console.log('Sorting by count');
          console.log('Count for a:', a.rating.count);
          console.log('Count for b:', b.rating.count);
          return sortOrder === 'asc'
            ? a.rating.count - b.rating.count
            : b.rating.count - a.rating.count;
        default:
          console.log('Reached default case');
          return 0;
      }
    });
  };

  useEffect(() => {
    const newData = sortData();
    setSortedData(newData);
  }, [data, sortType, sortOrder]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <main className="main-container">
      <div className="page-container">
        <VerticalNav />
        <ul className="product-container">
          {data.length > 0 ? (
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
