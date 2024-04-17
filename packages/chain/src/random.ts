import { Field, Int64, Poseidon, Struct } from 'o1js';

const shift64divisor = `0b` + `1${'0'.repeat(64)}`;

// TODO: Optimize
// Now only 64 fits of 256 bits of field used. So can be 4x optimized
// Think how to use Sponge here
export class RandomGenerator extends Struct({
  seed: Field,
  source: Field,
  curValue: Field,
}) {
  static from(seed: Field): RandomGenerator {
    const source = Poseidon.hash([seed]);

    return new RandomGenerator({
      seed,
      source,
      curValue: source,
    });
  }

  getNumber(maxValue: number): Int64 {
    this.source = Poseidon.hash([this.source]);
    this.curValue = this.source;

    return Int64.from(this.curValue.rangeCheckHelper(64)).mod(maxValue);
  }

  // Get 4 number
  getNumbers(maxValues: number[]): [Int64, Int64, Int64, Int64] {
    this.source = Poseidon.hash([this.source]);
    this.curValue = this.source;
    const result: [Int64, Int64, Int64, Int64] = [
      Int64.from(0),
      Int64.from(0),
      Int64.from(0),
      Int64.from(0),
    ];

    for (let i = 0; i < 4; i++) {
      result[i] = Int64.fromField(this.curValue.rangeCheckHelper(64)).mod(
        maxValues[i]
      );

      this.curValue = this.curValue.div(shift64divisor); // Check if its ok
    }
    return result;
  }
}
