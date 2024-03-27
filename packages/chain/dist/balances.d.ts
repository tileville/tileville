import { RuntimeModule } from "@proto-kit/module";
import { State, StateMap } from "@proto-kit/protocol";
import { PublicKey, UInt64 } from "o1js";
interface BalancesConfig {
    totalSupply: UInt64;
}
export declare class Balances extends RuntimeModule<BalancesConfig> {
    balances: StateMap<PublicKey, UInt64>;
    circulatingSupply: State<UInt64>;
    addBalance(address: PublicKey, amount: UInt64): void;
}
export {};
//# sourceMappingURL=balances.d.ts.map