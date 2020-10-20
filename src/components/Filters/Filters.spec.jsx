import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import Categories from '../../contexts/Categories';

import Filters from './Filters';

describe('Filters component', () => {
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
  
  it('should call onFilterChanged when filter changes', () => {
    const onFilterChanged = jest.fn();
    render(<Categories.Provider value={categories}>
      <Filters onFilterChanged={onFilterChanged} />
    </Categories.Provider>);
    fireEvent.click(screen.getByLabelText('Published'));
    expect(onFilterChanged).toBeCalledWith('published', 'published');
  });
});

