import React, { memo, useContext } from 'react';
import PropTypes from 'prop-types';

import Categories from '../../contexts/Categories';
import article from '../../models/article';

import './ArticleForm.css';

export function ArticleForm(props) {
  const { article, onArticleChange, onSubmit } = props;
  const categories = useContext(Categories);

  return (
    <form className="ArticleForm" onSubmit={handleSubmit}>
      <div className="ArticleForm__table">
        <div className="ArticleForm__row">
          <div className="ArticleForm__cell">
            <label htmlFor="title" >Title :</label>
          </div>
          <div className="ArticleForm__cell">
            <input id="title" name="title" onChange={handleChange} type="text" value={article.title} />
          </div>
        </div>
        <div className="ArticleForm__row">
          <div className="ArticleForm__cell">
            <label htmlFor="category" >Category :</label>
          </div>
          <div className="ArticleForm__cell">
            <select id="category" name="category" onChange={handleChange} value={article.category} >
              <option value=""></option>
              {categories.map(category => (
                <option key={category.id} value={category.id} >{category.title}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="ArticleForm__row">
          <div className="ArticleForm__cell">
            <label htmlFor="content" >Content :</label>
          </div>
          <div className="ArticleForm__cell">
            <textarea id="content" name="content" onChange={handleChange} value={article.content} />
          </div>
        </div>
        <div className="ArticleForm__row">
          <div className="ArticleForm__cell">
            <label htmlFor="published" >Published :</label>
          </div>
          <div className="ArticleForm__cell">
            <input checked={article.published} id="published" name="published" onChange={handleChange} type="checkbox" />
          </div>
        </div>
      </div>
      <div className="ArticleForm__buttons">
        <input className="ArticleForm__button" type="submit" value="Submit" />
      </div>
    </form>
  );

  function handleChange(event) {
    const name = event.target.name;
    let value;

    switch(name) {
      case 'category':
        value = Number(event.target.value);
        break;

      case 'published':
        value = event.target.checked;
        break;

      default:
        value = event.target.value;
        break;
    }

    onArticleChange(name, value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit();
  }
}

ArticleForm.propTypes = {
  article: article,
  onArticleChange: PropTypes.func,
  onSubmit: PropTypes.func
};

ArticleForm.defaultProps = {
  article: {}
};

export default memo(ArticleForm);
