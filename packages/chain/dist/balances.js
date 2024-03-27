var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { RuntimeModule, runtimeModule, state, runtimeMethod, } from "@proto-kit/module";
import { State, StateMap, assert } from "@proto-kit/protocol";
import { PublicKey, UInt64 } from "o1js";
let Balances = class Balances extends RuntimeModule {
    constructor() {
        super(...arguments);
        this.balances = StateMap.from(PublicKey, UInt64);
        this.circulatingSupply = State.from(UInt64);
    }
    addBalance(address, amount) {
        const circulatingSupply = this.circulatingSupply.get();
        const newCirculatingSupply = circulatingSupply.value.add(amount);
        assert(newCirculatingSupply.lessThanOrEqual(this.config.totalSupply), "Circulating supply would be higher than total supply");
        this.circulatingSupply.set(newCirculatingSupply);
        const currentBalance = this.balances.get(address);
        const newBalance = currentBalance.value.add(amount);
        this.balances.set(address, newBalance);
    }
};
__decorate([
    state(),
    __metadata("design:type", Object)
], Balances.prototype, "balances", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], Balances.prototype, "circulatingSupply", void 0);
__decorate([
    runtimeMethod(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PublicKey, UInt64]),
    __metadata("design:returntype", void 0)
], Balances.prototype, "addBalance", null);
Balances = __decorate([
    runtimeModule()
], Balances);
export { Balances };
