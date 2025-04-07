import { TradingValue } from "./TradingValue";

export default function RarityGuidePage() {
  return (
    <div className="mx-auto max-w-[1200px] p-6 pt-20">
      <h1 className="mb-8 text-3xl font-extrabold text-primary">
        NFT Rarity Guide
      </h1>

      <div className="mb-8">
        <p className="mb-4 text-lg">
          Understanding the rarity of your TileVille NFTs helps you assess their
          uniqueness and value. Our NFTs feature different tiers of rarity that
          influence their attributes and in-game benefits.
        </p>
      </div>

      <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="rounded-lg bg-primary/10 p-6">
          <h2 className="mb-3 text-2xl font-bold text-primary">Rarity Tiers</h2>
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <span className="h-4 w-4 rounded-full bg-[#CD7F32]"></span>
              <span className="font-semibold">Bronze</span> - Common attributes,
              35% of collection
            </li>
            <li className="flex items-center gap-2">
              <span className="h-4 w-4 rounded-full bg-[#C0C0C0]"></span>
              <span className="font-semibold">Silver</span> - Uncommon
              attributes, 25% of collection
            </li>
            <li className="flex items-center gap-2">
              <span className="h-4 w-4 rounded-full bg-[#FFD700]"></span>
              <span className="font-semibold">Gold</span> - Rare attributes, 15%
              of collection
            </li>
            <li className="flex items-center gap-2">
              <span className="h-4 w-4 rounded-full bg-[#E5E4E2]"></span>
              <span className="font-semibold">Platinum</span> - Very rare
              attributes, 5% of collection
            </li>
            <li className="flex items-center gap-2">
              <span className="h-4 w-4 rounded-full bg-[#B9F2FF]"></span>
              <span className="font-semibold">Diamond</span> - Extremely rare
              attributes, 1% of collection
            </li>
          </ul>
        </div>

        <div className="rounded-lg bg-primary/10 p-6">
          <h2 className="mb-3 text-2xl font-bold text-primary">
            Determining Rarity
          </h2>
          <p className="mb-3">
            The rarity of your NFT is determined by several factors:
          </p>
          <ul className="list-inside list-disc space-y-2">
            <li>Trait combinations</li>
            <li>Attribute percentages</li>
            <li>Minting date</li>
            <li>Special abilities</li>
            <li>Environmental affinities</li>
          </ul>
          <p className="mt-3">
            The rarer your NFT, the more unique abilities and bonuses it
            provides in the TileVille ecosystem.
          </p>
        </div>
      </div>

      <div className="mb-12 rounded-lg bg-primary/10 p-6">
        <h2 className="mb-4 text-2xl font-bold text-primary">
          In-Game Benefits by Rarity
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div>
            <h3 className="mb-2 text-xl font-semibold">Bronze & Silver</h3>
            <ul className="list-inside list-disc space-y-1">
              <li>Basic resource bonuses</li>
              <li>Standard building capabilities</li>
              <li>Access to common game features</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-2 text-xl font-semibold">Gold & Platinum</h3>
            <ul className="list-inside list-disc space-y-1">
              <li>Enhanced resource generation</li>
              <li>Unique building designs</li>
              <li>Special city development bonuses</li>
              <li>Participation in exclusive events</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-2 text-xl font-semibold">Diamond</h3>
            <ul className="list-inside list-disc space-y-1">
              <li>Maximum resource production</li>
              <li>Exclusive building capabilities</li>
              <li>Significant gameplay advantages</li>
              <li>Access to limited special events</li>
              <li>Unique visual effects in-game</li>
            </ul>
          </div>
        </div>
      </div>

      <TradingValue />
    </div>
  );
}
