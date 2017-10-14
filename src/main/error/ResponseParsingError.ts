/**
 * Thrown on Bittrex's response parsing error.
 */
export class ResponseParsingError extends Error {

    constructor( message?: string ) {
        super( message );
    }

}