import { Field, Reducer, SmartContract, State, state, method } from 'o1js';

export class DebtManager extends SmartContract {
  @state(Field) counter = State<Field>();
  @state(Field) debt = State<Field>();
  reducer = Reducer({ actionType: Field });

  init() {
    super.init();
    this.counter.set(Field(0));
  }

  @method add_debt(val: Field) {
    this.increase_counter();
    const debt = this.debt.get();
    this.debt.requireEquals(debt);
    const updated_debt = debt.add(val);
    this.debt.set(updated_debt);
    this.reducer.dispatch(updated_debt);
  }

  @method remove_debt(val: Field) {
    this.increase_counter();
    const debt = this.debt.get();
    this.debt.requireEquals(debt);
    debt.assertGreaterThan(val);
    const updated_debt = debt.sub(val);
    this.debt.set(updated_debt);
    this.reducer.dispatch(updated_debt);
  }

  @method increase_counter() {
    const counter = this.counter.get();
    this.counter.requireEquals(counter);
    const updated_counter = counter.add(1);
    this.counter.set(updated_counter);
  }
}
