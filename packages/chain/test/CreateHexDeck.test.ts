import { Field } from 'o1js';
import { createTrihexDeckBySeed } from '../src/GameContext';

describe('Create Hex Deck', () => {
  test('Generate by seed', async () => {
    const deck = createTrihexDeckBySeed(Field(5));
    console.log(deck);
  });
});
