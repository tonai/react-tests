import fetchMock from "jest-fetch-mock";

import articleService from './articleService';

fetchMock.enableMocks();

describe('articleService service', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });
  
  it('getArticle', async () => {
    fetch.mockResponseOnce(JSON.stringify({ id: 42 }));
    const article = await articleService.getArticle(42);
    expect(article.id).toEqual(42);
    expect(fetch).toHaveBeenCalledWith('/articles/42');
  });
  
  it('getArticles', async () => {
    fetch.mockResponseOnce(JSON.stringify([{ id: 42 }]));
    const articles = await articleService.getArticles();
    expect(articles.length).toEqual(1);
    expect(fetch).toHaveBeenCalledWith('/articles');
  });
  
  it('addArticle', async () => {
    fetch.mockResponseOnce(JSON.stringify({ id: 42 }));
    const article = await articleService.addArticle({ id: 42 });
    expect(article.id).toEqual(42);
    // expect(fetch).toHaveBeenCalledWith('/articles');
    expect(fetch.mock.calls[0][0]).toEqual('/articles');
    expect(fetch.mock.calls[0][1].method).toEqual('POST');
  });
  
  it('updateArticle', async () => {
    fetch.mockResponseOnce(JSON.stringify({ id: 42 }));
    const article = await articleService.updateArticle({ id: 42 });
    expect(article.id).toEqual(42);
    // expect(fetch).toHaveBeenCalledWith('/articles/42');
    expect(fetch.mock.calls[0][0]).toEqual('/articles/42');
    expect(fetch.mock.calls[0][1].method).toEqual('PUT');
  });
  
  it('removeArticle', async () => {
    fetch.mockResponseOnce(JSON.stringify({}));
    await articleService.removeArticle(42);
    // expect(fetch).toHaveBeenCalledWith('/articles/42');
    expect(fetch.mock.calls[0][0]).toEqual('/articles/42');
    expect(fetch.mock.calls[0][1].method).toEqual('DELETE');
  });
});
