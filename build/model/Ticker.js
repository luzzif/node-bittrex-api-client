"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represents a single ticker.
 */
class Ticker {
    constructor(json) {
        this._bid = json.Bid;
        this._ask = json.Ask;
        this._last = json.Last;
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
    get last() {
        return this._last;
    }
    set last(value) {
        this._last = value;
    }
}
exports.Ticker = Ticker;
//# sourceMappingURL=Ticker.js.map