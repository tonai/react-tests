import { act, renderHook } from '@testing-library/react-hooks';

import articleService from '../../services/articleService/articleService';

import { useFilteredArticles } from './useFilteredArticles';

jest.mock('../../services/articleService/articleService');

describe('useFilteredArticles hook', () => {
  beforeEach(() => {
    jest.spyOn(articleService, 'getArticles');
    articleService.getArticles.mockReturnValue(new Promise(resolve => resolve([
      {
        "id": 1,
        "title": "Article 1",
        "category": 1,
        "published": true,
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      },
      {
        "id": 2,
        "title": "Article 2",
        "category": 2,
        "published": true,
        "content": "Donec malesuada enim ac ipsum dictum placerat."
      },
      {
        "id": 3,
        "title": "Article 3",
        "category": 1,
        "published": false,
        "content": "Phasellus sit amet bibendum augue."
      },
      {
        "id": 4,
        "title": "Article 4",
        "category": 1,
        "published": false,
        "content": "Lorem ipsum dolor sit amet."
      }
    ])));
  });

  afterEach(() => {
    articleService.getArticles.mockClear();
  });

  it('loads the articles', async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => useFilteredArticles()
    );
    expect(articleService.getArticles).toHaveBeenCalled();
    expect(result.current.articles.length).toEqual(0);
    expect(result.current.filters.category).toEqual('');
    await waitForNextUpdate();
    expect(result.current.articles.length).toEqual(4);
  });

  it('filters the articles', async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => useFilteredArticles()
    );
    await waitForNextUpdate();
    act(() => result.current.setFilters({
      category: '1',
      title: 'Article',
      published: 'published'
    }));
    expect(result.current.articles.length).toEqual(1);
  });

  it('updates the articles', async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => useFilteredArticles()
    );
    await waitForNextUpdate();
    act(() => result.current.setArticles([
      {
        "id": 1,
        "title": "Article 1",
        "category": 1,
        "published": true,
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      }
    ]));
    expect(result.current.articles.length).toEqual(1);
  });
});

