import React from 'react';

import { Filters } from './Filters';

export default {
  title: 'Filters',
  component: Filters,
  argTypes: { onFilterChanged: { action: 'onFilterChanged' } }
};

const Template = (args) => (<Filters {...args} />);

export const Default = Template.bind({});
Default.args = {
  filters: {
    title: 'Article 1',
    category: '1',
    published: 'published'
  }
};
