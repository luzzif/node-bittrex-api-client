"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OrderType_1 = require("../enum/OrderType");
/**
 * Represents a single order.
 */
class Order {
    constructor(json) {
        this._accountId = json.AccountId;
        this._orderId = json.OrderUuid;
        this._market = json.Exchange;
        this._type = OrderType_1.OrderType[json.Type];
        this._quantity = json.Quantity;
        this._remainingQuantity = json.QuantityRemaining;
        this._limit = json.Limit;
        this._reserved = json.Reserved;
        this._remainingReserve = json.ReserveRemaining;
        this._reservedCommission = json.CommissionReserved;
        this._remainingCommissionReserve = json.CommissionReserveRemaining;
        this._paidCommission = json.CommissionPaid;
        this._price = json.Price;
        this._pricePerUnit = json.PricePerUnit;
        this._opened = json.Opened !== null ? new Date(json.Opened) : null;
        this._closed = json.Closed !== null ? new Date(json.Closed) : null;
        this._isOpen = json.Closed === null;
        this._sentinel = json.Sentinel;
        this._cancelInitiated = json.CancelInitiated;
        this._immediateOrCancel = json.ImmediateOrCancel;
        this._conditional = json.IsConditional;
        this._condition = json.Condition;
        this._conditionTarget = json.ConditionTarget;
    }
    get accountId() {
        return this._accountId;
    }
    set accountId(value) {
        this._accountId = value;
    }
    get orderId() {
        return this._orderId;
    }
    set orderId(value) {
        this._orderId = value;
    }
    get market() {
        return this._market;
    }
    set market(value) {
        this._market = value;
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
    get remainingQuantity() {
        return this._remainingQuantity;
    }
    set remainingQuantity(value) {
        this._remainingQuantity = value;
    }
    get limit() {
        return this._limit;
    }
    set limit(value) {
        this._limit = value;
    }
    get reserved() {
        return this._reserved;
    }
    set reserved(value) {
        this._reserved = value;
    }
    get remainingReserve() {
        return this._remainingReserve;
    }
    set remainingReserve(value) {
        this._remainingReserve = value;
    }
    get reservedCommission() {
        return this._reservedCommission;
    }
    set reservedCommission(value) {
        this._reservedCommission = value;
    }
    get remainingCommissionReserve() {
        return this._remainingCommissionReserve;
    }
    set remainingCommissionReserve(value) {
        this._remainingCommissionReserve = value;
    }
    get paidCommission() {
        return this._paidCommission;
    }
    set paidCommission(value) {
        this._paidCommission = value;
    }
    get price() {
        return this._price;
    }
    set price(value) {
        this._price = value;
    }
    get pricePerUnit() {
        return this._pricePerUnit;
    }
    set pricePerUnit(value) {
        this._pricePerUnit = value;
    }
    get opened() {
        return this._opened;
    }
    set opened(value) {
        this._opened = value;
    }
    get closed() {
        return this._closed;
    }
    set closed(value) {
        this._closed = value;
    }
    get isOpen() {
        return this._isOpen;
    }
    set isOpen(value) {
        this._isOpen = value;
    }
    get sentinel() {
        return this._sentinel;
    }
    set sentinel(value) {
        this._sentinel = value;
    }
    get cancelInitiated() {
        return this._cancelInitiated;
    }
    set cancelInitiated(value) {
        this._cancelInitiated = value;
    }
    get immediateOrCancel() {
        return this._immediateOrCancel;
    }
    set immediateOrCancel(value) {
        this._immediateOrCancel = value;
    }
    get conditional() {
        return this._conditional;
    }
    set conditional(value) {
        this._conditional = value;
    }
    get condition() {
        return this._condition;
    }
    set condition(value) {
        this._condition = value;
    }
    get conditionTarget() {
        return this._conditionTarget;
    }
    set conditionTarget(value) {
        this._conditionTarget = value;
    }
}
exports.Order = Order;
//# sourceMappingURL=Order.js.map