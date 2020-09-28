import { useEffect, useState } from 'react';

import articleService from '../../services/articleService/articleService';

export function useFilteredArticles() {
  const [articles, setArticles] = useState([]);
  const [filters, setFilters] = useState({
    title: '',
    category: '',
    published: '',
  });

  useEffect(() => {
    articleService.getArticles().then(setArticles);
  }, []);

  const filteredArticles = articles
    .filter(article => !filters.title || article.title.indexOf(filters.title) !== -1)
    .filter(article => !filters.category || article.category === Number(filters.category))
    .filter(article =>
      !filters.published ||
      (filters.published === 'published' && article.published === true) ||
      (filters.published === 'draft' && article.published === false)
    );

  return { articles: filteredArticles, filters, setArticles, setFilters };
}
