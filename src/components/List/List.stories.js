import React from 'react';

import { List } from './List';

export default {
  title: 'List',
  component: List,
  argTypes: { onRemove: { action: 'onRemove' } }
};

const Template = (args) => (<List {...args} />);

export const Default = Template.bind({});
Default.args = {
  articles: [
    {
      id: 1,
      title: 'Article 1',
      category: 1,
      published: true,
      content: 'Lorem ipsum dolor sit amet.'
    },
    {
      id: 2,
      title: 'Article 2',
      category: 2,
      published: false,
      content: 'Lorem ipsum dolor sit amet.'
    }
  ]
};
