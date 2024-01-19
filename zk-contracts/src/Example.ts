import { Field, Poseidon, PrivateKey, PublicKey, Signature } from 'o1js';

export function randomOperations() {
  let x = new Field(4);
  x = x.add(3);
  x.assertEquals(7);
  x = x.sub(1);
  x.assertEquals(6);
  x = x.mul(3);
  x.assertEquals(18);
  x = x.div(2);
  x.assertEquals(9);
  x = x.square();
  x.assertEquals(81);
  x = x.sqrt();
  x.assertGreaterThan(8);
  let b = x.equals(8);
  b.assertFalse();
  b = x.greaterThan(8);
  b.assertTrue();
}

export function verifySignature() {
  let x = Field(1001);
  let hash = Poseidon.hash([x]);
  let privateKey = PrivateKey.random();
  let publicKey = PublicKey.fromPrivateKey(privateKey);
  let message = [hash];
  let signature = Signature.create(privateKey, message);
  let res = signature.verify(publicKey, message);
  res.assertTrue();
}
