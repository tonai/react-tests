import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import ArticlesPage from './ArticlesPage';

jest.mock('../../services/articleService/articleService');
jest.mock('../../services/categoryService/categoryService');

describe('App component', () => {
  it('renders without crashing', async () => {
    render(<MemoryRouter><ArticlesPage /></MemoryRouter>);
    const elements = await screen.findAllByText(/Article [0-9]/);
    expect(elements.length).toBe(3);
  });

  it('filters the articles', async () => {
    render(<MemoryRouter><ArticlesPage /></MemoryRouter>);
    fireEvent.click(screen.getByLabelText('Published'));
    const elements = await screen.findAllByText(/Article [0-9]/);
    expect(elements.length).toBe(2);
  });

  it('removes one article', async () => {
    await act(async () => {
      await render(<MemoryRouter><ArticlesPage /></MemoryRouter>);
    });
    fireEvent.click(screen.getAllByText('remove')[0]);
    waitFor(async () => {
      const elements = await screen.findAllByText(/Article [0-9]/);
      expect(elements.length).toBe(2);
    });
  });
});
