import { PrivateKey, PublicKey, Mina, AccountUpdate, Field } from 'o1js';
import { Counter } from './Counter';

let proofsEnabled = false;

let deployerAccount: PublicKey;
let deployerKey: PrivateKey;
let senderAccount: PublicKey;
let senderKey: PrivateKey;
let counterAppAddress: PublicKey;
let counterAppKey: PrivateKey;
let counterApp: Counter;

describe('Counter', () => {
  beforeAll(async () => {
    if (proofsEnabled) await Counter.compile();
  });

  beforeEach(() => {
    const LocalInstance = Mina.LocalBlockchain({ proofsEnabled });
    Mina.setActiveInstance(LocalInstance);
    ({ privateKey: deployerKey, publicKey: deployerAccount } =
      LocalInstance.testAccounts[0]);
    ({ privateKey: senderKey, publicKey: senderAccount } =
      LocalInstance.testAccounts[1]);
    counterAppKey = PrivateKey.random();
    counterAppAddress = counterAppKey.toPublicKey();
    counterApp = new Counter(counterAppAddress);
  });

  async function localDeploy() {
    const txn = await Mina.transaction(deployerAccount, () => {
      AccountUpdate.fundNewAccount(deployerAccount);
      counterApp.deploy();
    });
    await txn.prove();
    await txn.sign([deployerKey, counterAppKey]).send();
  }

  it('should correctly increase the counter', async () => {
    await localDeploy();
    const value = counterApp.value.get();
    expect(value).toEqual(Field(0));

    const txn = await Mina.transaction(senderAccount, () => {
      counterApp.increase_counter();
    });
    await txn.prove();
    await txn.sign([senderKey]).send();
    const updated_value = counterApp.value.get();
    expect(updated_value).toEqual(Field(1));
  });
});
