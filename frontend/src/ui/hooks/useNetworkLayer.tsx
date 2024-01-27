import { useMemo } from 'react';
import { usePromiseValue } from './usePromiseValue';

export const useNetworkLayer = () => {
  const networkLayerPromise = useMemo(() => {
    //Handle Wallet connection
    return null;
  }, []);

  return usePromiseValue(networkLayerPromise);
};
