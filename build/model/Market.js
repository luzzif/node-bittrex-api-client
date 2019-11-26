"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represents a single market.
 */
class Market {
    constructor(json) {
        this._marketCurrencyShort = json.MarketCurrency;
        this._marketCurrencyLong = json.MarketCurrencyLong;
        this._baseCurrencyShort = json.BaseCurrency;
        this._baseCurrencyLong = json.BaseCurrencyLong;
        this._minimumTradeSize = json.MinTradeSize;
        this._name = json.MarketName;
        this._active = json.IsActive;
        this._created = new Date(json.Created);
    }
    get marketCurrencyShort() {
        return this._marketCurrencyShort;
    }
    set marketCurrencyShort(value) {
        this._marketCurrencyShort = value;
    }
    get baseCurrencyShort() {
        return this._baseCurrencyShort;
    }
    set baseCurrencyShort(value) {
        this._baseCurrencyShort = value;
    }
    get marketCurrencyLong() {
        return this._marketCurrencyLong;
    }
    set marketCurrencyLong(value) {
        this._marketCurrencyLong = value;
    }
    get baseCurrencyLong() {
        return this._baseCurrencyLong;
    }
    set baseCurrencyLong(value) {
        this._baseCurrencyLong = value;
    }
    get minimumTradeSize() {
        return this._minimumTradeSize;
    }
    set minimumTradeSize(value) {
        this._minimumTradeSize = value;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get active() {
        return this._active;
    }
    set active(value) {
        this._active = value;
    }
    get created() {
        return this._created;
    }
    set created(value) {
        this._created = value;
    }
}
exports.Market = Market;
//# sourceMappingURL=Market.js.map