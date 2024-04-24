import {
  RuntimeModule,
  runtimeModule,
  state,
  runtimeMethod,
} from '@proto-kit/module';
import { State, StateMap, assert } from '@proto-kit/protocol';
import type { Proof } from 'o1js';
import { UInt64, PublicKey, Provable, Bool } from 'o1js';
import { Balances, UInt64 as ProtoUInt64 } from '@proto-kit/library';
import { inject } from 'tsyringe';
import { Competition } from './types';

export interface IScoreable {
  score: UInt64;
}

@runtimeModule()
export class GameHub<
  PublicInput,
  PublicOutput extends IScoreable,
  GameProof extends Proof<PublicInput, PublicOutput>,
> extends RuntimeModule<unknown> {
  @state() public competitions = StateMap.from<UInt64, Competition>(
    UInt64,
    Competition
  );
}
