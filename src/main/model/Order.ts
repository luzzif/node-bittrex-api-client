import { OrderType } from "../enum/OrderType";

export class Order {

    private _accountId: string;
    private _orderId: string;
    private _market: string;
    private _type: OrderType;
    private _quantity: number;
    private _remainingQuantity: number;
    private _limit: number;
    private _reserved: number;
    private _remainingReserve: number;
    private _reservedCommission: number;
    private _remainingCommissionReserve: number;
    private _paidCommission: number;
    private _price: number;
    private _pricePerUnit: number;
    private _opened: Date;
    private _closed: Date;
    private _isOpen: boolean;
    private _sentinel: string;
    private _cancelInitiated: boolean;
    private _immediateOrCancel: boolean;
    private _conditional: boolean;
    private _condition: string;
    private _conditionTarget: number;

    constructor( json: any ) {

        this._accountId = json.AccountId;
        this._orderId = json.OrderUuid;
        this._market = json.Exchange;
        this._type = OrderType[ json.Type as string ];
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
        this._opened = json.Opened !== null ? new Date( json.Opened ) : null;
        this._closed = json.Closed !== null ? new Date( json.Closed ) : null;
        this._isOpen = json.Closed === null;
        this._sentinel = json.Sentinel;
        this._cancelInitiated = json.CancelInitiated;
        this._immediateOrCancel = json.ImmediateOrCancel;
        this._conditional = json.IsConditional;
        this._condition = json.Condition;
        this._conditionTarget = json.ConditionTarget;

    }

    get accountId(): string {
        return this._accountId;
    }

    set accountId( value: string ) {
        this._accountId = value;
    }

    get orderId(): string {
        return this._orderId;
    }

    set orderId( value: string ) {
        this._orderId = value;
    }

    get market(): string {
        return this._market;
    }

    set market( value: string ) {
        this._market = value;
    }

    get type(): OrderType {
        return this._type;
    }

    set type( value: OrderType ) {
        this._type = value;
    }

    get quantity(): number {
        return this._quantity;
    }

    set quantity( value: number ) {
        this._quantity = value;
    }

    get remainingQuantity(): number {
        return this._remainingQuantity;
    }

    set remainingQuantity( value: number ) {
        this._remainingQuantity = value;
    }

    get limit(): number {
        return this._limit;
    }

    set limit( value: number ) {
        this._limit = value;
    }

    get reserved(): number {
        return this._reserved;
    }

    set reserved( value: number ) {
        this._reserved = value;
    }

    get remainingReserve(): number {
        return this._remainingReserve;
    }

    set remainingReserve( value: number ) {
        this._remainingReserve = value;
    }

    get reservedCommission(): number {
        return this._reservedCommission;
    }

    set reservedCommission( value: number ) {
        this._reservedCommission = value;
    }

    get remainingCommissionReserve(): number {
        return this._remainingCommissionReserve;
    }

    set remainingCommissionReserve( value: number ) {
        this._remainingCommissionReserve = value;
    }

    get paidCommission(): number {
        return this._paidCommission;
    }

    set paidCommission( value: number ) {
        this._paidCommission = value;
    }

    get price(): number {
        return this._price;
    }

    set price( value: number ) {
        this._price = value;
    }

    get pricePerUnit(): number {
        return this._pricePerUnit;
    }

    set pricePerUnit( value: number ) {
        this._pricePerUnit = value;
    }

    get opened(): Date {
        return this._opened;
    }

    set opened( value: Date ) {
        this._opened = value;
    }

    get closed(): Date {
        return this._closed;
    }

    set closed( value: Date ) {
        this._closed = value;
    }

    get isOpen(): boolean {
        return this._isOpen;
    }

    set isOpen( value: boolean ) {
        this._isOpen = value;
    }

    get sentinel(): string {
        return this._sentinel;
    }

    set sentinel( value: string ) {
        this._sentinel = value;
    }

    get cancelInitiated(): boolean {
        return this._cancelInitiated;
    }

    set cancelInitiated( value: boolean ) {
        this._cancelInitiated = value;
    }

    get immediateOrCancel(): boolean {
        return this._immediateOrCancel;
    }

    set immediateOrCancel( value: boolean ) {
        this._immediateOrCancel = value;
    }

    get conditional(): boolean {
        return this._conditional;
    }

    set conditional( value: boolean ) {
        this._conditional = value;
    }

    get condition(): string {
        return this._condition;
    }

    set condition( value: string ) {
        this._condition = value;
    }

    get conditionTarget(): number {
        return this._conditionTarget;
    }

    set conditionTarget( value: number ) {
        this._conditionTarget = value;
    }

}