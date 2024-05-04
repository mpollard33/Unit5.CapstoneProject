import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import {
  selectCategory,
  selectSortType,
  selectSortOrder,
  setCategory,
  setSortType,
  setSortOrder,
} from '../store/productSlice';

const VerticalNav = () => {
  const categorySelector = useSelector(selectCategory);
  const sortOrderSelector = useSelector(selectSortOrder);
  const sortTypeSelector = useSelector(selectSortType);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCategoryChange = (categoryType) => {
    if (categoryType === 'all products') {
      if (sortOrderSelector === 'asc' || 'desc') {
        dispatch(setCategory(''));
        navigate(`/products?sort=${sortOrderSelector}`);
      }
    } else {
      if (sortOrderSelector === 'asc' || 'desc') {
        navigate(`/products/category/${categoryType}?sort=${sortOrderSelector}`);
      }
      dispatch(setCategory(categoryType));
    }
  };

  const handleSortChange = (categoryType, sortOrder) => {
    if (categoryType === '' || categoryType === 'all products')
      navigate(`/products?sort=${sortOrder}`);
    dispatch(setSortType(categoryType));
    dispatch(setSortOrder(sortOrder));
    console.log('');
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
              value={categorySelector}
            >
              <option hidden disabled value="">
                -- Select A Category --
              </option>
              {[
                'all products',
                'jewelery',
                'electronics',
                "men's clothing",
                "women's clothing",
              ].map((category) => (
                <option key={category} value={category}>
                  {category[0].toUpperCase().concat(category.slice(1))}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="bottom-border"></div>
      </div>
      {['price', 'rating', 'rating count'].map((option) => (
        <div key={option} className="nav-option">
          <label className="single-filter">
            Sort by {option}:{' '}
            <select
              onChange={(e) => handleSortChange(option, e.target.value)}
              value={sortTypeSelector}
            >
              <option value="">-- Select --</option>
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
          </label>
        </div>
      ))}
    </ul>
  );
};
export default VerticalNav;
