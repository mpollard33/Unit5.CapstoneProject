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
import { useGetSortOrderQuery } from './cart/cartApi';
import {
  useGetProductsByCategoryQuery,
  useGetAllCategoriesQuery,
} from './products/productsApi';
import './products/index.css';

const VerticalNav = () => {
  const { urlOrder } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const category = useSelector(selectCategory);
  const sortType = useSelector(selectSortType);
  const sortOrder = useSelector(selectSortOrder);
  // const { sortType, order } = useSelector(selectSort); // selectSortOrder + selectSortType

  console.log('sortOrder before queries', sortOrder);
  const { data: sortOrderQuery, isLoading: isSortOrderQueryLoading } =
    useGetSortOrderQuery(sortOrder);

  console.log('result of sortOrderQuery', sortOrderQuery);
  const { data: categoryQueryData, isLoading: isCategoryQueryLoading } =
    useGetProductsByCategoryQuery(category);
  console.log('result of productsByCategory', categoryQueryData);

  const { data: getCategoriesQuery } = useGetAllCategoriesQuery();
  console.log('result of getCategoriesQuery', getCategoriesQuery);

  // useEffect(() => {
  //   if (categoryQueryData) {
  //     dispatch(setCategory(category));
  //   }
  // }, [categoryQueryData, dispatch]);

  const handleCategoryChange = async (categoryType) => {
    console.log('current category', selectCategory);
    dispatch(setCategory(categoryType));
    console.log('Current Category:', selectCategory);
    const sortedByCategory = await getCategoriesQuery();

    if (sortedByCategory) {
      console.log('completed await for categoryQueryData');
      console.log('sortedByCategory', sortedByCategory || sortedByCategory[0]);
      navigate(`/${categoryType}`);
    }
  };

  const handleSortTypeChange = async (type) => {
    if (type === '') return dispatch(setSortType({ sortType: '' }));
    dispatch(setSortType({ type }));
  };

  const handleSortOrderChange = async (order) => {
    if (order === '') return dispatch(setSortOrder({ order: '' }));
    dispatch(setSortOrder({ order }));
  };

  const fetchSortedProducts = async () => {
    try {
      const response = await sortOrderQuery(order);
      console.log('sort RESPONSE', response);
      return response.data;
    } catch (error) {
      console.error('Error fetching sorted products', error);
      return [];
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
              value={category}
            >
              <option value=""> -- All Categories --</option>
              {getCategoriesQuery.map((category) => (
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
            Sort By:{' '}
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
            Sort Order:{' '}
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
