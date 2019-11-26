"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OrderType_1 = require("../enum/OrderType");
/**
 * Represents a single order book order.
 */
class OrderBookOrder {
    constructor(json, type) {
        this._type = type === undefined ? OrderType_1.OrderType[json.OrderType] : type;
        this._quantity = json.Quantity;
        this._rate = json.Rate;
    }
    get type() {
        return this._type;
    }
    set type(value) {
        this._type = value;
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
exports.OrderBookOrder = OrderBookOrder;
//# sourceMappingURL=OrderBookOrder.js.map