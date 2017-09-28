/**
 * Represents a single ticker.
 */
export class Ticker {

    private _bid: number;
    private _ask: number;
    private _last: number;

    constructor( json: any ) {
        this._bid = json.Bid;
        this._ask = json.Ask;
        this._last = json.Last;
    }

    get bid(): number {
        return this._bid;
    }

    set bid( value: number ) {
        this._bid = value;
    }

    get ask(): number {
        return this._ask;
    }

    set ask( value: number ) {
        this._ask = value;
    }

    get last(): number {
        return this._last;
    }

    set last( value: number ) {
        this._last = value;
    }

}