export const MAX_TILES = 11;
export const TRIHEX_DECK_SIZE = 25;
export const MAP_ROW_SIZE = 11;
export const MAP_COL_SIZE = 11;

export const shapes = {
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

export const rotations = {
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

import { Field } from 'o1js';

export const MINAPOLIS_TOKEN_ID = Field.from(314);
