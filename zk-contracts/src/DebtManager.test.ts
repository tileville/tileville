import { PrivateKey, PublicKey, Mina, AccountUpdate, Field } from 'o1js';
import { DebtManager } from './DebtManager';

let proofsEnabled = false;

let deployerAccount: PublicKey;
let deployerKey: PrivateKey;
let senderAccount: PublicKey;
let senderKey: PrivateKey;
let debtManagerAppAddress: PublicKey;
let debtManagerAppKey: PrivateKey;
let debtManagerApp: DebtManager;

describe('Debt Manager', () => {
  beforeAll(async () => {
    if (proofsEnabled) await DebtManager.compile();
  });

  beforeEach(() => {
    const LocalInstance = Mina.LocalBlockchain({ proofsEnabled });
    Mina.setActiveInstance(LocalInstance);
    ({ privateKey: deployerKey, publicKey: deployerAccount } =
      LocalInstance.testAccounts[0]);
    ({ privateKey: senderKey, publicKey: senderAccount } =
      LocalInstance.testAccounts[1]);
    debtManagerAppKey = PrivateKey.random();
    debtManagerAppAddress = debtManagerAppKey.toPublicKey();
    debtManagerApp = new DebtManager(debtManagerAppAddress);
  });

  async function localDeploy() {
    const txn = await Mina.transaction(deployerAccount, () => {
      AccountUpdate.fundNewAccount(deployerAccount);
      debtManagerApp.deploy();
    });
    await txn.prove();
    await txn.sign([deployerKey, debtManagerAppKey]).send();
  }

  it('should correctly add the debt', async () => {
    await localDeploy();
    const counter = debtManagerApp.counter.get();
    expect(counter).toEqual(Field(0));

    const txn = await Mina.transaction(senderAccount, () => {
      debtManagerApp.add_debt(Field(1));
    });
    await txn.prove();
    await txn.sign([senderKey]).send();
    const updated_counter = debtManagerApp.counter.get();
    expect(updated_counter).toEqual(Field(1));
  });
});
