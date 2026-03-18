import { useEffect, useRef } from 'react';

export default function useKeydown({
  keys,
  callback,
  shouldHandleWhenDefaultPrevented = false,
}: {
  keys: string[];
  callback: (event: KeyboardEvent) => void;
  shouldHandleWhenDefaultPrevented?: boolean;
}) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  const keysRef = useRef<Set<string>>(new Set(keys));
  keysRef.current = new Set(keys);

  const shouldHandleWhenDefaultPreventedRef = useRef(shouldHandleWhenDefaultPrevented);
  shouldHandleWhenDefaultPreventedRef.current = shouldHandleWhenDefaultPrevented;

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleWindowKeyDown = (event: KeyboardEvent) => {
      if (!keysRef.current.has(event.key)) return;
      if (event.defaultPrevented && !shouldHandleWhenDefaultPreventedRef.current) return;
      callbackRef.current(event);
    };

    window.addEventListener('keydown', handleWindowKeyDown);

    return () => window.removeEventListener('keydown', handleWindowKeyDown);
  }, []);
}
