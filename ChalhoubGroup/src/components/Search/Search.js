import React from 'react';
import './Search.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const Search = () => (
  <div className="c-search__container" data-testid="Search">
      <form>
        <div className="c-search__inner">
            <input className="c-search__input" name="search" placeholder="search" />
            <button className="c-search__btn">
              <FontAwesomeIcon icon={faSearch} className="c-search__btn-icon"/>
            </button>
        </div>
      </form>
  </div>
);

export default Search;
