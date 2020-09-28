import React from 'react';

import { categories } from '../../data/categories';

// Do not import memoized component to benefit from propTypes and defaultProps.
import { Article } from './Article';

const options = Object.fromEntries(categories.map(({ id, title}) => [title, id]));

export default {
  title: 'Article',
  component: Article,
  argTypes: {
    category: {
      control: {
        type: 'select',
        options
      },
    },
    onRemove: { action: 'onRemove', },
  }
};

const Template = (args) => (<Article {...args} />);

export const Default = Template.bind({});
Default.args = {
  category: 1,
  content: 'Lorem ipsum dolor sit amet.',
  id: 1,
  published: true,
  title: 'Article 1',
};
