/**
 * Represents a single market.
 */
export class Market {

    private _marketCurrencyShort: string;
    private _baseCurrencyShort: string;
    private _marketCurrencyLong: string;
    private _baseCurrencyLong: string;
    private _minimumTradeSize: number;
    private _name: string;
    private _active: boolean;
    private _created: Date;

    constructor( json: any ) {

        this._marketCurrencyShort = json.MarketCurrency;
        this._marketCurrencyLong = json.MarketCurrencyLong;
        this._baseCurrencyShort = json.BaseCurrency;
        this._baseCurrencyLong = json.BaseCurrencyLong;
        this._minimumTradeSize = json.MinTradeSize;
        this._name = json.MarketName;
        this._active = json.IsActive;
        this._created = new Date( json.Created );

    }

    get marketCurrencyShort(): string {
        return this._marketCurrencyShort;
    }

    set marketCurrencyShort( value: string ) {
        this._marketCurrencyShort = value;
    }

    get baseCurrencyShort(): string {
        return this._baseCurrencyShort;
    }

    set baseCurrencyShort( value: string ) {
        this._baseCurrencyShort = value;
    }

    get marketCurrencyLong(): string {
        return this._marketCurrencyLong;
    }

    set marketCurrencyLong( value: string ) {
        this._marketCurrencyLong = value;
    }

    get baseCurrencyLong(): string {
        return this._baseCurrencyLong;
    }

    set baseCurrencyLong( value: string ) {
        this._baseCurrencyLong = value;
    }

    get minimumTradeSize(): number {
        return this._minimumTradeSize;
    }

    set minimumTradeSize( value: number ) {
        this._minimumTradeSize = value;
    }

    get name(): string {
        return this._name;
    }

    set name( value: string ) {
        this._name = value;
    }

    get active(): boolean {
        return this._active;
    }

    set active( value: boolean ) {
        this._active = value;
    }

    get created(): Date {
        return this._created;
    }

    set created( value: Date ) {
        this._created = value;
    }

}