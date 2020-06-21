import React from 'react';
import './Product.scss';
import { Link } from 'react-router-dom';
import logo from '../../logo.svg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsAlt } from '@fortawesome/free-solid-svg-icons';

function LoadItems($this) {
    $this.GetProduct('./data/product-2.json');
}
class Product extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ProductData: [],
      isLoading: false,
    };
  }

  GetProduct(URL) {
    fetch(URL)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong ...');
        }
      })
      .then(data => this.setState({ ProductData: data, isLoading: false }))
      .catch(error => {
        this.setState({ error, isLoading: false })
      });
  }

  componentDidMount() {
    this.GetProduct('./data/product-1.json');
  }

  render() {
    const { ProductData, isLoading, error } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <img src={logo} className="App-logo" alt="logo" />;
    }

    if(ProductData && ProductData.data && ProductData.moreProducts) {
      return (
        <div className="m-product" data-testid="Product">
          <div className="m-product__image-container">
              <img
                  className="m-product__image"
                  src={ProductData.data.image}
                  alt={ProductData.data.alt} onClick={() => LoadItems(this)}/>
              <button className="m-product__preview-btn">
                <FontAwesomeIcon icon={faArrowsAlt} className="m-product__preview-btn-icon"/>
              </button>
          </div>
          <div className="m-product__info">
              <h3 className="m-product__title">
                {ProductData.data.title}
              </h3>
              <p className="m-product__price-container">
                <span className="m-product__currency">
                  {ProductData.data.currency}
                </span>
                <span className="m-product__price">
                  {ProductData.data.price}
                </span>
              </p>
              <p className="m-product__sizes">
                available sizes:
                {ProductData.data.sizes.map((size, index) =>
                  <span key={index} className="m-product__size">
                    {size}
                  </span>
                )}
              </p>
              <div className="m-product__colors-container">
                  <p className="m-product__colors-label">Colors</p>
                  <div className="m-product__colors">
                    {ProductData.data.colors.map((color, index) =>
                      <button
                        key={index}
                        className="m-product__color"
                        style={{backgroundColor: color}}>
                      </button>
                    )}
                  </div>
                  <div className="m-product__color-bg"></div>
              </div>
          </div>
          <div className="m-product__description-container">
            <p className="m-product__description-title">{ProductData.data.descriptionTitle}</p>
            <p className="m-product__description">
              {ProductData.data.description}
            </p>
            <ul className="m-product__description-list">
              {ProductData.data.descriptionList.map((item, index) =>
                  <li key={index} className="m-product__description-list-item">
                      {item}
                  </li>
              )}
            </ul>
          </div>
          <div className="m-product__more-products">
              <p className="m-product__description-title">
                {ProductData.moreProducts.title}
              </p>
              <div className="m-product__more-products-images">
                  {ProductData.moreProducts.images.map((product, index) =>
                      <Link to={product.link} key={index} className="m-product__more-products-link">
                          <img
                              className="m-product__more-products-image"
                              src={product.smallImage} alt={product.alt}/>
                      </Link>
                  )}
              </div>
          </div>
        </div>
      )
    }
  }
}

export default Product;
