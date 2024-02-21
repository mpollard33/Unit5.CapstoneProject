import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import {
  selectCategory,
  selectSort,
  setCategory,
  setSort,
} from '../store/productSlice';

const VerticalNav = () => {
  const categorySelector = useSelector(selectCategory);
  const sortSelector = useSelector(selectSort);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sortType = useSelector(selectSort).sortType;

  const handleCategoryChange = (categoryType) => {
    if (categoryType === 'all products') {
      navigate(`/products`);
      dispatch(setCategory(''));
    } else {
      navigate(`/products/category/${categoryType}`);
      dispatch(setCategory(categoryType));
    }

    console.log('Category State Updated: ', updatedCategory);
  };

  const handleSortChange = (type, order) => {
    dispatch(setSort({ type, order }));
    console.log('Sort State Updated: ', type, order);
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
              value={sortType}
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
