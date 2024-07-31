import PersonWaiting from "../../public/lotties/personWaiting.json";
import Failed from "../../public/lotties/failed.json";
import DoneLottie from "../../public/lotties/doneLottie.json";
import TxnConfirmed from "../../public/lotties/txnConfirmed.json";
import confusingLottie from "../../public/lotties/confusingLottie.json";

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
export const NOVU_API_KEY =
  process.env.NEXT_PUBLIC_NOVU_API_KEY || "ed1f7d240a9a31843dc24795660e95d4";
export const NOVU_APP_ID =
  process.env.NEXT_PUBLIC_NOVU_APP_ID || "OJ-4H0k4zMEd";

export const BUG_REPORT_URL = "https://t.me/tilevilleBugs";
export const COMPETITION_SCORE_TWEET_DEFAULT_CONTENT =
  "Just conquered Nicobar with a score of ${score} in @TileVilleSocial 🏆 The strategic city-builder on @MinaProtocol is a must-play. Build your dream city: https://tileville.xyz #TileVille #MinaBlockchain";

export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
export const supabaseServiceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY || "";

export const GAMEPLAY_NOT_ALLOWED_MESSAGES = {
  TRANSACTION_FAILED: {
    title: "Transaction Failed",
    description: "Transaction failed. you are not part of the competition",
    animation: Failed,
  },
  TRANSACTION_PENDING: {
    title: "Transaction is pending.",
    description:
      "We are fetching your participation fee payment transaction details...",
    animation: PersonWaiting,
  },
  GAME_ALREADY_PLAYED: {
    title: "Game is already played",
    description:
      "You have already played the game. Please check your game status in user profile section.",
    animation: DoneLottie,
  },
  TRANSACTION_CONFIRMED: {
    title: "Transaction Confirmed.",
    description:
      "Transactin is confirmed. Please close the modal and click on play button to start playing.",
    animation: TxnConfirmed,
  },
  NONE: {
    title: "Un-Ohh There Might be some issue",
    description:
      "Please use the bug report button from Header if you are not able to play the game.",
    animation: confusingLottie,
  },
};

export const GLOBAL_CONFIG_DEFAULT = {
  nft_mint_start_date: "2024-07-29",
};

export const ACCOUNT_AUTH_MESSAGE =
  "I am authenticating my wallet for TileVille";
export const ACCOUNT_AUTH_LOCALSTORAGE_KEY = "tileville_auth_signature";
export const DEFAULT_TRASURY_ADDRESS =
  "B62qqhL8xfHBpCUTk1Lco2Sq8HitFsDDNJraQG9qCtWwyvxcPADn4EV";
