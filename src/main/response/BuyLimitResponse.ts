export class BuyLimitResponse {

    private orderId: string;

    constructor( json: any ) {
        this.orderId = json.uuid;
    }

    public getOrderId(): string {
        return this.orderId;
    }

}