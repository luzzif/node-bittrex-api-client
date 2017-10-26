/**
 * Represents an error which may happen during Cloudscraper's usage.
 */
export class CloudscraperError extends Error {

    constructor( error: string ) {
        super( "A Cloudscraper error occurred: " + error );
    }

}