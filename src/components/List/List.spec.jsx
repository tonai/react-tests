import React from 'react';
import { shallow } from 'enzyme';

import List from './List';
import Article from '../Article/Article';

describe('List component', () => {
  const articles = [
    {
      id: 1,
      title: 'Article 1',
      category: 1,
      published: true,
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      id: 2,
      title: 'Article 2',
      category: 2,
      published: true,
      content: 'Donec malesuada enim ac ipsum dictum placerat.'
    },
    {
      id: 3,
      title: 'Article 3',
      category: 1,
      published: false,
      content: 'Phasellus sit amet bibendum augue.'
    }
  ];

  it('renders without crashing', () => {
    shallow(<List />);
  });

  it('should render 3 Article components', () => {
    const wrapper = shallow(<List articles={articles} />);
    expect(wrapper.find(Article).length).toEqual(3);
  });
});
