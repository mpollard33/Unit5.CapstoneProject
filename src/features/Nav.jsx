import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/products'>Products</Link></li>
        <li><Link to='/account'>Account</Link></li>
        <li><Link to='/cart'></Link></li>
      </ul>
    </nav>
  );
};

export default Nav;