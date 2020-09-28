import { renderHook } from '@testing-library/react-hooks';

import { useCategories } from './useCategories';

jest.mock('../../services/categoryService/categoryService');

describe('useCategories hook', () => {
  it('loads the categories', async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => useCategories()
    );
    expect(result.current.length).toEqual(0);
    await waitForNextUpdate();
    expect(result.current.length).not.toEqual(0);
  });
});

