import React from 'react';
import { shallow } from 'enzyme';

import Container from './Container';

describe('Container component', () => {
  it('renders without crashing', () => {
    shallow(<Container />);
  });

  it('should render no child', () => {
    const wrapper = shallow(<Container></Container>);
    expect(wrapper.children().length).toEqual(0);
  });

  it('should render children', () => {
    const wrapper = shallow(<Container><div>Hello world !</div></Container>);
    expect(wrapper.children().length).toEqual(1);
  });
});
