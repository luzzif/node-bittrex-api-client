export class ApiError extends Error {

    constructor( bittrexError?: string ) {
        super( "Bittrex's API returned an error. Error is: " + bittrexError );
    }

}