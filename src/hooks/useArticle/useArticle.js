import { useEffect, useState } from 'react';

import articleService from '../../services/articleService/articleService';

export function useArticle(articleId) {
  const [article, setArticle] = useState({
    category: 0,
    content: '',
    published: false,
    title: ''
  });

  useEffect(() => {
    if (articleId) {
      articleService.getArticle(articleId).then(setArticle);
    }
  }, [articleId]);

  return [article, setArticle];
}
