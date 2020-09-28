import React from 'react';
import { mount, shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';

import categoryService from '../../services/categoryService/categoryService';

import App from './App';

jest.mock('../../services/articleService/articleService');
jest.mock('../../services/categoryService/categoryService');

describe('App component', () => {
  it('renders without crashing', () => {
    shallow(<App />);
  });

  it('should fetch the categories', async () => {
    jest.spyOn(categoryService, 'getCategories');
    await act(async () => {
      mount(<App />);
    });
    expect(categoryService.getCategories).toBeCalled();
    categoryService.getCategories.mockRestore();
  });
});
