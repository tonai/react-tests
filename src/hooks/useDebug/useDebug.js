import { useRef } from 'react';

export function useDebug(props) {
  const ref = useRef({});
  const diff = [];

  const keys = [];
  for (const i in props) {
    keys.push(i);
    if (!ref.current[i]) {
      diff.push([i, '[UNDEF]', props[i]]);
    } else if (ref.current[i] !== props[i]) {
      diff.push([i, ref.current[i], props[i]]);
    }
  }

  for (const i in ref.current) {
    if (!keys.includes(i)) {
      diff.push([i, ref.current[i], '[UNDEF]']);
    }
  }

  ref.current = props;
  return diff;
}
