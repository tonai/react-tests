import React from 'react';
import { shallow } from 'enzyme';

import Title from './Title';

describe('Title component', () => {
  it('renders without crashing', () => {
    shallow(<Title title="test" />);
  });

  it('should render the title', () => {
    const wrapper = shallow(<Title title="test" />);
    expect(wrapper.find('.Title__title').text()).toEqual('test');
  });
});
