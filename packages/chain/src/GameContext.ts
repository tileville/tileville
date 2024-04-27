import {} from '@proto-kit/library';
import { CircuitString, Field, Provable, UInt64 } from 'o1js';
import { RandomGenerator } from './random';
import { TriHexDeck } from './types';
import { TRIHEX_DECK_SIZE } from './constants';

const shapeSet1 = ['c', 'r', 'n', 'd', 'j', 'k'];
const shapeSet2 = ['/', '-', '\\'];
const shapeSet3 = ['a', 'v'];

export function createTrihexDeckBySeed(seed: Field): TriHexDeck {
  const generator = RandomGenerator.from(seed);
  const deck = TriHexDeck.empty();

  for (let i = 0; i < TRIHEX_DECK_SIZE; i++) {
    let trihex = deck.trihexes[i];
    deck.trihexes[i].shape = Provable.if(
      UInt64.from(i).greaterThanOrEqual(UInt64.from(TRIHEX_DECK_SIZE / 3)),
      CircuitString.fromString(
        shapeSet2[Number(generator.getNumber(shapeSet2.length))]
      ),
      CircuitString.fromString(
        shapeSet3[Number(generator.getNumber(shapeSet3.length))]
      )
    );

    deck.trihexes[i].shape = Provable.if(
      UInt64.from(i).greaterThanOrEqual(
        UInt64.from((TRIHEX_DECK_SIZE * 2) / 3)
      ),
      CircuitString.fromString(
        shapeSet1[Number(generator.getNumber(shapeSet1.length))]
      ),
      deck.trihexes[i].shape
    );

    deck.trihexes[i].hexes[0] = Provable.if(
      UInt64.from(i).greaterThanOrEqual(UInt64.from(TRIHEX_DECK_SIZE / 2)),
      UInt64.from(1),
      UInt64.from(3)
    );
    deck.trihexes[i].hexes[1] = Provable.if(
      UInt64.from(i).greaterThanOrEqual(UInt64.from(TRIHEX_DECK_SIZE / 2)),
      UInt64.from(2),
      UInt64.from(3)
    );
    deck.trihexes[i].hexes[2] = Provable.if(
      UInt64.from(i).greaterThanOrEqual(UInt64.from(TRIHEX_DECK_SIZE / 2)),
      UInt64.from(2),
      UInt64.from(3)
    );
  }

  return deck;
}

/**
 * let b = UInt64.from(10)
 * let c = UInt64.from(20)
 * let d = UInt64.from(30)
 * let e = UInt64.from(40)
 *
 * let a = Provable.if(b.greaterThanOrEqual(25), 1, Provable.if(b.greaterThanOrEqual(15), 2, 3))
 */
