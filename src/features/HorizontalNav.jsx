import React from "react";
import { Link } from "react-router-dom";

const HorizontalNav = () => {
  return (
    <nav>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/products'>Products</Link></li>
        <li><Link to='/account'>Account</Link></li>
        <li><Link to='/cart'>Cart</Link></li>
      </ul>
    </nav>
  );
};

export default HorizontalNav;