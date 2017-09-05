export class MarketSummaryResponse {

    private name: string;
    private high: number;
    private low: number;
    private volume: number;
    private lastPrice: number;
    private baseVolume: number;
    private timeStamp: Date;
    private bid: number;
    private ask: number;
    private openBuyOrders: number;
    private openSellOrders: number;
    private previousDayPrice: number;
    private createdAt: Date;

    constructor( json: any ) {

        this.name = json.MarketName;
        this.high = json.High;
        this.low = json.Low;
        this.volume = json.Volume;
        this.lastPrice = json.Last;
        this.baseVolume = json.BaseVolume;
        this.timeStamp = json.TimeStamp;
        this.bid = json.Bid;
        this.ask = json.Ask;
        this.openBuyOrders = json.OpenBuyOrders;
        this.openSellOrders = json.OpenSellOrders;
        this.previousDayPrice = json.PrevDay;
        this.createdAt = json.Created;

    }

    public getName(): string {
        return this.name;
    }

    public getHigh(): number {
        return this.high;
    }

    public getLow(): number {
        return this.low;
    }

    public getVolume(): number {
        return this.volume;
    }

    public getLastPrice(): number {
        return this.lastPrice;
    }

    public getBaseVolume(): number {
        return this.baseVolume;
    }

    public getTimeStamp(): Date {
        return this.timeStamp;
    }

    public getBid(): number {
        return this.bid;
    }

    public getAsk(): number {
        return this.ask;
    }

    public getOpenBuyOrders(): number {
        return this.openBuyOrders;
    }

    public getOpenSellOrders(): number {
        return this.openSellOrders;
    }

    public getPreviousDayPrice(): number {
        return this.previousDayPrice;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }

}