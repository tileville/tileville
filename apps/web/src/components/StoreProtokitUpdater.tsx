"use client";

import { DefaultRuntimeModules } from "@/lib/runtimeModules";
import { useObserveMinaBalance } from "@/lib/stores/minaBalances";
import { usePollMinaBlockHeight } from "@/lib/stores/minaChain";
import { useNetworkStore } from "@/lib/stores/network";
import { useObserveProtokitBalance } from "@/lib/stores/protokitBalances";
import { usePollProtokitBlockHeight } from "@/lib/stores/protokitChain";
import { buildClient } from "@/lib/utils";
import { useEffect, useMemo } from "react";
import { ClientAppChain } from "tileville-chain-dev";

export default function StoreProtokitUpdater() {
  // const client = useMemo(() => buildClient(DefaultRuntimeModules), []);
  // const networkStore = useNetworkStore();
  usePollMinaBlockHeight();
  // usePollProtokitBlockHeight();
  useObserveMinaBalance();

  // useEffect(() => {
  //   console.log("##### STARTING TILEVILLE PROTOKIT CLIENT 🚀🚀####");
  //   client.start().then(() => networkStore.onProtokitClientStarted());
  // }, [client, networkStore]);

  // useObserveProtokitBalance({
  //   client: client as any as ClientAppChain<
  //     typeof DefaultRuntimeModules,
  //     any,
  //     any,
  //     any
  //   >,
  // });

  return null;
}
