import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';

import ArticlePage from './ArticlePage';
import articleService from '../../services/articleService/articleService';

jest.mock('../../services/articleService/articleService');

describe('ArticlePage component', () => {
  beforeEach(() => {
    jest.spyOn(articleService, 'getArticle');
  });

  afterEach(() => {
    articleService.getArticle.mockClear();
  });

  it('should not fetch the article (Add mode)', async () => {
    render(<MemoryRouter><ArticlePage /></MemoryRouter>);
    expect(articleService.getArticle).not.toBeCalled();
  });

  it('should fetch the article (Edit mode)', async () => {
    await act(async () => {
      await render(<MemoryRouter><ArticlePage articleId={1} /></MemoryRouter>);
    });
    expect(articleService.getArticle).toBeCalledWith(1);
  });

  it('should call the "updateArticle" method of the article service', async () => {
    jest.spyOn(articleService, 'updateArticle');
    await act(async () => {
      await render(<MemoryRouter><ArticlePage articleId={1} /></MemoryRouter>);
    });
    fireEvent.click(screen.getByText("Submit"));
    expect(articleService.updateArticle).toBeCalled();
    articleService.updateArticle.mockClear();
  });

  it('should call the "addArticle" method of the article service', async () => {
    jest.spyOn(articleService, 'addArticle');
    await act(async () => {
      await render(<MemoryRouter><ArticlePage /></MemoryRouter>);
    });
    await act(async () => {
      await fireEvent.click(screen.getByText("Submit"));
    });
    expect(articleService.addArticle).toBeCalled();
    articleService.addArticle.mockClear();
  });
});
