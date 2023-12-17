import '../index.css';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory, setSort } from '../store/productSlice';
import { useNavigate } from 'react-router-dom';
import { ca } from 'date-fns/locale';

const VerticalNav = () => {
  const {
    selectedCategory,
    sort: { sortType },
  } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCategoryChange = (categoryType) => {
    console.log('categoryType', categoryType);
    const newCategory = categoryType === '' ? '' : categoryType.trim();
    console.log('newCategory', newCategory);
    dispatch(setCategory(newCategory));
    navigate(`/products/category/${newCategory}`);
  };

  const handleSortChange = (option, order) => {
    if (option === '') {
      dispatch(setSort({ sortType: '', order: '' }));
    } else {
      const newSortType = option.trim();
      dispatch(setSort({ sortType: newSortType, order }));
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
              value={selectedCategory}
            >
              <option value=""> -- All Categories --</option>
              {[
                'jewelery',
                'electronics',
                "men's clothing",
                "women's clothing",
              ].map((category) => (
                <option key={category} value={category}>
                  {category}
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
