// Function to capture NFT mint event in PostHog
export const captureNFTMintEvent = (
  posthog: any,
  {
    tokenId,
    walletAddress,
    gameId,
    cityScore,
    mintTimestamp,
    tileTypes = {
      trees: 0,
      windmills: 0,
      roads: 0,
      ports: 0,
    },
    tileCoordinates = [],
    transactionHash,
    gasUsed,
    mintPrice,
    competitionId,
  }: {
    tokenId: string;
    walletAddress: string;
    gameId: string;
    cityScore: number;
    mintTimestamp: number;
    tileTypes?: {
      trees: number;
      windmills: number;
      roads: number;
      ports: number;
    };
    tileCoordinates?: Array<{ row: number; col: number; tileType: number }>;
    transactionHash?: string;
    gasUsed?: string;
    mintPrice?: string;
    competitionId?: string;
  }
) => {
  posthog.capture("nft_mint", {
    // NFT specific properties
    distinct_id: walletAddress,
    tokenId,
    gameId,
    cityScore,

    // City composition metrics
    totalTiles: Object.values(tileTypes).reduce((a, b) => a + b, 0),
    treeTiles: tileTypes.trees,
    windmillTiles: tileTypes.windmills,
    roadTiles: tileTypes.roads,
    portTiles: tileTypes.ports,

    // Game details
    competitionId,
    tileCoordinates,

    // Transaction details
    mintTimestamp,
    transactionHash,
    gasUsed,
    mintPrice,

    // Additional metadata
    platform: "TileVille",
    version: "1.0",
    chain: "Mina",
  });
};

// Example usage:
/*
captureNFTMintEvent(posthog, {
  tokenId: 'tv-123',
  walletAddress: 'B62qrMJvdEiZksNtqGpMbYLGr9gtPx8zrGHhArex2ka9fzRL89XcsRD',
  gameId: 'game-456',
  cityScore: 85,
  mintTimestamp: Date.now(),
  tileTypes: {
    trees: 12,
    windmills: 5,
    roads: 8,
    ports: 2
  },
  tileCoordinates: [
    {row: 1, col: 1, tileType: 2}, // tree
    {row: 1, col: 2, tileType: 1}, // windmill
    // ... more tile coordinates
  ],
  transactionHash: '0x123...abc',
  gasUsed: '21000',
  mintPrice: '1.5',
  competitionId: 'comp-789'
});
*/
