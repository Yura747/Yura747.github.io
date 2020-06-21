import React from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';


import Search from '../Search/Search';

const menuItems= ['men', 'women', 'kids', 'ftw', 'accessories'];

const listItems = menuItems.map((menuItem, index) =>
  <li key={index} className="l-header__menu-item">
    <Link to='/' className="l-header__menu-link">
      {menuItem}
    </Link>
  </li>
);

const Header = () => (
  <header className="Header" data-testid="Header">
    <div className="layout">
      <div className="l-header__container">
        <Link to='/' className="l-header__logo">
          <h1>Logo</h1>
        </Link>
        <nav>
          <ul className="l-header__menu">
              {listItems}
          </ul>
        </nav>

        <Search />
      </div>
    </div>
  </header>
);

export default Header;
