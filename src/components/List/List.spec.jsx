import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import List from './List';
import { MemoryRouter } from 'react-router-dom';

describe('List component', () => {
  const articles = [
    {
      id: 1,
      title: 'Article 1',
      category: 1,
      published: true,
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      id: 2,
      title: 'Article 2',
      category: 2,
      published: true,
      content: 'Donec malesuada enim ac ipsum dictum placerat.'
    },
    {
      id: 3,
      title: 'Article 3',
      category: 1,
      published: false,
      content: 'Phasellus sit amet bibendum augue.'
    }
  ];

  it('should render 3 Article components', async () => {
    render(<MemoryRouter><List articles={articles} /></MemoryRouter>);
    const elements = await screen.findAllByText(/Article/);
    expect(elements.length).toBe(3);
  });
});
