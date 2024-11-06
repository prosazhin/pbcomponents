import { useCallback, useEffect } from 'react';

export default function useKeydown(keys: string[], callback: () => void) {
  const handleWindowKeyDown = useCallback(
    (e: { key: string }) => {
      if (keys.includes(e.key)) {
        callback();
      }
    },
    [callback],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleWindowKeyDown);

    return () => window.removeEventListener('keydown', handleWindowKeyDown);
  }, [handleWindowKeyDown]);
}
