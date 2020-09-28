import React from 'react';

// Do not import memoized component to benefit from propTypes and defaultProps.
import Container from './Container';

export default {
  title: 'Container',
  component: Container
};

const Template = (args) => (<Container {...args} />);

export const Default = Template.bind({});
Default.args = {
  children: 'Lorem ipsum dolor sit amet.',
};
