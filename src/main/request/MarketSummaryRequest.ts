export class MarketSummaryRequest {

    private name: string;

    constructor( name?: string ) {

        if( name === undefined ) {
            this.name = name;
        }

    }

    public getName(): string {
        return this.name;
    }

    public setName( name: string ): void {
        this.name = name;
    }

}