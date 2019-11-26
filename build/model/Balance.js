"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represents an account balance.
 */
class Balance {
    constructor(json) {
        this._currency = json.Currency;
        this._balance = json.Balance;
        this._available = json.Available;
        this._pending = json.Pending;
        this._walletAddress = json.CryptoAddress;
        this._requested = json.Requested;
    }
    get currency() {
        return this._currency;
    }
    set currency(value) {
        this._currency = value;
    }
    get balance() {
        return this._balance;
    }
    set balance(value) {
        this._balance = value;
    }
    get available() {
        return this._available;
    }
    set available(value) {
        this._available = value;
    }
    get pending() {
        return this._pending;
    }
    set pending(value) {
        this._pending = value;
    }
    get walletAddress() {
        return this._walletAddress;
    }
    set walletAddress(value) {
        this._walletAddress = value;
    }
    get requested() {
        return this._requested;
    }
    set requested(value) {
        this._requested = value;
    }
}
exports.Balance = Balance;
//# sourceMappingURL=Balance.js.map