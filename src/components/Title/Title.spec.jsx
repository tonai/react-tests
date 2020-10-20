import React from 'react';
import { render, screen } from '@testing-library/react';

import Title from './Title';

describe('Title component', () => {
  it('should render the title', () => {
    render(<Title title="test" />);
    expect(screen.getByText('test')).toBeInTheDocument();
  });
});
