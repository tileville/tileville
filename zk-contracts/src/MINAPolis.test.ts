import { PrivateKey, PublicKey, Mina, AccountUpdate, Field } from 'o1js';
import { MINAPolis } from './MINAPolis';

let proofsEnabled = false;

let deployerAccount: PublicKey;
let deployerKey: PrivateKey;
let senderAccount: PublicKey;
let senderKey: PrivateKey;
let minaPolisAppAddress: PublicKey;
let minaPolisAppKey: PrivateKey;
let minaPolisApp: MINAPolis;

describe('Debt Manager', () => {
  beforeAll(async () => {
    if (proofsEnabled) await MINAPolis.compile();
  });

  beforeEach(() => {
    const LocalInstance = Mina.LocalBlockchain({ proofsEnabled });
    Mina.setActiveInstance(LocalInstance);
    ({ privateKey: deployerKey, publicKey: deployerAccount } =
      LocalInstance.testAccounts[0]);
    ({ privateKey: senderKey, publicKey: senderAccount } =
      LocalInstance.testAccounts[1]);
    minaPolisAppKey = PrivateKey.random();
    minaPolisAppAddress = minaPolisAppKey.toPublicKey();
    minaPolisApp = new MINAPolis(minaPolisAppAddress);
  });

  async function localDeploy() {
    const txn = await Mina.transaction(deployerAccount, () => {
      AccountUpdate.fundNewAccount(deployerAccount);
      minaPolisApp.deploy();
    });
    await txn.prove();
    await txn.sign([deployerKey, minaPolisAppKey]).send();
  }
});
