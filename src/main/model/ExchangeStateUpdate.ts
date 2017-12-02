import { PlacedOrder } from "./PlacedOrder";
import { OrderType } from "../enum/OrderType";
import { Fill } from "./Fill";

/**
 * Represents a single exchange state update.
 */
export class ExchangeStateUpdate {

    private _timestamp: Date;
    private _name: string;
    private _buyOrders: PlacedOrder[];
    private _sellOrders: PlacedOrder[];
    private _buyFills: Fill[];
    private _sellFills: Fill[];

    constructor( json: any ) {

        this._timestamp = new Date( json.Nounce );
        this._name = json.MarketName;

        this._buyOrders = [];
        for( let buyJson of json.Buys ) {
            this._buyOrders.push(
                new PlacedOrder( buyJson )
            );
        }

        this._sellOrders = [];
        for( let sellJson of json.Sells ) {
            this._sellOrders.push(
                new PlacedOrder( sellJson )
            );
        }

        this._buyFills = [];
        this._sellFills = [];
        for( let fillJson of json.Fills ) {

            let fillType: OrderType = OrderType[ fillJson.OrderType as string ];
            if( fillType === OrderType.BUY || fillType == OrderType.LIMIT_BUY ) {
                this._buyFills.push( new Fill( fillJson ) );
            }
            else if( fillType === OrderType.SELL || fillType == OrderType.LIMIT_SELL ) {
                this._sellFills.push( new Fill( fillJson ) );
            }

        }

    }

    get timestamp(): Date {
        return this._timestamp;
    }

    set timestamp( value: Date ) {
        this._timestamp = value;
    }

    get name(): string {
        return this._name;
    }

    set name( value: string ) {
        this._name = value;
    }

    get buyOrders(): PlacedOrder[] {
        return this._buyOrders;
    }

    set buyOrders( value: PlacedOrder[] ) {
        this._buyOrders = value;
    }

    get sellOrders(): PlacedOrder[] {
        return this._sellOrders;
    }

    set sellOrders( value: PlacedOrder[] ) {
        this._sellOrders = value;
    }

    get buyFills(): Fill[] {
        return this._buyFills;
    }

    set buyFills( value: Fill[] ) {
        this._buyFills = value;
    }

    get sellFills(): Fill[] {
        return this._sellFills;
    }

    set sellFills( value: Fill[] ) {
        this._sellFills = value;
    }

}