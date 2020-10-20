import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import Categories from '../../contexts/Categories';

import ArticleForm from './ArticleForm';

describe('ArticleForm component', () => {
  const article = {
    id: 1,
    title: 'Article 1',
    category: 1,
    published: true,
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  };
  const categories = [
    {
      id: 1,
      title: 'News'
    },
    {
      id: 2,
      title: 'Blog post'
    }
  ];

  it('should call onArticleChange when the article is updated', () => {
    const onArticleChange = jest.fn();
    render(<Categories.Provider value={categories}>
      <ArticleForm article={article} onArticleChange={onArticleChange} />
    </Categories.Provider>);
    fireEvent.click(screen.getByLabelText(/Published/));
    expect(onArticleChange).toBeCalledWith("published", false);
  });

  it('should call onSubmit when the form is submitted', () => {
    const onSubmit = jest.fn();
    render(<Categories.Provider value={categories}>
      <ArticleForm article={article} onSubmit={onSubmit} />
    </Categories.Provider>);
    fireEvent.click(screen.getByText("Submit"));
    expect(onSubmit).toBeCalled();
  });
});
