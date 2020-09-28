import fetchMock from "jest-fetch-mock";

import categoryService from './categoryService';

fetchMock.enableMocks();

describe('categoryService service', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });
  
  it('getCategories', async () => {
    fetch.mockResponseOnce(JSON.stringify([{ id: 42 }]));
    const categories = await categoryService.getCategories();
    expect(categories.length).toEqual(1);
    expect(fetch).toHaveBeenCalledWith('/categories');
  });
});
