import { Order } from "./Order";
import { OrderType } from "../enum/OrderType";

export class ExchangeStateUpdate {

    private _nounce: number;
    private _name: string;
    private _placedOrders: Order[];
    private _fills: Order[];

    constructor( json: any ) {

        this._nounce = json.Nounce;
        this._name = json.MarketName;

        this._placedOrders = [];
        for( let buyJson of json.Buys ) {
            this._placedOrders.push(
                new Order( buyJson, OrderType.BUY )
            );
        }
        for( let sellJson of json.Sells ) {
            this._placedOrders.push(
                new Order( sellJson, OrderType.SELL )
            );
        }

        this._fills = [];
        for( let fillJson of json.Fills ) {
            this._placedOrders.push(
                new Order(
                    fillJson,
                    json.OrderType === "BUY" ? OrderType.BUY : OrderType.SELL
                )
            );
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

    get placedOrders(): Order[] {
        return this._placedOrders;
    }

    set placedOrders( value: Order[] ) {
        this._placedOrders = value;
    }

    get fills(): Order[] {
        return this._fills;
    }

    set fills( value: Order[] ) {
        this._fills = value;
    }

}