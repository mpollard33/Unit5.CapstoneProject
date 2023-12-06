import {  useSelector } from 'react-redux';
import { useGetProductsQuery } from './productsApi';
import ProductCard from './ProductCard';
import './index.css';
import VerticalNav from '../VerticalNav';

const Products = () => {
  const products = useSelector((state) => state.products);

  console.log('state', products);

  const { data, error, isLoading } = useGetProductsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <main className="main-container">
      <div className="page-container">
        <VerticalNav />
        <ul className="product-container">
          {data.length > 0 ? (
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
export default Products;
