import { NOVU_API_KEY } from "@/constants";
import { Novu } from "@novu/node";

const novu = new Novu(NOVU_API_KEY);

export const addNovuSubscriber = async (
  walletAddress: string,
  data: { username?: string; email?: string; fullname?: string }
) => {
  try {
    console.log({ walletAddress, data });
    await novu.subscribers.identify(walletAddress, data);
  } catch (err) {
    console.warn(
      `Failed to add subscriber for wallet address ${walletAddress} in novu`,
      err
    );
  }
};
