"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PlacedOrder_1 = require("./PlacedOrder");
const OrderType_1 = require("../enum/OrderType");
const Fill_1 = require("./Fill");
/**
 * Represents a single exchange state update.
 */
class ExchangeStateUpdate {
    constructor(json) {
        this._timestamp = new Date(json.Nounce);
        this._name = json.MarketName;
        this._buyOrders = [];
        for (let buyJson of json.Buys) {
            this._buyOrders.push(new PlacedOrder_1.PlacedOrder(buyJson));
        }
        this._sellOrders = [];
        for (let sellJson of json.Sells) {
            this._sellOrders.push(new PlacedOrder_1.PlacedOrder(sellJson));
        }
        this._buyFills = [];
        this._sellFills = [];
        for (let fillJson of json.Fills) {
            let fillType = OrderType_1.OrderType[fillJson.OrderType];
            if (fillType === OrderType_1.OrderType.BUY || fillType == OrderType_1.OrderType.LIMIT_BUY) {
                this._buyFills.push(new Fill_1.Fill(fillJson));
            }
            else if (fillType === OrderType_1.OrderType.SELL || fillType == OrderType_1.OrderType.LIMIT_SELL) {
                this._sellFills.push(new Fill_1.Fill(fillJson));
            }
        }
    }
    get timestamp() {
        return this._timestamp;
    }
    set timestamp(value) {
        this._timestamp = value;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get buyOrders() {
        return this._buyOrders;
    }
    set buyOrders(value) {
        this._buyOrders = value;
    }
    get sellOrders() {
        return this._sellOrders;
    }
    set sellOrders(value) {
        this._sellOrders = value;
    }
    get buyFills() {
        return this._buyFills;
    }
    set buyFills(value) {
        this._buyFills = value;
    }
    get sellFills() {
        return this._sellFills;
    }
    set sellFills(value) {
        this._sellFills = value;
    }
}
exports.ExchangeStateUpdate = ExchangeStateUpdate;
//# sourceMappingURL=ExchangeStateUpdate.js.map