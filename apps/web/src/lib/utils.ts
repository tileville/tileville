import { type RuntimeModulesRecord } from "@proto-kit/module";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { GameRecordProof, client } from "tileville-chain-dev";
import { dummyProofBase64 } from "@/constants/dummyProofBase64";
import { PublicKey } from "o1js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const dummy = await GameRecordProof.fromJSON({
  publicInput: [],
  publicOutput: [""],
  maxProofsVerified: 2,
  proof: dummyProofBase64,
});

export function mockProof<O, P>(
  publicOutput: O,
  ProofType: new ({
    proof,
    publicInput,
    publicOutput,
    maxProofsVerified,
  }: {
    proof: unknown;
    publicInput: any;
    publicOutput: any;
    maxProofsVerified: 0 | 2 | 1;
  }) => P
): P {
  return new ProofType({
    proof: dummy.proof,
    maxProofsVerified: 2,
    publicInput: undefined,
    publicOutput,
  });
}

export function buildClient<
  RuntimeModules extends RuntimeModulesRecord = RuntimeModulesRecord
>(modules: RuntimeModules) {
  // const client = ClientAppChain.fromRuntime(modules);

  // client.configurePartial({
  //   Runtime: {
  //     ArkanoidGameHub: {},
  //     Balances: {},
  //     RandzuLogic: {},
  //     ThimblerigLogic: {},
  //   } as ModulesConfig<typeof modules>,
  // });

  // client.configurePartial({
  //   GraphqlClient: {
  //     url:
  //       process.env.NEXT_PUBLIC_PROTOKIT_URL || 'http://127.0.0.1:8080/graphql',
  //   },
  // });

  return client;
}

export const formatPubkey = (pubkey: PublicKey | undefined) =>
  pubkey ? pubkey.toBase58().slice(0, 16) + "..." : "None";

export const getShareScoreTwitterContent = (content: string, score: number) =>
  `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `${replaceTemplateVariables(content, { score })}`
  )}`;

export const formatBalance = (balance: bigint) => {
  // return (Number(balance ?? 0n) / 10 ** 9).toFixed(2);
  return "1000";
};

const replaceTemplateVariables = (
  template: string,
  variables: { [key: string]: any }
): string => {
  return template.replace(/\$\{(\w+)\}/g, (match, key) => {
    return variables.hasOwnProperty(key) ? variables[key] : match;
  });
};

export const sanitizeString = (str: string) => {
  if (typeof str !== "string") return str;
  str = str.trim();

  str = str.replace(/^"(.*)"$/, "$1");

  str = str.replace(/\s+/g, " ");

  str = str.replace(/[<>]/g, ""); // Remove < and >
  str = str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/\//g, "&#x2F;");

  return str;
};

export const getDateDifference = (date1: string, date2: string) => {
  const time1 = new Date(date1);
  const time2 = new Date(date2);

  const differenceMs = time2.getTime() - time1.getTime();
  const days = Math.floor(differenceMs / (1000 * 60 * 60 * 24));
  const hours = Math.round(
    (differenceMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  let result = "";
  if (days > 0) {
    result += `${days} day${days !== 1 ? "s" : ""}`;
  }
  if (hours > 0) {
    if (result) result += " and ";
    result += `${hours} hour${hours !== 1 ? "s" : ""}`;
  }

  return result || "0 hours";
};
