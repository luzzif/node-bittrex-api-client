export class RequestRetryError extends Error {

    constructor( error: any ) {
        super( "A requestretry error occurred: " + error );
    }

}