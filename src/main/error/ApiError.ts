import { ApiErrorCode } from "../enum/ApiErrorCode";

export class ApiError extends Error {

    private _apiErrorCode: ApiErrorCode;

    constructor( bittrexError?: string ) {
        super( "Bittrex's API returned an error. Error is: " + bittrexError );
        this._apiErrorCode = ApiErrorCode[ bittrexError ];
    }

    get apiErrorCode(): ApiErrorCode {
        return this._apiErrorCode;
    }

}