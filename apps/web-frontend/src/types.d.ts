export type Tile = {
  row: number;
  col: number;
  tile_type: TileType;
};

export type PlayerId = {
  player_address: string;
  player_id: number;
};

export type Score = {
  player_id: number;
  game_id: number;
  score: number;
};

export type RemainingMoves = {
  player_id: number;
  game_id: number;
  moves: number;
};

export type Network = {
  chainId: number;
  name: string;
};

type ChainType = {
  chainId: number;
  chainName: string;
};
