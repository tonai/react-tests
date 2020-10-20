import React from 'react';
import { render, screen } from '@testing-library/react';

import Container from './Container';

describe('Container component', () => {
  it('should render children', () => {
    render(<Container><div>Hello world !</div></Container>);
    expect(screen.getByText('Hello world !')).toBeInTheDocument();
  });
});
