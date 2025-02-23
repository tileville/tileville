import { NextRequest } from "next/server";
import { BLOCKBERRY_API_KEY, BLOCKBERRY_MAINNET_BASE_URL } from "@/constants";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const wallet_address = searchParams.get("wallet_address") || "";
  if (!wallet_address) {
    return Response.json({ success: false }, { status: 400 });
  }
  try {
    console.log({ wallet_address });
    const zkAppTxsPromise = getZkAppTxsFromBlockberry(wallet_address);
    const paymentTxs = getPaymentTxsFromBlockberry(wallet_address);

    const paymentNonce = (await paymentTxs)?.data[0]?.nonce ?? -1;
    let zkNonce = -1;
    let found = false;
    const zkAppTxs = await zkAppTxsPromise;
    const size = zkAppTxs?.data?.length ?? 0;
    let i = 0;
    while (!found && i < size) {
      if (zkAppTxs?.data[i]?.proverAddress === wallet_address) {
        zkNonce = zkAppTxs?.data[i]?.nonce;
        found = true;
      }
      i++;
    }
    const nonce = Math.max(zkNonce, paymentNonce);
    console.log("nonce", { zkNonce, paymentNonce, nonce });

    return Response.json({ success: true, nonce: nonce + 1 }, { status: 200 });
  } catch (error: any) {
    return Response.json(
      { success: false, message: error.toString() },
      { status: 500 }
    );
  }
}

async function getZkAppTxsFromBlockberry(wallet_address: string) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-api-key": BLOCKBERRY_API_KEY,
    },
  };
  try {
    const response = await fetch(
      `${BLOCKBERRY_MAINNET_BASE_URL}/v1/zkapps/accounts/${wallet_address}/txs?size=10&orderBy=DESC&sortBy=AGE`,
      options
    );
    const result = await response.json();
    //console.log("zkAppTxs", result);
    return result;
  } catch (err) {
    console.error(err);
    return undefined;
  }
}

async function getPaymentTxsFromBlockberry(wallet_address: string) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-api-key": BLOCKBERRY_API_KEY,
    },
  };

  try {
    const response = await fetch(
      `${BLOCKBERRY_MAINNET_BASE_URL}/v1/accounts/${wallet_address}/txs?page=0&size=1&orderBy=DESC&sortBy=AGE&direction=OUT`,
      options
    );
    const result = await response.json();
    return result;
  } catch (err) {
    console.error(err);
    return undefined;
  }
}
