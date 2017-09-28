/**
 * Represents an account balance.
 */
export class Balance {

    private _currency: string;
    private _balance: number;
    private _available: number;
    private _pending: number;
    private _walletAddress: string;
    private _requested: boolean;

    constructor( json: any ) {

        this._currency = json.Currency;
        this._balance = json.Balance;
        this._available = json.Available;
        this._pending = json.Pending;
        this._walletAddress = json.CryptoAddress;
        this._requested = json.Requested;

    }

    get currency(): string {
        return this._currency;
    }

    set currency( value: string ) {
        this._currency = value;
    }

    get balance(): number {
        return this._balance;
    }

    set balance( value: number ) {
        this._balance = value;
    }

    get available(): number {
        return this._available;
    }

    set available( value: number ) {
        this._available = value;
    }

    get pending(): number {
        return this._pending;
    }

    set pending( value: number ) {
        this._pending = value;
    }

    get walletAddress(): string {
        return this._walletAddress;
    }

    set walletAddress( value: string ) {
        this._walletAddress = value;
    }

    get requested(): boolean {
        return this._requested;
    }

    set requested( value: boolean ) {
        this._requested = value;
    }

}