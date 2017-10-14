import { PlacedOrder } from "./PlacedOrder";
import { OrderType } from "../enum/OrderType";
import { Fill } from "./Fill";

/**
 * Represents a single exchange state update.
 */
export class ExchangeStateUpdate {

    private _nounce: number;
    private _name: string;
    private _placedOrders: PlacedOrder[];
    private _fills: Fill[];

    constructor( json: any ) {

        this._nounce = json.Nounce;
        this._name = json.MarketName;

        this._placedOrders = [];
        for( let buyJson of json.Buys ) {
            this._placedOrders.push(
                new PlacedOrder( buyJson, OrderType.BUY )
            );
        }
        for( let sellJson of json.Sells ) {
            this._placedOrders.push(
                new PlacedOrder( sellJson, OrderType.SELL )
            );
        }

        this._fills = [];
        for( let fillJson of json.Fills ) {
            this._fills.push( new Fill( fillJson ) );
        }

    }

    get nounce(): number {
        return this._nounce;
    }

    set nounce( value: number ) {
        this._nounce = value;
    }

    get name(): string {
        return this._name;
    }

    set name( value: string ) {
        this._name = value;
    }

    get placedOrders(): PlacedOrder[] {
        return this._placedOrders;
    }

    set placedOrders( value: PlacedOrder[] ) {
        this._placedOrders = value;
    }

    get fills(): Fill[] {
        return this._fills;
    }

    set fills( value: Fill[] ) {
        this._fills = value;
    }

}