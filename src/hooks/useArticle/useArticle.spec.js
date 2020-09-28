import { act, renderHook } from '@testing-library/react-hooks';

import { useArticle } from './useArticle';

jest.mock('../../services/articleService/articleService');

describe('useArticle hook', () => {
  it('loads the article', async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => useArticle(1)
    );
    expect(result.current[0].id).toEqual(undefined);
    await waitForNextUpdate();
    expect(result.current[0].id).not.toEqual(undefined);
  });

  it('updates the article', async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => useArticle(1)
    );
    await waitForNextUpdate();
    act(() => result.current[1]({ id: 42 }));
    expect(result.current[0].id).toEqual(42);
  });
});

