import { OrderType } from "../enum/OrderType";

/**
 * Represents a single order book order.
 */
export class OrderBookOrder {

    private _type: OrderType;
    private _quantity: number;
    private _rate: number;

    constructor( json: any, type?: OrderType ) {
        this._type = type === undefined ? OrderType[ json.OrderType as string ] : type;
        this._quantity = json.Quantity;
        this._rate = json.Rate;
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

    get rate(): number {
        return this._rate;
    }

    set rate( value: number ) {
        this._rate = value;
    }

}