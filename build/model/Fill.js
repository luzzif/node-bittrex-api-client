"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represents a single order fill.
 */
class Fill {
    constructor(json, type) {
        this._quantity = json.Quantity;
        this._rate = json.Rate;
    }
    get quantity() {
        return this._quantity;
    }
    set quantity(value) {
        this._quantity = value;
    }
    get rate() {
        return this._rate;
    }
    set rate(value) {
        this._rate = value;
    }
}
exports.Fill = Fill;
//# sourceMappingURL=Fill.js.map