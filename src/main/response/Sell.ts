export class Sell {

    private quantity: number;
    private price: number;

    constructor( json: any ) {
        this.quantity = json.Quantity;
        this.price = json.Rate;
    }

    public getQuantity(): number {
        return this.quantity;
    }

    public getPrice(): number {
        return this.price;
    }

}