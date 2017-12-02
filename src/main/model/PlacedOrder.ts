import { OrderType } from "../enum/OrderType";

/**
 * Represents a single placed order.
 */
export class PlacedOrder {

    private _quantity: number;
    private _rate: number;

    constructor( json: any, type?: OrderType ) {
        this._quantity = json.Quantity;
        this._rate = json.Rate;
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