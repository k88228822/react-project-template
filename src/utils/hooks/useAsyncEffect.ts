import { useEffect } from 'react';

export default function useAsyncEffect(
  effect: Function,
  destroy?: Function | any[],
  inputs?: any[]
) {
  useEffect(
    () => {
      let result: any;
      let mounted = true;
      const maybePromise = effect(() => {
        return mounted;
      });

      Promise.resolve(maybePromise).then((value) => {
        result = value;
      });

      return function () {
        mounted = false;
        if (typeof destroy === 'function') {
          destroy(result);
        }
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    typeof destroy === 'function' ? inputs : destroy || []
  );
}
