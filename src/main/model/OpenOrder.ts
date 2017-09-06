import { OrderType } from "../enum/OrderType";
import { Condition } from "../enum/Condition";

export class OpenOrder {

    private id: string;
    private type: OrderType;
    private quantity: number;
    private remainingQuantity: number;
    private limit: number;
    private paidCommission: number;
    private totalPrice: number;
    private unitPrice: number;
    private opened: Date;
    private closed: Date;
    private cancelInitiated: boolean;
    private immediateOrCancel: boolean;
    private conditional: boolean;
    private condition: Condition;
    private conditionTarget: number;

    constructor( json: any ) {

        this.id = json.OrderUuid;
        this.type = json.OrderType;
        this.quantity = json.Quantity;
        this.remainingQuantity = json.QuantityRemaining;
        this.limit = json.Limit;
        this.paidCommission = json.CommissionPaid;
        this.totalPrice = json.Price;
        this.unitPrice = json.PricePerUnit;
        this.opened = new Date( json.Opened );
        this.closed = new Date( json.Closed );
        this.cancelInitiated = json.CancelInitiated;
        this.immediateOrCancel = json.ImmediateOrCancel;
        this.conditional = json.IsConditional;
        this.condition = json.Condition;
        this.conditionTarget = json.ConditionTarget;
        
    }
}