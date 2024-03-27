import { UInt64 } from "o1js";
import { Balances } from "./balances";
export declare class CustomBalances extends Balances {
}
declare const _default: {
    modules: {
        Balances: typeof Balances;
        CustomBalances: typeof CustomBalances;
    };
    config: {
        Balances: {
            totalSupply: UInt64;
        };
        CustomBalances: {
            totalSupply: UInt64;
        };
    };
};
export default _default;
//# sourceMappingURL=runtime.d.ts.map