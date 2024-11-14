import { useEffect } from 'react';

export default function useDebounce(value: boolean, delay: number = 400, callback: () => void) {
  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;

    if (value) {
      timeout = setTimeout(() => {
        callback();
      }, delay);
    } else {
      if (timeout) {
        clearTimeout(timeout);
      }
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [value, delay]);
}
