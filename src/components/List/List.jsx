import React, { memo } from 'react';
import PropTypes from 'prop-types';

import article from '../../models/article';
import Article from '../Article/Article';

import './List.css';

export function List(props) {
  const { articles, onRemove } = props;
  return (
    <div className="List">
      {articles.map(article => (
        <Article
          key={article.id}
          onRemove={onRemove}
          {...article}
        />
      ))}
    </div>
  );
}

List.propTypes = {
  articles: PropTypes.arrayOf(article),
  onRemove: PropTypes.func
};

List.defaultProps = {
  articles: [],
  onRemove: () => {}
};

export default memo(List);
