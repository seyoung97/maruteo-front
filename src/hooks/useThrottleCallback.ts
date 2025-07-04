import { useMemo, useRef } from 'react';

import { type DebouncedFunc, throttle } from 'lodash-es';

const useThrottleCallback = <T extends unknown[]>(cb: (...args: T) => void, delay = 300) => {
  const cbRef = useRef(cb);
  cbRef.current = cb;

  return useMemo(
    () =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      throttle((...args: any) => cbRef.current(...args), delay, {
        leading: true,
        trailing: false,
      }),
    [delay],
  ) as DebouncedFunc<(...args: T) => void>;
};

export default useThrottleCallback;
