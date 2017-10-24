/**
 * Represents an error returned from Bittrex during the API usage.
 */
export class ApiError extends Error {

    constructor( bittrexError: string ) {
        super( `Bittrex returned ${ bittrexError }`  );
    }

}