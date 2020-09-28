import React from 'react';

// Do not import memoized component to benefit from propTypes and defaultProps.
import { Title } from './Title';

export default {
  title: 'Title',
  component: Title
};

const Template = (args) => (<Title {...args} />);

export const Default = Template.bind({});
Default.args = {
  title: 'Title',
  linkProps: { children: 'Back', to: '/' }
};
