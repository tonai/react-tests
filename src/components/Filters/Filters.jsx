import React, { memo, useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import Categories from '../../contexts/Categories';
import filters from '../../models/filters';

import './Filters.css';

export function Filters(props) {
  const { filters, onFilterChanged } = props;
  const { category, published, title } = filters;
  const categories = useContext(Categories);
  const inputRef = useRef();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="Filters">
      <div className="Filters__cell">
        <input
          name="title"
          onChange={handleChange}
          type="text"
          ref={inputRef}
          value={title}
        />
      </div>
      <div className="Filters__cell" >
        <select name="category" onChange={handleChange} value={category} >
          <option value="" ></option>
          {categories.map(category => (
            <option key={category.id} value={category.id} >{category.title}</option>
          ))}
        </select>
      </div>
      <div className="Filters__cell">
        <label className="Filters__label">
          <input checked={published === ''} name="published" onChange={handleChange} type="radio" value="" />
          All
        </label>
        <label className="Filters__label">
          <input checked={published === 'published'} name="published" onChange={handleChange} type="radio" value="published" />
          Published
        </label>
        <label className="Filters__label">
          <input checked={published === 'draft'} name="published" onChange={handleChange} type="radio" value="draft" />
          Draft
        </label>
      </div>
    </div>
  );

  function handleChange(event) {
    const { name, value } = event.target;
    onFilterChanged(name, value);
  }
}

Filters.propTypes = {
  filters: filters,
  onFilterChanged: PropTypes.func
};

Filters.defaultProps = {
  filters: {}
};

export default memo(Filters);
