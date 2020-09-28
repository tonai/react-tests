import React from 'react';

// Do not import memoized component to benefit from propTypes and defaultProps.
import { ArticleForm } from './ArticleForm';

export default {
  title: 'ArticleForm',
  component: ArticleForm,
  argTypes: {
    onArticleChange: { action: 'onArticleChange' },
    onSubmit: { action: 'onSubmit' },
  }
};

const Template = (args) => (<ArticleForm {...args} />);

export const Default = Template.bind({});
Default.args = {
  article: {
    id: 1,
    title: 'Article 1',
    category: 1,
    published: true,
    content: 'Lorem ipsum dolor sit amet.'
  }
};
