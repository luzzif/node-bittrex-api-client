import { OrderType } from "../enum/OrderType";
import { ConditionType } from "../enum/ConditionType";

/**
 * Represents a single open order.
 */
export class OpenOrder {

    private _id: string;
    private _type: OrderType;
    private _quantity: number;
    private _remainingQuantity: number;
    private _limit: number;
    private _paidCommission: number;
    private _totalPrice: number;
    private _unitPrice: number;
    private _opened: Date;
    private _closed: Date;
    private _cancelInitiated: boolean;
    private _immediateOrCancel: boolean;
    private _conditional: boolean;
    private _condition: ConditionType;
    private _conditionTarget: number;

    constructor( json: any ) {

        this._id = json.OrderUuid;
        this._type = OrderType[ json.OrderType as string ];
        this._quantity = json.Quantity;
        this._remainingQuantity = json.QuantityRemaining;
        this._limit = json.Limit;
        this._paidCommission = json.CommissionPaid;
        this._totalPrice = json.Price;
        this._unitPrice = json.PricePerUnit;
        this._opened = new Date( json.Opened );
        this._closed = json.Closed !== null ? new Date( json.Closed ) : null;
        this._cancelInitiated = json.CancelInitiated;
        this._immediateOrCancel = json.ImmediateOrCancel;
        this._conditional = json.IsConditional;
        this._condition = json.Condition;
        this._conditionTarget = json.ConditionTarget;
        
    }

    get id(): string {
        return this._id;
    }

    set id( value: string ) {
        this._id = value;
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

    get paidCommission(): number {
        return this._paidCommission;
    }

    set paidCommission( value: number ) {
        this._paidCommission = value;
    }

    get totalPrice(): number {
        return this._totalPrice;
    }

    set totalPrice( value: number ) {
        this._totalPrice = value;
    }

    get unitPrice(): number {
        return this._unitPrice;
    }

    set unitPrice( value: number ) {
        this._unitPrice = value;
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

    get condition(): ConditionType {
        return this._condition;
    }

    set condition( value: ConditionType ) {
        this._condition = value;
    }

    get conditionTarget(): number {
        return this._conditionTarget;
    }

    set conditionTarget( value: number ) {
        this._conditionTarget = value;
    }

}