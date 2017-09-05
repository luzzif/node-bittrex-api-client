import { Buy } from "./Buy";
import { Sell } from "./Sell";
import { Fill } from "./Fill";

export class MarketUpdate {

    private name: string;
    private timeStamp: Date;
    private buys: Buy[];
    private sells: Sell[];
    private fills: Fill[];

    constructor( json: any ) {

        this.name = json.MarketName;
        this.timeStamp = json.TimeStamp;

        this.buys = [];
        for( let buyJson of json.Buys ) {
            this.buys.push( new Buy( buyJson ) );
        }

        this.sells = [];
        for( let sellJson of json.Sells ) {
            this.sells.push( new Sell( sellJson ) );
        }

        this.fills = [];
        for( let fillJson of json.Fills ) {
            this.fills.push( new Fill( fillJson ) );
        }

    }

    public getName(): string {
        return this.name;
    }

    public getTimeStamp(): Date {
        return this.timeStamp;
    }

    public getBuys(): Buy[] {
        return this.buys;
    }

    public getSells(): Sell[] {
        return this.sells;
    }

    public getFills(): Fill[] {
        return this.fills;
    }

}