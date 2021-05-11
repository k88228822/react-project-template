import { useEffect, useRef } from 'react';

type Callback<T> = (prev: T | undefined) => void;
interface Config {
  immediate: boolean;
}

function useWatch<T>(
  dep: T,
  callback: Callback<T>,
  config: Config = { immediate: false }
) {
  const { immediate } = config;

  const prev = useRef<T>();
  const inited = useRef(false);
  const stop = useRef(false);

  useEffect(() => {
    if (stop.current) return;

    if (!inited.current) {
      inited.current = true;
      if (immediate) {
        callback(prev.current);
      }
    } else {
      callback(prev.current);
    }
    prev.current = dep;
  }, [dep]);

  return () => {
    stop.current = true;
  };
}

export default useWatch;
