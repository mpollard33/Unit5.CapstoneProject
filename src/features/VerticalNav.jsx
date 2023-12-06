import '../index.css';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory, setSort } from '../store/productSlice';
import { useNavigate } from 'react-router-dom';

const categories = [
  'jewelery',
  'electronics',
  "men's clothing",
  "women's clothing",
];

const VerticalNav = () => {
  const currentCategory = useSelector(
    (state) => state.products.selectedCategory,
  );
  const currentSort = useSelector((state) => state.products.sort.sortType);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCategoryChange = (categoryType) => {
    dispatch(setCategory(categoryType));
    navigate(`/${categoryType}`);
  };

  const handleSortChange = (sortType, orderType) => {
    const newSortState = {
      sortType: sortType.toLowerCase(),
      order: orderType,
    };
    dispatch(setSort(newSortState));
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
              onChange={(e) => {
                handleCategoryChange(e.target.value);
              }}
              value={currentCategory}
            >
              <option value=""> -- All Categories --</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="bottom-border"></div>
      </div>
      {['Price', 'Rating', 'Rating Count'].map((option) => (
        <div key={option.toLowerCase()} className="nav-option">
          <label className="single-filter">
            Sort by {option}:{' '}
            <select
              onChange={(e) => {
                handleSortChange(option, e.target.value);
              }}
              value={currentSort}
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
