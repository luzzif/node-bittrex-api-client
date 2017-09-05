export class MarketUpdatesStreamRequest {

    private watchableMarkets: string[];

    constructor( watchableMarkets?: string[] ) {

        if( watchableMarkets !== undefined ) {
            this.watchableMarkets = watchableMarkets;
        }

    }

    public getWatchableMarkets(): string[] {
        return this.watchableMarkets;
    }

    public setWatchableMarkets( watchableMarkets: string[] ): void {
        this.watchableMarkets = watchableMarkets;
    }

}