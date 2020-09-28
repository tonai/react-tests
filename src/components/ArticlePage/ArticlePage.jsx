import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { useArticle } from '../../hooks/useArticle/useArticle';
import articleService from '../../services/articleService/articleService';

import ArticleForm from '../ArticleForm/ArticleForm';
import Container from '../Container/Container';
import Title from '../Title/Title';

const linkProps = { children: 'Back', to: '/' };

function ArticlePage(props) {
  const { articleId } = props;
  const [article, setArticle] = useArticle(articleId);
  const [redirect, setRedirect] = useState(null);

  const handleArticleChange = useCallback((name, value) => 
    setArticle(prevState => ({
      ...prevState,
      [name]: value
    }))
  , [setArticle]);

  const handleSubmit = useCallback(() => 
    articleId
      ? articleService.updateArticle(article)
      : articleService.addArticle(article).then(article => setRedirect(`/article/${article.id}`))
  , [article, articleId, setRedirect]);

  const title = articleId
    ? `Edit article (${articleId})`
    : 'Add new article';

  return (
    <>
      <Title linkProps={linkProps} title={title} />
      <Container>
        <ArticleForm
          article={article}
          onArticleChange={handleArticleChange}
          onSubmit={handleSubmit}
        />
      </Container>
      {redirect && (<Redirect to={redirect}/>)}
    </>
  );
}

ArticlePage.propTypes = {
  articleId: PropTypes.number
};

ArticlePage.defaultProps = {
  articleId: null
};

export default ArticlePage;
