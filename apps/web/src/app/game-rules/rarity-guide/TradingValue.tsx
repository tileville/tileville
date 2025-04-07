export const TradingValue = () => {
  return (
    <div className="rounded-lg bg-primary/10 p-6">
      <h2 className="mb-4 text-2xl font-bold text-primary">Trading Value</h2>
      <p className="mb-4">
        Rarer NFTs typically carry higher trading value in the marketplace.
        Collectors value unique trait combinations and the gameplay advantages
        they provide.
      </p>
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex-1 rounded bg-white/30 p-4">
          <h3 className="mb-2 font-semibold">Limited Editions</h3>
          <p>
            Some TileVille NFTs are released in limited quantities during
            special events, making them especially valuable regardless of their
            trait rarity.
          </p>
        </div>
        <div className="flex-1 rounded bg-white/30 p-4">
          <h3 className="mb-2 font-semibold">Founder Collections</h3>
          <p>
            Early-release NFTs from our founder series carry historical
            significance and are prized by collectors for their place in
            TileVille history.
          </p>
        </div>
      </div>
    </div>
  );
};
