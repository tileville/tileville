"use client";
import { useCallback, useEffect, useMemo } from "react";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import ZknoidWorkerClient from "@/worker/zknoidWorkerClient";

export interface ClientState {
  status: string;
  client?: ZknoidWorkerClient;
  start: () => Promise<ZknoidWorkerClient>;
}

export const useWorkerClientStore = create<
  ClientState,
  [["zustand/immer", never]]
>(
  immer((set) => ({
    status: "Not loaded",
    async start() {
      set((state) => {
        state.status = "Loading worker";
      });

      const zkappWorkerClient = new ZknoidWorkerClient();

      await zkappWorkerClient.waitFor();

      set((state) => {
        state.status = "Loading contracts";
      });

      await zkappWorkerClient.loadContracts();

      set((state) => {
        state.status = "Compiling contracts";
      });

      // await zkappWorkerClient.compileContracts();

      set((state) => {
        state.status = "Initializing zkapp";
      });

      await zkappWorkerClient.initZkappInstance(
        "B62qjTmjVvvXnYCWSiEc1eVAz8vWVzJUK4xtBu7oq5ZuNT7aqAnAVub"
      );

      set((state) => {
        state.status = "Initialized";
        state.client = zkappWorkerClient;
      });

      return zkappWorkerClient;
    },
  }))
);

export const useRegisterWorkerClient = () => {
  const workerClientStore = useWorkerClientStore();

  useEffect(() => {
    if (workerClientStore.status == "Not loaded") workerClientStore.start();
  }, []);
};
