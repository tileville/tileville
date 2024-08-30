import { Network } from "@/constants/network";
import { useNetworkStore } from "@/lib/stores/network";

export function useSwitchNetwork() {
  const networkStore = useNetworkStore();

  const switchNetwork = async (network: Network) => {
    console.log("Switching to network", network);
    try {
      try {
        await (window as any).mina.switchChain({
          networkID: network.networkID,
        });
      } catch (err) {
        console.log("switch chain err", err);
      }
      networkStore.setNetwork(network);
    } catch (e: any) {
      if (e?.code == 1001) {
        await (window as any).mina.requestAccounts();
        await switchNetwork(network);
      }
      throw e;
    }
  };

  return { switchNetwork };
}
