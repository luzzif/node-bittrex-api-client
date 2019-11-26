"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represents a single currency.
 */
class Currency {
    constructor(json) {
        this._nameShort = json.Currency;
        this._nameLong = json.CurrencyLong;
        this._minimumConfirmation = json.MinConfirmation;
        this._transactionFee = json.TxFee;
        this._active = json.IsActive;
        this._type = json.CoinType;
        this._baseAddress = json.BaseAddress;
    }
    get nameShort() {
        return this._nameShort;
    }
    set nameShort(value) {
        this._nameShort = value;
    }
    get nameLong() {
        return this._nameLong;
    }
    set nameLong(value) {
        this._nameLong = value;
    }
    get minimumConfirmation() {
        return this._minimumConfirmation;
    }
    set minimumConfirmation(value) {
        this._minimumConfirmation = value;
    }
    get transactionFee() {
        return this._transactionFee;
    }
    set transactionFee(value) {
        this._transactionFee = value;
    }
    get active() {
        return this._active;
    }
    set active(value) {
        this._active = value;
    }
    get type() {
        return this._type;
    }
    set type(value) {
        this._type = value;
    }
    get baseAddress() {
        return this._baseAddress;
    }
    set baseAddress(value) {
        this._baseAddress = value;
    }
}
exports.Currency = Currency;
//# sourceMappingURL=Currency.js.map