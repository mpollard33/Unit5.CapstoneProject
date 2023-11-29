// VerticalNav component
import React from "react";
import { Link } from "react-router-dom";
import '../index.css'

const VerticalNav = () => {
  return (
    <nav >
      <ul className="vertical-nav">
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/products'>Products</Link></li>
        <li><Link to='/account'>Account</Link></li>
        <li><Link to='/cart'>Cart</Link></li>
      </ul>
    </nav>
  );
};


export default VerticalNav;