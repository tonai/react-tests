import { renderHook } from '@testing-library/react-hooks';

import { useDebug } from './useDebug';

describe('useDebug hook', () => {
  it('props added', async () => {
    const { result } = renderHook(
      (props) => useDebug(props),
      {
        initialProps: { id: 1 },
      }
    );
    expect(result.current[0]).toEqual(['id', '[UNDEF]', 1]);
  });

  it('props updated', async () => {
    const { rerender, result } = renderHook(
      (props) => useDebug(props),
      {
        initialProps: { id: 1 },
      }
    );
    rerender({ id: 42 });
    expect(result.current[0]).toEqual(['id', 1, 42]);
  });

  it('props removed', async () => {
    const { rerender, result } = renderHook(
      (props) => useDebug(props),
      {
        initialProps: { id: 1 },
      }
    );
    rerender({});
    expect(result.current[0]).toEqual(['id', 1, '[UNDEF]']);
  });
});

