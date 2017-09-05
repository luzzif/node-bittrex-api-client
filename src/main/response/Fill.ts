export class Fill {

    private buy: boolean;
    private quantity: number;
    private price: number;
    private timeStamp: Date;

    constructor( json ) {

        this.buy = json.OrderType === "BUY";
        this.quantity = json.Quantity;
        this.price = json.Rate;
        this.timeStamp = json.TimeStamp;

    }

    public getBuy(): boolean {
        return this.buy;
    }

    public getQuantity(): number {
        return this.quantity;
    }

    public getPrice(): number {
        return this.price;
    }

    public getTimeStamp(): Date {
        return this.timeStamp;
    }

}