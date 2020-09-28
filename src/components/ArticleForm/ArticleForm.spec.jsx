import React from 'react';
import { shallow } from 'enzyme';

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

  it('renders without crashing', () => {
    shallow(<ArticleForm />);
  });

  it('should call onArticleChange when the title is updated', () => {
    const onArticleChange = jest.fn();
    const wrapper = shallow(<ArticleForm article={article} categories={categories} onArticleChange={onArticleChange} />);
    wrapper.find('input[name="title"]').simulate('change', {target: {name: 'title', value: 'test'}});
    expect(onArticleChange).toBeCalledWith("title", "test");
  });

  it('should call onArticleChange when the category is updated', () => {
    const onArticleChange = jest.fn();
    const wrapper = shallow(<ArticleForm article={article} categories={categories} onArticleChange={onArticleChange} />);
    wrapper.find('input[name="title"]').simulate('change', {target: {name: 'category', value: '2'}});
    expect(onArticleChange).toBeCalledWith("category", 2);
  });

  it('should call onArticleChange when the title is updated', () => {
    const onArticleChange = jest.fn();
    const wrapper = shallow(<ArticleForm article={article} categories={categories} onArticleChange={onArticleChange} />);
    wrapper.find('input[name="title"]').simulate('change', {target: {name: 'published', checked: false}});
    expect(onArticleChange).toBeCalledWith("published", false);
  });

  it('should call onSubmit when the form is submitted', () => {
    const onSubmit = jest.fn();
    const wrapper = shallow(<ArticleForm article={article} categories={categories} onSubmit={onSubmit} />);
    wrapper.simulate('submit', {preventDefault(){}});
    expect(onSubmit).toBeCalled();
  });
});
