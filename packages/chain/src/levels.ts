import { Bool, CircuitString, Field, UInt64 } from 'o1js';
import { Competition, TriHexDeck } from './types';

// export const defaultLevel = (): TriHexDeck => {

// }

export const getDefaultCompetitions = (): Competition[] => {
  const prereg = Bool(false);
  const preregStartTime = UInt64.from(0);
  const preregEndTime = UInt64.from(0);
  const competitionStartTime = UInt64.from(0);
  const competitionEndTime = UInt64.from(new Date('2100-01-01').getTime());
  const funds = UInt64.from(0);
  const participationFee = UInt64.from(0);
  const seeds = [0, 777, 1234];

  return seeds.map((seed, i) => {
    return new Competition({
      name: CircuitString.fromString(`Default-${i}`),
      seed: Field.from(seed),
      prereg,
      preregStartTime,
      preregEndTime,
      competitionStartTime,
      competitionEndTime,
      funds,
      participationFee,
    });
  });
};
