import {
  Field,
  SmartContract,
  state,
  State,
  method,
  PublicKey,
  Bool,
  Signature,
  UInt64,
} from 'o1js';

export class EscrowContract extends SmartContract {
  @state(PublicKey) seller = State<PublicKey>();
  @state(PublicKey) buyer = State<PublicKey>();
  @state(PublicKey) arbiter = State<PublicKey>();
  @state(UInt64) amount = State<UInt64>();
  @state(Bool) isReleased = State<Bool>();
  @state(Bool) isRefunded = State<Bool>();

  @method init(seller: PublicKey, buyer: PublicKey, arbiter: PublicKey, amount: UInt64) {
    super.init();
    this.seller.set(seller);
    this.buyer.set(buyer);
    this.arbiter.set(arbiter);
    this.amount.set(amount);
    this.isReleased.set(Bool(false));
    this.isRefunded.set(Bool(false));
  }

  @method release(signature: Signature) {
    const buyer = this.buyer.get();
    const arbiter = this.arbiter.get();
    const isReleased = this.isReleased.get();
    const isRefunded = this.isRefunded.get();
    
    isReleased.not().assertTrue('Funds already released');
    isRefunded.not().assertTrue('Funds already refunded');
    
     const validSignature = signature.verify(buyer, [Field(1)]) 
      .or(signature.verify(arbiter, [Field(1)]));
    validSignature.assertTrue('Invalid signature');

       this.isReleased.set(Bool(true));
  }

  @method refund(signature: Signature) {
    // Get current state
    const seller = this.seller.get();
    const arbiter = this.arbiter.get();
    const isReleased = this.isReleased.get();
    const isRefunded = this.isRefunded.get();

    isReleased.not().assertTrue('Funds already released');
    isRefunded.not().assertTrue('Funds already refunded');

    const validSignature = signature.verify(seller, [Field(1)])
      .or(signature.verify(arbiter, [Field(1)]));
    validSignature.assertTrue('Invalid signature');

    // Refund to buyer
    this.isRefunded.set(Bool(true));
  }

  @method getState() {
    const seller = this.seller.get();
    const buyer = this.buyer.get();
    const arbiter = this.arbiter.get();
    const amount = this.amount.get();
    const isReleased = this.isReleased.get();
    const isRefunded = this.isRefunded.get();
    
    return {
      seller,
      buyer, 
      arbiter,
      amount,
      isReleased,
      isRefunded
    };
  }
}
