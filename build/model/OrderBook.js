"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OrderBookOrder_1 = require("./OrderBookOrder");
const util_1 = require("util");
const OrderType_1 = require("../enum/OrderType");
/**
 * Represents a single order book.
 */
class OrderBook {
    constructor(json) {
        this._buys = [];
        if (!util_1.isNullOrUndefined(json.buy)) {
            for (let buyOrderJson of json.buy) {
                this._buys.push(new OrderBookOrder_1.OrderBookOrder(buyOrderJson, OrderType_1.OrderType.BUY));
            }
        }
        this._sells = [];
        if (!util_1.isNullOrUndefined(json.sell)) {
            for (let sellOrderJson of json.sell) {
                this._sells.push(new OrderBookOrder_1.OrderBookOrder(sellOrderJson, OrderType_1.OrderType.SELL));
            }
        }
    }
    get buys() {
        return this._buys;
    }
    set buys(value) {
        this._buys = value;
    }
    get sells() {
        return this._sells;
    }
    set sells(value) {
        this._sells = value;
    }
}
exports.OrderBook = OrderBook;
//# sourceMappingURL=OrderBook.js.map