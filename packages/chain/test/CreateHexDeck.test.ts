import { Field, UInt64} from 'o1js';
import {
  createTrihexDeckBySeed,
  generateTileMapBySeed,
} from '../src/GameContext';
import { GRID_SIZE } from '../src/constants';

describe.skip('Create Hex Deck', () => {
  test('Generate by seed', async () => {
    const deck = createTrihexDeckBySeed(Field(5));
    expect(deck.trihexes.length).toEqual(25)
  });
});

describe.skip('generate Tilemap', () => {
  test('with center and city wall', async () => {
    const tilemap = generateTileMapBySeed(Field(5));
    expect(tilemap.size).toEqual(UInt64.from(GRID_SIZE))
  });
});
