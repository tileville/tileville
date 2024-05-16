import { Bool, CircuitString, Field, UInt64 } from 'o1js';
import { Competition } from './types';
import {UInt64 as ProtoUInt64} from '@proto-kit/library'

// export const defaultLevel = (): TriHexDeck => {

// }

export const getDefaultCompetitions = (): Competition[] => {
  const prereg = Bool(false);
  const preregStartTime = ProtoUInt64.from(0);
  const preregEndTime = ProtoUInt64.from(0);
  const competitionStartTime = ProtoUInt64.from(0);
  const competitionEndTime = ProtoUInt64.from(new Date('2100-01-01').getTime());
  const funds = ProtoUInt64.from(0);
  const participationFee = ProtoUInt64.from(0);
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
