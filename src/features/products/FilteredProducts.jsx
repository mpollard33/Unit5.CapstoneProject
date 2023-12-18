import React, { useEffect, useState } from 'react';
import {
  useGetSortOrderQuery,
  useGetProductsByCategoryQuery,
} from './productsApi';
import ProductCard from './ProductCard';
import './index.css';
import VerticalNav from '../VerticalNav';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectSortOrder, selectSortType } from '../../store/productSlice';

const FilteredProducts = () => {
  const { category } = useParams();
  const sortOrderSelector = useSelector(selectSortOrder);
  const sortTypeSelector = useSelector(selectSortType);

  const [productsByCategory, setProductsByCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  const { data: fetchedProductsByCategory, error: categoryError } =
    useGetProductsByCategoryQuery(category, sortOrderSelector);

  useEffect(() => {
    setProductsByCategory(fetchedProductsByCategory ?? []);
    setLoading(false);
  }, [category, sortOrderSelector, fetchedProductsByCategory]);

  if (loading) return <div>Loading...</div>;
  if (categoryError || !productsByCategory || productsByCategory.length === 0) {
    return <div>No data Found</div>;
  }

  return (
    <main className="main-container">
      <div className="page-container">
        <VerticalNav />
        <ul className="product-container">
          {productsByCategory.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
      </div>
    </main>
  );
};

export default FilteredProducts;
