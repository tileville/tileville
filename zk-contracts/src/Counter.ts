import { Field, SmartContract, State, state, method } from 'o1js';

export class Counter extends SmartContract {
  @state(Field) value = State<Field>();
  events = {
    'set-counter': Field,
    'update-counter': Field,
  };

  init() {
    super.init();
    this.value.set(Field(0));
    this.emitEvent('set-counter', Field(0));
  }

  @method increase_counter() {
    const value = this.value.get();
    this.value.requireEquals(value);
    const updated_value = value.add(1);
    this.value.set(updated_value);
    this.emitEvent('update-counter', updated_value);
  }

  @method decrease_counter() {
    const value = this.value.get();
    value.assertGreaterThan(Field(0));
    this.value.set(value.sub(1));
  }
}
