import { AURO_WALLET_CHROME_STORE_LINK } from "@/constants";
import { ArrowRightIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function WalletSetupPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
          Wallet Setup Guide
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-500">
          Get started with Auro Wallet to play TileVille
        </p>
      </div>

      <div className="mt-12 rounded-lg border border-primary/20 bg-white p-6 shadow-sm">
        <ol className="space-y-8">
          {SETUP_STEPS.map((step, index) => (
            <li key={index} className="relative pl-10">
              <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
                {index + 1}
              </div>
              <h3 className="text-lg font-bold text-primary">{step.title}</h3>
              <p className="mt-2 text-gray-600">{step.description}</p>

              {step.note && (
                <div className="mt-3 flex items-start rounded-md bg-primary/5 p-3">
                  <InfoCircledIcon className="mr-2 mt-1 flex-shrink-0 text-primary" />
                  <p className="text-sm text-gray-600">{step.note}</p>
                </div>
              )}

              {step.action && (
                <a
                  href={step.action.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center text-sm font-medium text-primary hover:underline"
                >
                  {step.action.text}
                  <ArrowRightIcon className="ml-1" />
                </a>
              )}
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-8 rounded-lg bg-primary/10 p-6">
        <h2 className="mb-3 text-lg font-bold text-primary">Common Issues</h2>
        <div className="space-y-4">
          {COMMON_ISSUES.map((issue, index) => (
            <div key={index}>
              <h3 className="font-medium">{issue.question}</h3>
              <p className="mt-1 text-sm text-gray-600">{issue.answer}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/faq"
            className="text-sm font-medium text-primary hover:underline"
          >
            View full FAQ
          </Link>
        </div>
      </div>
    </div>
  );
}

const SETUP_STEPS = [
  {
    title: "Install Auro Wallet",
    description:
      "Install the Auro Wallet extension from the Chrome Web Store. Auro Wallet is the recommended wallet for TileVille as it provides full functionality.",
    action: {
      text: "Download Auro Wallet",
      link: AURO_WALLET_CHROME_STORE_LINK,
    },
  },
  {
    title: "Create or Import a Wallet",
    description:
      "Open the Auro extension and either create a new wallet or import an existing one using your seed phrase. Make sure to securely store your recovery phrase.",
    note: "Never share your seed phrase with anyone, including TileVille team members.",
  },
  {
    title: "Connect to Mainnet",
    description:
      "Ensure your wallet is connected to Mina Mainnet. TileVille operates on the main Mina network, not on testnet.",
    note: "You will need MINA tokens to play certain game modes and mint NFTs.",
  },
  {
    title: "Connect to TileVille",
    description:
      'Visit TileVille and click on the "Connect Wallet" button in the top right corner. Approve the connection request in your Auro Wallet.',
  },
  {
    title: "Verify Your Account",
    description:
      "Sign the verification message to authenticate your wallet. This is required for game participation and NFT transactions.",
  },
];

const COMMON_ISSUES = [
  {
    question: "My wallet is not connecting to TileVille",
    answer:
      "Make sure your Auro Wallet extension is up to date and you have approved the connection request. Try refreshing the page or restarting your browser.",
  },
  {
    question: 'I see a "Pallad wallet is not supported" message',
    answer:
      "TileVille currently supports Auro Wallet only. If you have Pallad Wallet installed, please disable it temporarily while using TileVille.",
  },
  {
    question: "I cannot sign the verification message",
    answer:
      "Ensure you are using the correct wallet address and that you have the latest version of Auro Wallet installed. Try refreshing the page and connecting again.",
  },
];
