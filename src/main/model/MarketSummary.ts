export class MarketSummary {

    private _name: string;
    private _high: number;
    private _low: number;
    private _volume: number;
    private _last: number;
    private _baseVolume: number;
    private _timestamp: Date;
    private _bid: number;
    private _ask: number;
    private _openBuyOrders: number;
    private _openSellOrders: number;
    private _previousDay: number;
    private _created: Date;

    constructor( json: any ) {

        this._name = json.MarketName;
        this._high = json.High;
        this._low = json.Low;
        this._volume = json.Volume;
        this._last = json.Last;
        this._baseVolume = json.BaseVolume;
        this._timestamp = new Date( json.TimeStamp );
        this._bid = json.Bid;
        this._ask = json.Ask;
        this._openBuyOrders = json.OpenBuyOrders;
        this._openSellOrders = json.OpenSellOrders;
        this._previousDay = json.PrevDay;
        this._created = new Date( json.Created );

    }

    get name(): string {
        return this._name;
    }

    set name( value: string ) {
        this._name = value;
    }

    get high(): number {
        return this._high;
    }

    set high( value: number ) {
        this._high = value;
    }

    get low(): number {
        return this._low;
    }

    set low( value: number ) {
        this._low = value;
    }

    get volume(): number {
        return this._volume;
    }

    set volume( value: number ) {
        this._volume = value;
    }

    get last(): number {
        return this._last;
    }

    set last( value: number ) {
        this._last = value;
    }

    get baseVolume(): number {
        return this._baseVolume;
    }

    set baseVolume( value: number ) {
        this._baseVolume = value;
    }

    get timestamp(): Date {
        return this._timestamp;
    }

    set timestamp( value: Date ) {
        this._timestamp = value;
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

    get openBuyOrders(): number {
        return this._openBuyOrders;
    }

    set openBuyOrders( value: number ) {
        this._openBuyOrders = value;
    }

    get openSellOrders(): number {
        return this._openSellOrders;
    }

    set openSellOrders( value: number ) {
        this._openSellOrders = value;
    }

    get previousDay(): number {
        return this._previousDay;
    }

    set previousDay( value: number ) {
        this._previousDay = value;
    }

    get created(): Date {
        return this._created;
    }

    set created( value: Date ) {
        this._created = value;
    }

}