export class CloudscraperError extends Error {

    constructor( error: string ) {
        super( "A Cloudscraper error occurred: " + error );
    }

}