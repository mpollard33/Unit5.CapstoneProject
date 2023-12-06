import { useSelector } from 'react-redux';
import { useGetProductsQuery } from './productsApi';
import ProductCard from './ProductCard';
import './index.css';
import VerticalNav from '../VerticalNav';
import { useEffect } from 'react';

const Products = () => {
  const sortType = useSelector((state) => state.products.sort.sortType);
  const sortOrder = useSelector((state) => state.products.sort.order);

  const { data, error, isLoading } = useGetProductsQuery();

  const sortData = (data, sortType) => {
    return (data || []).slice().sort((a, b) => {
      switch (sortType) {
        case 'price':
          console.log('price', a.price);
          return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
        case 'rating':
          return sortOrder === 'asc'
            ? a.rating.rate - b.rating.rate
            : b.rating.rate - a.rating.rate;
        case 'count':
          return sortOrder === 'asc'
            ? a.rating.count - b.rating.count
            : b.rating.count - a.rating.count;
        default:
          return 0;
      }
    });
  };
  useEffect(() => {
    console.log('SortType Changed!: ', sortType);
    sortData(data, sortType);
  }, [sortType]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  let sortedData = sortData(data, sortType);

  console.log('sort order', sortOrder);
  console.log('sortType ', sortType);

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
