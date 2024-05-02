import { Field } from 'o1js';
import {
  createTrihexDeckBySeed,
  generateTileMapBySeed,
} from '../src/GameContext';

describe.skip('Create Hex Deck', () => {
  test('Generate by seed', async () => {
    const deck = createTrihexDeckBySeed(Field(5));
    console.log(deck);
  });
});

describe.skip('generate Tilemap', () => {
  test('with center and city wall', async () => {
    const tilemap = generateTileMapBySeed(Field(5));
    console.log(tilemap);
  });
});
