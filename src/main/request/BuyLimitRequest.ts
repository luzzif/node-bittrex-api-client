export class BuyLimitRequest {

    private market: string;
    private quantity: number;
    private price: number;

    constructor( market?: string, quantity?: number, price?: number ) {
        this.market = market;
        this.quantity = quantity;
        this.price = price;
    }

    public getMarket(): string {
        return this.market;
    }

    public setMarket( market: string ): void {
        this.market = market;
    }

    public getQuantity(): number {
        return this.quantity;
    }

    public setQuantity( quantity: number ): void {
        this.quantity = quantity;
    }

    public getPrice(): number {
        return this.price;
    }

    public setPrice( price: number ): void {
        this.price = price;
    }

}