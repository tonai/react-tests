import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { addDecorator } from '@storybook/react';

import Categories from '../src/contexts/Categories';
import { categories } from '../src/data/categories';


const withAppProvider = (Story, context) => (
  <Categories.Provider value={categories}>
    <MemoryRouter>
      <Story {...context} />
    </MemoryRouter>
  </Categories.Provider>
);

addDecorator(withAppProvider);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: { expanded: true },
};
