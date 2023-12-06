import { useSelector } from 'react-redux';
import {
  useGetProductsByCategoryQuery,
  useGetProductsQuery,
} from './productsApi';
import ProductCard from './ProductCard';
import './index.css';
import VerticalNav from '../VerticalNav';
import { useParams } from 'react-router-dom';

const FilteredProducts = () => {
  const selectedCategory = useSelector(
    (state) => state.products.selectedCategory,
  );

  let { category } = useParams();

  const { data, error, isLoading } = useGetProductsQuery();
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!data) return <div>No data Found</div>;

  const filteredData = data.filter((product) => product.category === category);

  return (
    <main className="main-container">
      <div className="page-container">
        <VerticalNav />
        <ul className="product-container">
          {filteredData.length > 0 ? (
            filteredData.map((product) => (
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
