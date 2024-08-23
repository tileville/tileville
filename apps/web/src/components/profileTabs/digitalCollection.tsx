import { useFetchNFTSAlgolia } from "@/hooks/useFetchNFTSAlgolia";
import { useNetworkStore } from "@/lib/stores/network";

export default function DigitalCollection() {
  const { address } = useNetworkStore();
  const { mintNFTHitsResponse } = useFetchNFTSAlgolia({ owner: address });
  console.log("digital collection", mintNFTHitsResponse);
  return (
    <div className="flex items-center justify-center pt-8">
      <h2 className="text-2xl font-semibold">
        You do not own any Collection right now
      </h2>
    </div>
  );
}
