/**
 * Thrown on Bittrex's response parsing error.
 */
export class ResponseParsingError extends Error {

    constructor( response: string ) {
        super( "An error occurred parsing Bittrex's response: " + response );
    }

}