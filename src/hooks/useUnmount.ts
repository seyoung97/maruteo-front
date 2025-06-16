import { useRef } from 'react';

import useEffectOnce from './useEffectOnce';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useUnmount = (fn: () => any): void => {
  const fnRef = useRef(fn);

  fnRef.current = fn;

  useEffectOnce(() => () => fnRef.current());
};

export default useUnmount;
