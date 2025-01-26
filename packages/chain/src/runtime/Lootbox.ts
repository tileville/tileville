import {
  SmartContract,
  state,
  State,
  method,
  UInt64,
  PublicKey,
  PrivateKey,
  Field,
  Poseidon,
  Circuit,
} from 'o1js';

// Define a Lootbox class to represent the lootbox structure
class Lootbox extends SmartContract {
  // State variables
  @state(Field) lootboxCount = State<Field>(); // Total number of lootboxes created
  @state(Field) adminPublicKeyHash = State<Field>(); // Hash of the admin's public key

  // Events (for logging)
  events = {
    LootboxCreated: Field,
    LootboxMinted: PublicKey,
    LootboxRedeemed: PublicKey,
  };

  // Initialize the contract
  init() {
    super.init();
    this.lootboxCount.set(Field(0)); // Initialize lootbox count to 0
    this.adminPublicKeyHash.set(Poseidon.hash(this.sender.toFields())); // Set admin public key hash
  }

  // Method to create a new lootbox (only callable by admin)
  @method createLootbox(price: UInt64, contentHash: Field) {
    // Verify the caller is the admin
    const adminHash = this.adminPublicKeyHash.get();
    this.adminPublicKeyHash.assertEquals(adminHash);
    const callerHash = Poseidon.hash(this.sender.toFields());
    callerHash.assertEquals(adminHash);

    // Increment lootbox count
    const currentCount = this.lootboxCount.get();
    this.lootboxCount.assertEquals(currentCount);
    this.lootboxCount.set(currentCount.add(Field(1)));

    // Emit event
    this.emitEvent('LootboxCreated', currentCount);
  }

  // Method to mint a lootbox (pay the price and get a lootbox)
  @method mintLootbox(lootboxId: Field, price: UInt64) {
    // Verify the lootbox exists
    const currentCount = this.lootboxCount.get();
    this.lootboxCount.assertEquals(currentCount);
    Circuit.assert(lootboxId.lessThan(currentCount), 'Lootbox does not exist');

    // Transfer MINA tokens from the caller to the contract
    this.token.send({
      from: this.sender,
      to: this.address,
      amount: price,
    });

    // Emit event
    this.emitEvent('LootboxMinted', this.sender);
  }

  // Method to redeem a lootbox (reveal and claim the hidden item)
  @method redeemLootbox(lootboxId: Field, contentHash: Field) {
    // Verify the lootbox exists
    const currentCount = this.lootboxCount.get();
    this.lootboxCount.assertEquals(currentCount);
    Circuit.assert(lootboxId.lessThan(currentCount), 'Lootbox does not exist');

    // Verify the caller owns the lootbox (you can implement ownership logic here)
    // For simplicity, we assume the caller is the owner

    // Emit event
    this.emitEvent('LootboxRedeemed', this.sender);
  }
}
