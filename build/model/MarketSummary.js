"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represents a single market summary.
 */
class MarketSummary {
    constructor(json) {
        this._name = json.MarketName;
        this._high = json.High;
        this._low = json.Low;
        this._volume = json.Volume;
        this._last = json.Last;
        this._baseVolume = json.BaseVolume;
        this._timestamp = new Date(json.TimeStamp);
        this._bid = json.Bid;
        this._ask = json.Ask;
        this._openBuyOrders = json.OpenBuyOrders;
        this._openSellOrders = json.OpenSellOrders;
        this._previousDay = json.PrevDay;
        this._created = new Date(json.Created);
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get high() {
        return this._high;
    }
    set high(value) {
        this._high = value;
    }
    get low() {
        return this._low;
    }
    set low(value) {
        this._low = value;
    }
    get volume() {
        return this._volume;
    }
    set volume(value) {
        this._volume = value;
    }
    get last() {
        return this._last;
    }
    set last(value) {
        this._last = value;
    }
    get baseVolume() {
        return this._baseVolume;
    }
    set baseVolume(value) {
        this._baseVolume = value;
    }
    get timestamp() {
        return this._timestamp;
    }
    set timestamp(value) {
        this._timestamp = value;
    }
    get bid() {
        return this._bid;
    }
    set bid(value) {
        this._bid = value;
    }
    get ask() {
        return this._ask;
    }
    set ask(value) {
        this._ask = value;
    }
    get openBuyOrders() {
        return this._openBuyOrders;
    }
    set openBuyOrders(value) {
        this._openBuyOrders = value;
    }
    get openSellOrders() {
        return this._openSellOrders;
    }
    set openSellOrders(value) {
        this._openSellOrders = value;
    }
    get previousDay() {
        return this._previousDay;
    }
    set previousDay(value) {
        this._previousDay = value;
    }
    get created() {
        return this._created;
    }
    set created(value) {
        this._created = value;
    }
}
exports.MarketSummary = MarketSummary;
//# sourceMappingURL=MarketSummary.js.map