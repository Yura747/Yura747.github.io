import React from 'react';
import './Home.scss';
import Product from '../../components/Product/Product';

const Home = () => (
  <div className="Home" data-testid="Home">
    <div className="layout">
        <Product />
    </div>
  </div>
);

export default Home;
