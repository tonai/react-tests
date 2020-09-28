import React, { memo, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

import Categories from '../../contexts/Categories';

import './Article.css';

export function Article(props) {
  const { category: categoryId, id, onRemove, published, title } = props;
  const [selected, setSelected] = useState(false);
  const categories = useContext(Categories);

  const category = categories.find(category => category.id === categoryId);

  return (
    <div className={classnames('Article', {isSelected: selected})} onClick={handleClick} >
      <div className="Article__cell">{title}</div>
      <div className="Article__cell">{category ? category.title : categoryId}</div>
      <div className="Article__cell">{published ? 'Published' : 'Draft'}</div>
      <div className="Article__cell">
        <Link className="Article__link" to={`/article/${id}`} >edit</Link>
      </div>
      <div className="Article__cell">
        <button className="Article__link" onClick={handleRemove} >remove</button>
      </div>
    </div>
  );

  function handleClick() {
    setSelected(prevState => !prevState);
  }

  function handleRemove(event) {
    event.preventDefault();
    onRemove(id);
  }
}

Article.propTypes = {
  category: PropTypes.number,
  content: PropTypes.string,
  id: PropTypes.number.isRequired,
  onRemove: PropTypes.func,
  published: PropTypes.bool,
  title: PropTypes.string
}

Article.defaultProps = {
  published: false,
};

export default memo(Article);
