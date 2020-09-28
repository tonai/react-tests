import React from 'react';
import { mount } from 'enzyme';

import Categories from '../../contexts/Categories';

import Filters from './Filters';

describe('Filters component', () => {
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
    mount(<Filters />);
  });

  it('should call onFilterChanged when title changes', () => {
    const onFilterChanged = jest.fn();
    const wrapper = mount(<Filters onFilterChanged={onFilterChanged} />);
    const input = wrapper.find('input[name="title"]');
    input.simulate('change', {target: {name: 'title', value: 'test'}});
    expect(onFilterChanged).toBeCalledWith('title', 'test');
  });

  it('should call onFilterChanged when category changes', () => {
    const onFilterChanged = jest.fn();
    const wrapper = mount((
      <Categories.Provider value={categories}>
        <Filters onFilterChanged={onFilterChanged} />
      </Categories.Provider>
    ));
    const select = wrapper.find('select');
    select.instance().value = '1';
    select.simulate('change');
    expect(onFilterChanged).toBeCalledWith('category', '1');
  });
});
