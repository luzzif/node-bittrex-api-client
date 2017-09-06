export class Currency {

    private _nameShort: string;
    private _nameLong: string;
    private _minimumConfirmation: number;
    private _transactionFee: number;
    private _active: number;
    private _type: string;
    private _baseAddress: string;

    constructor( json: any ) {

        this._nameShort = json.Currency;
        this._nameLong = json.CurrencyLong;
        this._minimumConfirmation = json.MinConfirmation;
        this._transactionFee = json.TxFee;
        this._active = json.IsActive;
        this._type = json.CoinType;
        this._baseAddress = json.BaseAddress;

    }

    get nameShort(): string {
        return this._nameShort;
    }

    set nameShort( value: string ) {
        this._nameShort = value;
    }

    get nameLong(): string {
        return this._nameLong;
    }

    set nameLong( value: string ) {
        this._nameLong = value;
    }

    get minimumConfirmation(): number {
        return this._minimumConfirmation;
    }

    set minimumConfirmation( value: number ) {
        this._minimumConfirmation = value;
    }

    get transactionFee(): number {
        return this._transactionFee;
    }

    set transactionFee( value: number ) {
        this._transactionFee = value;
    }

    get active(): number {
        return this._active;
    }

    set active( value: number ) {
        this._active = value;
    }

    get type(): string {
        return this._type;
    }

    set type( value: string ) {
        this._type = value;
    }

    get baseAddress(): string {
        return this._baseAddress;
    }

    set baseAddress( value: string ) {
        this._baseAddress = value;
    }

}