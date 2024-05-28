export enum ZkNoidGameGenre {
  Arcade = "Arcade",
  BoardGames = "Board games",
  Lucky = "Lucky",
  // ComingSoon = 'Coming soon',
}

export const ALL_GAME_GENRES = [
  ZkNoidGameGenre.Arcade,
  ZkNoidGameGenre.BoardGames,
  ZkNoidGameGenre.Lucky,
  // ZkNoidGameGenre.ComingSoon,
];

export enum ZkNoidGameFeature {
  SinglePlayer = "Single player",
  Multiplayer = "Multiplayer",
  P2P = "P2P",
  Cooperative = "Cooperative",
}

export const ALL_GAME_FEATURES = [
  ZkNoidGameFeature.SinglePlayer,
  ZkNoidGameFeature.Multiplayer,
  ZkNoidGameFeature.P2P,
  ZkNoidGameFeature.Cooperative,
];

export const ALL_GAME_TAGS = [
  {
    name: "Single Player Arcade",
    features: [ZkNoidGameFeature.SinglePlayer],
    genres: [ZkNoidGameGenre.Arcade],
  },
  {
    name: "Multiplayer Arcade",
    features: [ZkNoidGameFeature.Multiplayer],
    genres: [ZkNoidGameGenre.Arcade],
  },
  {
    name: "Single Player Board Games",
    features: [ZkNoidGameFeature.SinglePlayer],
    genres: [ZkNoidGameGenre.BoardGames],
  },
  {
    name: "Multiplayer Board Games",
    features: [ZkNoidGameFeature.Multiplayer],
    genres: [ZkNoidGameGenre.BoardGames],
  },
  {
    name: "Lucky Games",
    features: [],
    genres: [ZkNoidGameGenre.Lucky],
  },
];
