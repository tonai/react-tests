import React from 'react';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import Categories from '../../contexts/Categories';

import Article from './Article';

describe('Article component', () => {
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
    shallow(<Article id={1} />);
  });

  it('should render the "Published" label', () => {
    const wrapper = shallow(<Article id={1} published={true} />);
    expect(wrapper.find('.Article__cell').at(2).text()).toEqual('Published');
  });

  it('should render the "Draft" label', () => {
    const wrapper = shallow(<Article id={1} published={false} />);
    expect(wrapper.find('.Article__cell').at(2).text()).toEqual('Draft');
  });

  it('should render the category title', () => {
    const wrapper = mount((
      <Categories.Provider value={categories}>
        <MemoryRouter>
          <Article category={1} id={1} />
        </MemoryRouter>
      </Categories.Provider>
    ));
    expect(wrapper.find('.Article__cell').at(1).text()).toEqual('News');
  });

  it('should select an article when clicked', async () => {
    const onArticleToggled = jest.fn();
    const wrapper = mount(<MemoryRouter><Article id={1} onArticleToggled={onArticleToggled} /></MemoryRouter>);
    const element = wrapper.find('.Article');
    element.simulate('click');
    await wrapper.update();
    expect(wrapper.find('.Article').hasClass('isSelected')).toEqual(true);
  });

  it('should call onRemove when the remove button is clicked', () => {
    const onRemove = jest.fn();
    const wrapper = shallow(<Article id={1} onRemove={onRemove} />);
    wrapper.find('.Article__link').last().simulate('click', {preventDefault() {}});
    expect(onRemove).toBeCalledWith(1);
  });
});
