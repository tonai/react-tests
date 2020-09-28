import React from 'react';
import { mount, shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';

import articleService from '../../services/articleService/articleService';

import List from '../List/List';
import Filters from '../Filters/Filters';

import ArticlesPage from './ArticlesPage';

jest.mock('../../services/articleService/articleService');

describe('ArticlesPage component', () => {
  it('renders without crashing', () => {
    shallow(<ArticlesPage />);
  });

  it('should fetch the articles', async () => {
    jest.spyOn(articleService, 'getArticles');
    await act(async () => {
      mount(<MemoryRouter><ArticlesPage /></MemoryRouter>);
    });
    expect(articleService.getArticles).toBeCalled();
    articleService.getArticles.mockClear();
  });

  it('should update the state with the articles', async () => {
    let wrapper;
    await act(async () => {
      wrapper = await mount(<MemoryRouter><ArticlesPage /></MemoryRouter>);
    });
    await wrapper.update();
    expect(wrapper.find(List).prop('articles').length).toEqual(3);
  });

  it('should filter on the title', async () => {
    let wrapper;
    await act(async () => {
      wrapper = await mount(<MemoryRouter><ArticlesPage /></MemoryRouter>);
    });
    await wrapper.update();
    await act(async () => {
      wrapper.find(Filters).prop('onFilterChanged')('title', 'Article 1');
    });
    await wrapper.update();
    expect(wrapper.find(List).prop('articles').length).toEqual(1);
  });

  it('should filter on the category', async () => {
    let wrapper;
    await act(async () => {
      wrapper = await mount(<MemoryRouter><ArticlesPage /></MemoryRouter>);
    });
    await wrapper.update();
    await act(async () => {
      wrapper.find(Filters).prop('onFilterChanged')('category', '1');
    });
    await wrapper.update();
    expect(wrapper.find(List).prop('articles').length).toEqual(2);
  });

  it('should filter on the "Published" status', async () => {
    let wrapper;
    await act(async () => {
      wrapper = await mount(<MemoryRouter><ArticlesPage /></MemoryRouter>);
    });
    await wrapper.update();
    await act(async () => {
      wrapper.find(Filters).prop('onFilterChanged')('published', 'published');
    });
    await wrapper.update();
    expect(wrapper.find(List).prop('articles').length).toEqual(2);
  });

  it('should filter on the "Draft" status', async () => {
    let wrapper;
    await act(async () => {
      wrapper = await mount(<MemoryRouter><ArticlesPage /></MemoryRouter>);
    });
    await wrapper.update();
    await act(async () => {
      wrapper.find(Filters).prop('onFilterChanged')('published', 'draft');
    });
    await wrapper.update();
    expect(wrapper.find(List).prop('articles').length).toEqual(1);
  });

  it('should remove the article', async () => {
    let wrapper;
    await act(async () => {
      wrapper = await mount(<MemoryRouter><ArticlesPage /></MemoryRouter>);
    });
    await wrapper.update();
    await act(async () => {
      wrapper.find(List).prop('onRemove')(2);
    });
    await wrapper.update();
    expect(wrapper.find(List).prop('articles').length).toEqual(2);
  });
});
