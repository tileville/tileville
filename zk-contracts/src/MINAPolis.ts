import {
  Field,
  Reducer,
  SmartContract,
  State,
  state,
  method,
  UInt64,
  AccountUpdate,
} from 'o1js';
import { MINA_DENOM } from './utils/constants';

export class MINAPolis extends SmartContract {
  @state(Field) counter = State<Field>();
  @state(Field) debt = State<Field>();
  reducer = Reducer({ actionType: Field });

  init() {
    super.init();
  }

  @method payout(amount: UInt64) {
    amount.assertLessThan(new UInt64(0.1 * MINA_DENOM));
    this.send({ to: this.sender, amount });
  }

  @method deposit(amount: UInt64) {
    amount.assertGreaterThanOrEqual(new UInt64(2 * MINA_DENOM));
    let senderUpdate = AccountUpdate.create(this.sender);
    senderUpdate.requireSignature();
    // should we add our personal account for now instead of this zk acocunt
    senderUpdate.send({ to: this, amount });
  }
}
