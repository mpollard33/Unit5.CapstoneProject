import React, { useEffect } from 'react';
import {
  useGetProductsQuery,
  useGetProductsByCategoryQuery,
} from './productsApi';
import VerticalNav from '../VerticalNav';
import { useSelector } from 'react-redux';
import './index.css';
import { selectCategory } from '../../store/productSlice';
import { useParams } from 'react-router-dom';
import ProductCard from './ProductCard';

const ProductsList = () => {
  const { category } = useParams();
  console.log('category params', category);

  const selectedCategory = useSelector(selectCategory);
  console.log('selectedCategory', category);

  const {
    data: allProducts,
    error,
    isLoading: productsLoading,
  } = useGetProductsQuery();
  console.log('all products', allProducts);

  const { error: singleCategoryError, isLoading: singleCategoryIsLoading } =
    useGetProductsByCategoryQuery(category);

  const setProductsDisplay = async () => {
    return await allProducts;
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await setProductsDisplay();
      console.log('after function', result);
    };

    fetchData();
  }, []);

  console.log('after all products', allProducts);

  if (productsLoading || singleCategoryIsLoading) return <div>Loading...</div>;
  if (error || singleCategoryError)
    return <div>{error || singleCategoryError}</div>;

  return (
    <main className="main-container">
      <div className="page-container">
        <VerticalNav />
        <ul className="product-container">
          {allProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
        <div className="no-products-message">
          <p>Sorry, there are no products for the selected category.</p>
        </div>
      </div>
    </main>
  );
};

export default ProductsList;
