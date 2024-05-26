export const MAX_TILES = 11;
export const TRIHEX_DECK_SIZE = 25;
export const GRID_SIZE = 5;
import { TokenId, UInt64 } from 'o1js';

export const allShapes: {
  [key: string]: {
    ro: number;
    co: number;
  }[];
} = {
  a: [
    { ro: 0, co: 0 },
    { ro: 1, co: -1 },
    { ro: 1, co: 0 },
  ],
  v: [
    { ro: 0, co: 0 },
    { ro: 0, co: 1 },
    { ro: 1, co: 0 },
  ],
  '\\': [
    { ro: -1, co: 0 },
    { ro: 0, co: 0 },
    { ro: 1, co: 0 },
  ],
  '-': [
    { ro: 0, co: -1 },
    { ro: 0, co: 0 },
    { ro: 0, co: 1 },
  ],
  '/': [
    { ro: -1, co: 1 },
    { ro: 0, co: 0 },
    { ro: 1, co: -1 },
  ],
  c: [
    { ro: -1, co: 1 },
    { ro: 0, co: 0 },
    { ro: 1, co: 0 },
  ],
  r: [
    { ro: 0, co: 1 },
    { ro: 0, co: 0 },
    { ro: 1, co: -1 },
  ],
  n: [
    { ro: 0, co: -1 },
    { ro: 0, co: 0 },
    { ro: 1, co: 0 },
  ],
  d: [
    { ro: -1, co: 0 },
    { ro: 0, co: 0 },
    { ro: 1, co: -1 },
  ],
  j: [
    { ro: -1, co: 1 },
    { ro: 0, co: 0 },
    { ro: 0, co: -1 },
  ],
  l: [
    { ro: -1, co: 0 },
    { ro: 0, co: 0 },
    { ro: 0, co: 1 },
  ],
};

export const allRotations: {
  [ket: string]: string[];
} = {
  a: ['a', 'v'],
  v: ['a', 'v'],
  '\\': ['\\', '-', '/'],
  '-': ['\\', '-', '/'],
  '/': ['\\', '-', '/'],
  c: ['c', 'r', 'n', 'd', 'j', 'l'],
  r: ['c', 'r', 'n', 'd', 'j', 'l'],
  n: ['c', 'r', 'n', 'd', 'j', 'l'],
  d: ['c', 'r', 'n', 'd', 'j', 'l'],
  j: ['c', 'r', 'n', 'd', 'j', 'l'],
  l: ['c', 'r', 'n', 'd', 'j', 'l'],
};

export const ShapePatternsId = {
  a: UInt64.from(11),
  v: UInt64.from(12),
  '\\': UInt64.from(13),
  '-': UInt64.from(14),
  '/': UInt64.from(15),
  c: UInt64.from(16),
  r: UInt64.from(17),
  n: UInt64.from(18),
  d: UInt64.from(19),
  j: UInt64.from(20),
  l: UInt64.from(21),
};

export const shapeSet1 = [
  ShapePatternsId['c'],
  ShapePatternsId['r'],
  ShapePatternsId['n'],
  ShapePatternsId['d'],
  ShapePatternsId['j'],
  ShapePatternsId['l'],
];

export const shapeSet2 = [
  ShapePatternsId['/'],
  ShapePatternsId['-'],
  ShapePatternsId['\\'],
];

export const shapeSet3 = [ShapePatternsId['a'], ShapePatternsId['v']];

export const ShapePatternsSymbol = Object.entries(ShapePatternsId).reduce(
  (acc: any, [key, value]) => {
    const val = value.toString();
    acc[val] = key;
    return acc;
  },
  {}
);

export const TileType = {
  Empty: UInt64.from(1),
  WindMill: UInt64.from(2),
  Tree: UInt64.from(3),
  Road: UInt64.from(4),
  Castle: UInt64.from(5),
  CityGate: UInt64.from(6),
};

export const ZNAKE_TOKEN_ID = TokenId.fromValue(777n);
