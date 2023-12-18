import React, { useEffect, useState } from 'react';
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
  // const { category } = useParams();
  const category = 'electronics';
  console.log('category params', category);

  const selectedCategory = useSelector(selectCategory);
  console.log('selectedCategory', category);

  const {
    data: allProducts,
    error: allProductsError,
    isLoading: productsLoading,
  } = useGetProductsQuery();

  const {
    data: singleCategory,
    error: singleCategoryError,
    isLoading: singleCategoryIsLoading,
  } = useGetProductsByCategoryQuery(category);

  console.log('singleCategory', singleCategory);

  const [products, setProducts] = useState([]);

  const setProductsDisplay = () => {
    if (category === null || category === undefined || category === '') {
      return Promise.resolve(allProducts);
    } else {
      return Promise.resolve(singleCategory);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await setProductsDisplay();
      setProducts(result);
      console.log('after function', result);
    };

    fetchData();
  }, []);

  console.log("products before render", products)
  if (productsLoading || singleCategoryIsLoading) return <div>Loading...</div>;
  if (allProductsError || singleCategoryError)
    return <div>{allProductsError || singleCategoryError}</div>;

  return (
    <main className="main-container">
      <div className="page-container">
        <VerticalNav />
        <ul className="product-container">
          {products.map((product) => (
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
