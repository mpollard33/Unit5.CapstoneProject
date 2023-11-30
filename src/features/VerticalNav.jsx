import { Link } from 'react-router-dom';
import '../index.css';

const VerticalNav = () => {
  return (
    <ul className="vertical-nav-bar">
      <header>
        <h4>Filter</h4>
      </header>
      <div className="bottom-border"></div>

      <div className="list-container">
        Category:
        <div className="nav-dropdown">
          <select>
            <option value=""></option>
            <option value="/">Jewelry</option>
            <option value="/">Electronic</option>
            <option value="/">Men's Clothing</option>
            <option value="/">Women's Clothing</option>
          </select>
        </div>
        <div className="bottom-border"></div>
        <label>
          <input type="checkbox" className="nav-checkbox" />
          placeholder
        </label>
        <li className="search-bar"></li>
      </div>
    </ul>
  );
};

export default VerticalNav;
