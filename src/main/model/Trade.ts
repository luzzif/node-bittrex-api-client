import { OrderType } from "../enum/OrderType";
import { FillType } from "../enum/FillType";

export class Trade {

    private _id: number;
    private _timestamp: Date;
    private _quantity: number;
    private _unitPrice: number;
    private _totalPrice: number;
    private _fillType: FillType;
    private _orderType: OrderType;

    constructor( json: any ) {

        this._id = json.Id;
        this._timestamp = new Date( json.TimeStamp );
        this._quantity = json.Quantity;
        this._unitPrice = json.Price;
        this._totalPrice = json.Total;
        this._fillType = FillType[ json.FillType as string ];
        this._orderType = FillType[ json.OrderType as string ];

    }

    get id(): number {
        return this._id;
    }

    set id( value: number ) {
        this._id = value;
    }

    get timestamp(): Date {
        return this._timestamp;
    }

    set timestamp( value: Date ) {
        this._timestamp = value;
    }

    get quantity(): number {
        return this._quantity;
    }

    set quantity( value: number ) {
        this._quantity = value;
    }

    get unitPrice(): number {
        return this._unitPrice;
    }

    set unitPrice( value: number ) {
        this._unitPrice = value;
    }

    get totalPrice(): number {
        return this._totalPrice;
    }

    set totalPrice( value: number ) {
        this._totalPrice = value;
    }

    get fillType(): FillType {
        return this._fillType;
    }

    set fillType( value: FillType ) {
        this._fillType = value;
    }

    get orderType(): OrderType {
        return this._orderType;
    }

    set orderType( value: OrderType ) {
        this._orderType = value;
    }

}