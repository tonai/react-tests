import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import Categories from '../../contexts/Categories';

import Article from './Article';

describe('Article component', () => {
  const categories = [
    {
      id: 1,
      title: 'News'
    },
    {
      id: 2,
      title: 'Blog post'
    }
  ];

  it('should render the "Published" label', () => {
    render(<Categories.Provider value={categories}>
      <MemoryRouter><Article id={1} published={true} /></MemoryRouter>
    </Categories.Provider>);
    expect(screen.getByText('Published')).toBeInTheDocument();
  });

  it('should render the "Draft" label', () => {
    render(<Categories.Provider value={categories}>
      <MemoryRouter><Article id={1} published={false} /></MemoryRouter>
    </Categories.Provider>);
    expect(screen.getByText('Draft')).toBeInTheDocument();
  });

  it('should render the category title', () => {
    render(<Categories.Provider value={categories}>
      <MemoryRouter><Article category={1} id={1} /></MemoryRouter>
    </Categories.Provider>);
    expect(screen.getByText('News')).toBeInTheDocument();
  });

  it('should call onRemove when the remove button is clicked', () => {
    const onRemove = jest.fn();
    render(<Categories.Provider value={categories}>
      <MemoryRouter><Article category={1} id={1} onRemove={onRemove} /></MemoryRouter>
    </Categories.Provider>);
    fireEvent.click(screen.getByText('remove'));
    expect(onRemove).toBeCalledWith(1);
  });
});
