export class TimeoutError extends Error {

    constructor() {
        super( "Bittrex responded with a timeout signal" );
    }

}