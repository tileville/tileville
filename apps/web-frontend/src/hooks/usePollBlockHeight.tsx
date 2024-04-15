import { useEffect, useState } from "react";
import { useChainStore } from "./useChainStore";

export const tickInterval = 1000;

export const usePollBlockHeight = () => {
  const [tick, setTick] = useState(0);
  const chain = useChainStore();

  useEffect(() => {
    chain.loadBlock();
  }, [tick]);

  useEffect(() => {
    const intervalId = setInterval(
      () => setTick((tick) => tick + 1),
      tickInterval
    );
    setTick((tick) => tick + 1);
    return () => clearInterval(intervalId);
  }, []);
};
