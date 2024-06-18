export const MINA_DENOM = 1e9;
export const TREASURY_ADDRESS =
  "B62qqhL8xfHBpCUTk1Lco2Sq8HitFsDDNJraQG9qCtWwyvxcPADn4EV";
export const FAUCET_URL = "https://faucet.minaprotocol.com/";
export const GAME_ENTRY_FEE_KEY = "is_entry_fee_paid";
export const GITHUB_URL = "https://github.com/satyambnsal/minapolis";
export const GAME_TUTORIAL_VIDEO_URL = "https://youtu.be/rUd880VHHT0";
export const MY_GITHUB_URL = "https://github.com/satyambnsal";
export const FEEDBACK_FORM_URL = "https://forms.gle/PyPU67YmDvQvZ7HF9";
export const ZKIGNITE_PROPOSAL =
  "https://zkignite.minaprotocol.com/zkignite/zkapp-cohort-3/funding/suggestion/655";
export const GAME_ROADMAP_URL =
  "https://docs.google.com/document/d/1Bvf_EVjZbPQ7mXUFMmxeZlGfzzd78Bn6Cf1DgZIuquA/edit#heading=h.lq3c7p71mqq7";

export const SEQUENCER_GRAPHQL_URL =
  process.env.NEXT_PUBLIC_SEQUENCER_GRAPHQL_URL ||
  "http://localhost:8080/graphql";

export enum Currency {
  MINA = "$MINA",
  ZNAKES = "$znakes",
}

export const ROUND_PRICE = 0;
export const BRIDGE_ADDR =
  "B62qkh5QbigkTTXF464h5k6GW76SHL7wejUbKxKy5vZ9qr9dEcowe6G";

export const BLOCKBERRY_MAINNET_BASE_URL =
  "https://api.blockberry.one/mina-mainnet";

export const BLOCKBERRY_API_KEY =
  process.env.NEXT_PUBLIC_BLOCKBERRY_API_KEY ||
  "DVz3toZ3FiqrwSakq7EwiA0wZ6HCYb";

export const POSTHOG_TOKEN =
  process.env.NEXT_PUBLIC_POSTHOG_TOKEN ||
  "phc_JosSJyx52qurZc76Tbf9qrnokKRvcL7oZE7aQAifoNH";
export const POSTHOG_URI =
  process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

export const isMockEnv = process.env.NEXT_PUBLIC_IS_MOCK_ENV || false;
