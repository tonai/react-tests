import React from 'react';
import { mount, shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { MemoryRouter, Redirect } from 'react-router-dom';

import articleService from '../../services/articleService/articleService';

import ArticleForm from '../ArticleForm/ArticleForm';

import ArticlePage from './ArticlePage';

jest.mock('../../services/articleService/articleService');

describe('ArticlePage component', () => {
  beforeEach(() => {
    jest.spyOn(articleService, 'getArticle');
  });

  afterEach(() => {
    articleService.getArticle.mockClear();
  });

  it('renders without crashing', () => {
    shallow(<ArticlePage />);
  });

  it('should not fetch the article (Add mode)', async () => {
    await act(async () => {
      mount(<MemoryRouter><ArticlePage /></MemoryRouter>);
    });
    expect(articleService.getArticle).not.toBeCalled();
  });

  it('should fetch the article (Edit mode)', async () => {
    let wrapper;
    await act(async () => {
      wrapper = mount(<MemoryRouter><ArticlePage articleId={1} /></MemoryRouter>);
    });
    await wrapper.update();
    expect(articleService.getArticle).toBeCalledWith(1);
    expect(wrapper.find(ArticleForm).prop('article')).toEqual({
      id: 1,
      title: 'Article 1',
      category: 1,
      published: true,
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    });
  });

  it('should update the article', async () => {
    let wrapper;
    await act(async () => {
      wrapper = mount(<MemoryRouter><ArticlePage articleId={1} /></MemoryRouter>);
    });
    await wrapper.update();
    await act(async () => {
      wrapper.find(ArticleForm).prop('onArticleChange')('title', 'test');
    });
    await wrapper.update();
    expect(wrapper.find(ArticleForm).prop('article')).toEqual({
      id: 1,
      title: 'test',
      category: 1,
      published: true,
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    });
  });

  it('should call the "updateArticle" method of the article service', async () => {
    jest.spyOn(articleService, 'updateArticle');
    const wrapper = await shallow(<ArticlePage articleId={1} />);
    await wrapper.update();
    const articleFormWrapper = wrapper.find(ArticleForm);
    articleFormWrapper.prop('onSubmit')();
    expect(articleService.updateArticle).toBeCalled();
    articleService.updateArticle.mockClear();
  });

  it('should call the "addArticle" method of the article service', async () => {
    jest.spyOn(articleService, 'addArticle');
    const wrapper = await shallow(<ArticlePage />);
    wrapper.find(ArticleForm).prop('onSubmit')();
    await wrapper.update();
    expect(articleService.addArticle).toBeCalled();
    articleService.addArticle.mockClear();
  });

  it('should redirect after adding a new article', async () => {
    const wrapper = await shallow(<ArticlePage />);
    wrapper.find(ArticleForm).prop('onSubmit')();
    await wrapper.update();
    expect(wrapper.find(Redirect).length).toEqual(1);
  });
});
