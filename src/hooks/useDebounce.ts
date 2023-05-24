import { useEffect, useState } from 'react';

function useDebounce(value: string, delay: number) {
  const [useDebounce, setUseDebounce] = useState(value);
  useEffect(() => {
    const idTimeout = setTimeout(() => setUseDebounce(value), delay);
    return () => clearTimeout(idTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return useDebounce;
}

export default useDebounce;
