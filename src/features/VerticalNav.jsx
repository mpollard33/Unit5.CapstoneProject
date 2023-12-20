import '../index.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCategory,
  setSortType,
  setSortOrder,
  setSort,
} from '../store/productSlice';
import {
  selectSortOrder,
  selectSortType,
  selectCategory,
  selectSort,
} from '../store/productSlice';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useGetProductsByCategoryQuery,
  useGetAllCategoriesQuery,
  useGetProductsQuery,
  useGetSortOrderQuery,
} from './products/productsApi';
import './products/index.css';

const VerticalNav = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categorySelect = useSelector(selectCategory);
  const sortType = useSelector(selectSortType);
  const sortOrder = useSelector(selectSortOrder);

  const { data: sortOrderQuery, error: orderError } =
    useGetSortOrderQuery(sortOrder);

  const { data: getCategoriesQuery } = useGetAllCategoriesQuery();

  const { data: sortedByCategory, error: categoryError } =
    useGetProductsByCategoryQuery(category);

  const { data: productsQuery, error: productsError } = useGetProductsQuery();

  const handleCategoryChange = async (categoryType) => {
    try {
      dispatch(setCategory(categoryType));
      if (categoryType === '') {
        navigate('/products/');
        return;
      }
      navigate(`/products/category/${categoryType}`);
    } catch (categoryError) {
      console.error('Error changing category', categoryError);
    }
  };

  const handleSortTypeChange = async (type) => {
    // try {
    //   if (type === '') return dispatch(setSortType({ sortType: '' }));
    //   dispatch(setSortType({ type }));
    //   navigate(`/products/sorted`);
    // } catch (orderError) {
    //   console.error(orderError);
    // }
  };

  const handleSortOrderChange = (order) => {
    try {
      if (order === '') {
        if (categorySelect === '') navigate('/');
        dispatch(setSortOrder({ order: '' }));
        if (categorySelect !== undefined || null)
          navigate(`/products/category/${categorySelect}`);
        else{
          navigate(`/products`)
        }
        return;
      }
      dispatch(setSortOrder(order));
    } catch (error) {
      console.error('Error changing sort order', error);
    }
  };

  return (
    <ul className="vertical-nav-bar">
      <header>
        <h4>Filter</h4>
      </header>
      <div className="bottom-border"></div>
      <div className="list-container">
        <div className="nav-dropdown">
          <label>
            Sort by Category:
            <select
              onChange={(e) => handleCategoryChange(e.target.value)}
              value={categorySelect}
            >
              <option value=""> -- All Categories --</option>
              {getCategoriesQuery &&
                getCategoriesQuery.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
            </select>
          </label>
        </div>
        <div className="bottom-border"></div>
      </div>
      <section className="sort-container">
        <div className="nav-option">
          <label className="single-filter">
            Sort By:
            <select
              onChange={(e) => handleSortTypeChange(e.target.value)}
              value={sortType}
            >
              <option value="">-- Select --</option>
              <option value="price">Price</option>
              <option value="rating">Rating</option>
              <option value="rating count">Rating Count</option>
            </select>
          </label>
        </div>
        <div className="nav-option">
          <label className="single-filter">
            Sort Order:
            <select
              onChange={(e) => handleSortOrderChange(e.target.value)}
              value={sortOrder}
            >
              <option value="">-- Select --</option>
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
          </label>
        </div>
      </section>
    </ul>
  );
};

export default VerticalNav;
