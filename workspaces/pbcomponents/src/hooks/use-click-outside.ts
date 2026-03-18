import { useEffect, useRef } from 'react';

const events = [`mousedown`, `touchstart`] as const;

export default function useClickOutside<T extends HTMLElement>({
  refs,
  callback,
}: {
  refs: { readonly current: T | null }[];
  callback: (event?: MouseEvent | TouchEvent) => void;
}) {
  const refsRef = useRef(refs);
  refsRef.current = refs;

  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const onClick = (event: MouseEvent | TouchEvent) => {
      const path = typeof event.composedPath === 'function' ? event.composedPath() : [];

      const isOutside = refsRef.current.every((ref) => {
        const node = ref.current;
        if (!node) return true;
        if (path.length) return !path.includes(node);

        return !node.contains(event.target as Node);
      });

      if (isOutside) {
        callbackRef.current(event);
      }
    };

    events.forEach((event) => document.addEventListener(event, onClick));

    return () => {
      events.forEach((event) => document.removeEventListener(event, onClick));
    };
  }, []);
}
