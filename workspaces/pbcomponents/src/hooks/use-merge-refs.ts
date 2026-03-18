import { Ref, RefCallback, RefObject, useCallback, useRef } from 'react';

export default function useMergeRefs<T>(...refs: (Ref<T> | undefined)[]): RefCallback<T> {
  const refsRef = useRef(refs);
  refsRef.current = refs;

  return useCallback((value: T | null) => {
    refsRef.current.forEach((ref) => {
      if (!ref) return;

      if (typeof ref === 'function') {
        ref(value);
      } else {
        (ref as RefObject<T | null>).current = value;
      }
    });
  }, []);
}
