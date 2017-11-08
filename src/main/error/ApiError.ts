/**
 * Represents an error returned from Bittrex during the API usage.
 */
export class ApiError extends Error {

    constructor( response: any ) {
        super( `Bittrex returned ${ JSON.stringify( response ) }`  );
    }

}