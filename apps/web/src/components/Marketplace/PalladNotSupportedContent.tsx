import { AURO_WALLET_CHROME_STORE_LINK } from "@/constants";

export const PalladNotSupportedContent = () => {
  return (
    <div className="max-w-md">
      <p className="mb-2 font-bold">
        Pallad wallet is not supported yet. Please use Auro wallet instead.
      </p>
      <ol className="mb-2 list-inside list-decimal text-sm">
        <li>
          Open a new tab and go to{" "}
          <span className="rounded bg-gray-200 px-1 font-mono">
            chrome://extensions
          </span>
        </li>
        <li>Find &quot;Pallad Wallet&quot; in your list of extensions</li>
        <li>Toggle the switch to disable it</li>
      </ol>
      <div className="mt-2 text-sm">
        <a
          href={AURO_WALLET_CHROME_STORE_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Get Auro Wallet
        </a>
      </div>
    </div>
  );
};
