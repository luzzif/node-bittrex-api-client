"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FillType_1 = require("../enum/FillType");
/**
 * Represents a single trade.
 */
class Trade {
    constructor(json) {
        this._id = json.Id;
        this._timestamp = new Date(json.TimeStamp);
        this._quantity = json.Quantity;
        this._unitPrice = json.Price;
        this._totalPrice = json.Total;
        this._fillType = FillType_1.FillType[json.FillType];
        this._orderType = FillType_1.FillType[json.OrderType];
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get timestamp() {
        return this._timestamp;
    }
    set timestamp(value) {
        this._timestamp = value;
    }
    get quantity() {
        return this._quantity;
    }
    set quantity(value) {
        this._quantity = value;
    }
    get unitPrice() {
        return this._unitPrice;
    }
    set unitPrice(value) {
        this._unitPrice = value;
    }
    get totalPrice() {
        return this._totalPrice;
    }
    set totalPrice(value) {
        this._totalPrice = value;
    }
    get fillType() {
        return this._fillType;
    }
    set fillType(value) {
        this._fillType = value;
    }
    get orderType() {
        return this._orderType;
    }
    set orderType(value) {
        this._orderType = value;
    }
}
exports.Trade = Trade;
//# sourceMappingURL=Trade.js.map