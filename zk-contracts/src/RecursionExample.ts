import { Field, SelfProof, ZkProgram, verify } from 'o1js';

export const RecursionExample = ZkProgram({
  name: 'recursion-example',
  publicInput: Field,
  methods: {
    init: {
      privateInputs: [],
      method(state: Field) {
        state.assertEquals(Field(0));
      },
    },

    addNumber: {
      privateInputs: [SelfProof, Field],
      method(
        newState: Field,
        earlierProof: SelfProof<Field, void>,
        numberToAdd: Field
      ) {
        earlierProof.verify();
        newState.assertEquals(earlierProof.publicInput.add(numberToAdd));
      },
    },
  },
});
