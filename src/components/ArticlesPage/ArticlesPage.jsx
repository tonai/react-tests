import React, { useCallback } from 'react';

import { useFilteredArticles } from '../../hooks/useFilteredArticles/useFilteredArticles';
import articleService from '../../services/articleService/articleService';

import Container from '../Container/Container';
import Filters from '../Filters/Filters';
import List from '../List/List';
import Title from '../Title/Title';

const title = 'Articles';
const linkProps = { children: 'Add new article', to: '/article' };

function ArticlesPage() {
  const { articles, filters, setArticles, setFilters } = useFilteredArticles();

  const handleFilterChanged = useCallback((filter, value) => 
    setFilters((prevState) => ({
      ...prevState,
      [filter]: value,
    }))
  , [setFilters]);

  const handleRemove = useCallback((id) => {
    // Naive (ensure new list is sync with BE)
    // articleService
    //   .removeArticle(id)
    //   .then(() => articleService.getArticles())
    //   .then(setArticles);

    // Optimistic (good when BE is slow)
    // setArticles(prevState => prevState.filter(article => article.id !== id));
    // articleService
    //   .removeArticle(id)
    //   .catch(() => articleService.getArticles().then(setArticles));

    // Classic
    articleService
      .removeArticle(id)
      .then(() => setArticles(prevState => prevState.filter(article => article.id !== id)));
  }, [setArticles]);

  return (
    <>
      <Title linkProps={linkProps} title={title} />
      <Container>
        <Filters
          filters={filters}
          onFilterChanged={handleFilterChanged}
        />
        <List
          articles={articles}
          onRemove={handleRemove}
        />
      </Container>
    </>
  );
}

export default ArticlesPage;
