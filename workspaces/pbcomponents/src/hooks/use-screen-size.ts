import { useEffect, useState } from 'react';

export default function useScreenSize() {
  const [size, setSize] = useState(() => {
    if (typeof window === 'undefined') {
      return { width: 0, height: 0 };
    }

    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      const nextSize = {
        width: window.innerWidth,
        height: window.innerHeight,
      };

      setSize((prevSize) => (prevSize.width === nextSize.width && prevSize.height === nextSize.height ? prevSize : nextSize));
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return size;
}
