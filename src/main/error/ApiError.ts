import { ApiErrorCode } from "../enum/ApiErrorCode";

export class ApiError extends Error {

    private _apiErrorCode: ApiErrorCode;

    constructor( calledEndpoint: string, bittrexError: string ) {
        super( "[ " + bittrexError + " ]@[ " + calledEndpoint + " ]"  );
        this._apiErrorCode = ApiErrorCode[ bittrexError ];
    }

    get apiErrorCode(): ApiErrorCode {
        return this._apiErrorCode;
    }

}