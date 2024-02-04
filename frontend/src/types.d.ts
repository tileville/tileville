export type Tile = {
  row: number;
  col: number;
  tile_type: TileType;
};

enum TileType {
  Empty,
  WindMill,
  Park,
  Street,
  Center,
  Port,
}

export type PlayerId = {
  player_address: string;
  player_id: number;
};

export type Score = {
  player_id: number,
  game_id: number,
  score: number
}

export type RemainingMoves = {
  player_id: number,
  game_id: number,
  moves: number
}

