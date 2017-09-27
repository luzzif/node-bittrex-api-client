import * as CryptoJs from "crypto-js";
import * as Https from "https";
import * as SignalR from "signalr-client";
import { URL } from "url";
import { Market } from "./model/Market";
import { Currency } from "./model/Currency";
import { Ticker } from "./model/Ticker";
import { MarketSummary } from "./model/MarketSummary";
import { Order } from "./model/Order";
import { OrderBookType } from "./enum/OrderBookType";
import { Trade } from "./model/Trade";
import { OrderType } from "./enum/OrderType";
import { OpenOrder } from "./model/OpenOrder";
import { Balance } from "./model/Balance";
import { ExchangeStateUpdate } from "./model/ExchangeStateUpdate";
import { isNullOrUndefined } from "util";
import { ResponseParsingError } from "./error/ResponseParsingError";

export class BittrexApiClient {

    private apiKey: string;
    private apiSecret: string;
    private websocketClient: SignalR.client;

    constructor( apiKey: string, apiSecret: string ) {

        if( isNullOrUndefined( apiKey ) || isNullOrUndefined( apiSecret ) ) {
            throw new Error( "API key and API secret cannot be undefined or null" );
        }
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;

    }

    public async getMarkets(): Promise< Market[] > {

        let marketsJson: any = await this.makeRequest( "public/getmarkets" );
        let markets: Market[] = [];
        for( let marketJson of marketsJson ) {
            markets.push( new Market( marketJson ) );
        }
        return markets;

    }

    public async getCurrencies(): Promise< Currency[] > {

        let currenciesJson: any = await this.makeRequest( "public/getcurrencies" );
        let currencies: Currency[] = [];
        for( let currencyJson of currenciesJson ) {
            currencies.push( new Currency( currencyJson ) );
        }
        return currencies;

    }

    public async getTicker( market: string ): Promise< Ticker > {

        return new Ticker( await this.makeRequest(
            "public/getticker",
            [ "market", market ]
        ) );

    }

    public async getMarketSummaries(): Promise< MarketSummary[] > {

        let marketSummariesJson: any = await this.makeRequest(
            "public/getmarketsummaries",
        );
        let marketSummaries: MarketSummary[] = [];
        for( let marketSummaryJson of marketSummariesJson ) {
            marketSummaries.push( new MarketSummary( marketSummaryJson ) );
        }
        return marketSummaries;

    }

    public async getMarketSummary( market: string ): Promise< MarketSummary > {

        return new MarketSummary(
            await this.makeRequest(
                "public/getmarketsummary",
                [ "market", market ]
            )[ 0 ]
        );

    }

    public async getOrderBook( market: string, type: OrderBookType ): Promise< Order[] > {

        let ordersJson: any = await this.makeRequest(
            "public/getorderbook",
            [ "market", market ],
            [ "type", OrderBookType[ type ] ]
        );
        let orders: Order[] = [];
        if( type === OrderBookType.BOTH ) {

            for( let buyOrderJson of ordersJson.buy ) {
                orders.push( new Order( buyOrderJson, OrderType.BUY ) );
            }
            for( let sellOrderJson of ordersJson.sell ) {
                orders.push( new Order( sellOrderJson, OrderType.SELL ) );
            }
            return orders;

        }
        for( let orderJson of ordersJson ) {
            ordersJson.push(
                new Order(
                    orderJson,
                    type === OrderBookType.BUY ? OrderType.BUY : OrderType.SELL
                )
            );
        }
        return orders;

    }

    public async getMarketHistory( market: string ): Promise< Trade[] > {

        let tradesJson: any = await this.makeRequest(
            "/public/getmarkethistory",
            [ "market", market ]
        );
        let trades: Trade[] = [];
        for( let tradeJson of tradesJson ) {
            trades.push( new Trade( tradeJson ) );
        }
        return trades;

    }

    public async buyWithLimit( market: string, quantity: number, rate: number ): Promise< string > {

        return ( await this.makeRequest(
            "/market/buylimit",
            [ "market", market ],
            [ "quantity", quantity.toString() ],
            [ "rate", rate.toString() ]
        ) ).uuid;

    }

    public async sellWithLimit( market: string, quantity: number, rate: number ): Promise< string > {

        return ( await this.makeRequest(
            "/market/selllimit",
            [ "market", market ],
            [ "quantity", quantity.toString() ],
            [ "rate", rate.toString() ]
        ) ).uuid;

    }

    public async cancelOrder( orderId: string ): Promise< boolean > {

        await this.makeRequest(
            "/market/cancelOrder",
            [ "uuid", orderId ]
        );
        return true;

    }

    public async getOpenOrders( market: string ): Promise< OpenOrder[] > {

        let openOrdersJson: any = await this.makeRequest(
            "/market/getopenorders",
            [ "market", market ]
        );
        let openOrders: OpenOrder[] = [];
        for( let openOrderJson of openOrdersJson ) {
            openOrders.push( new OpenOrder( openOrderJson ) );
        }
        return openOrders;

    }

    public async getBalances(): Promise< Balance[] > {

        let balancesJson: any = await this.makeRequest(
            "/account/getbalances",
        );
        let balances: Balance[] = [];
        for( let balanceJson of balancesJson ) {
            balances.push( new Balance( balanceJson ) );
        }
        return balances;

    }

    public async getBalance( currency: string  ): Promise< Balance > {

        return new Balance( await this.makeRequest(
            "/account/getbalance",
            [ "currency", currency ]
        ) );

    }

    public async getDepositAddress( currency: string ): Promise< string > {

        return ( await this.makeRequest(
            "/account/getdepositaddress",
            [ "currency", currency ]
        ) ).Address;

    }

    public async withdraw( currency: string, quantity: number, address: string, paymentId?: string ): Promise< string > {

        return ( await this.makeRequest(
            "/account/withdraw",
            [ "currency", currency ],
            [ "quantity", quantity.toString() ],
            [ "address", address ],
            [ "paymentId", paymentId ],
        ) ).uuid;

    }

    public async getExchangeStateUpdatesStream( watchableMarkets: string[], callback: ( marketUpdates: ExchangeStateUpdate[] ) => any ): void {

        this.websocketClient = new SignalR.client(
            "wss://socket.bittrex.com/signalr",
            [ "CoreHub" ]
        );

        this.websocketClient.serviceHandlers.connected = () => {

            for( let watchableMarket of watchableMarkets ) {
                this.websocketClient.call(
                    "CoreHub",
                    "SubscribeToExchangeDeltas",
                    watchableMarket
                );
            }

        };

        this.websocketClient.serviceHandlers.messageReceived = ( messageJson: any ): void => {

            if( messageJson.type !== "utf8" ) {
                return;
            }
            try {
                messageJson = JSON.parse( messageJson.utf8Data );
            }
            catch( error ) {
                throw new ResponseParsingError(
                    `An error occurred parsing Bittrex's response. The response was: ${ messageJson }`
                );
            }
            let updatesJson = messageJson.M;
            if( updatesJson === undefined || updatesJson.length === 0 ) {
                return;
            }

            let exchangeStateUpdates: ExchangeStateUpdate[] = [];
            for( let updateJson of updatesJson ) {

                if( updateJson.M !== "updateExchangeState" ) {
                    continue;
                }
                for( let exchangeStateUpdateJson of updateJson.A ) {
                    exchangeStateUpdates.push(
                        new ExchangeStateUpdate(
                            exchangeStateUpdateJson
                        )
                    );
                }

            }
            if( exchangeStateUpdates.length === 0 ) {
                return;
            }
            callback( exchangeStateUpdates );

        };

    }

    private async makeRequest( operation: string, ...parameters: [ string, string ][] ): Promise< any > {

        let apiEndpointUrl: URL = new URL(
            "/api/v1.1/" + operation,
            "https://www.bittrex.com/"
        );

        apiEndpointUrl.searchParams.append(
            "apikey",
            this.apiKey
        );
        apiEndpointUrl.searchParams.append(
            "nonce",
            new Date().getTime().toString()
        );

        for( let parameter of parameters ) {

            if( parameter === undefined || parameter === null ) {
                continue;
            }
            apiEndpointUrl.searchParams.append( parameter[ 0 ], parameter[ 1 ] );

        }
        let apiSign: string = CryptoJs.HmacSHA512(
            apiEndpointUrl.toString(),
            this.apiSecret
        );

        return new Promise< any >( ( fulfill: ( json: any ) => any, reject: ( errorMessage: string ) => any ) => {

            let clientRequest: Https.ClientRequest = Https.request( apiEndpointUrl, ( bittrexResponse: Https.IncomingMessage ): void => {

                bittrexResponse.on( "data", ( bittrexData: any ): void => {

                    try {
                        bittrexData = JSON.parse( bittrexData.toString() );
                    }
                    catch( error ) {
                        throw new ResponseParsingError(
                            `An error occurred parsing Bittrex's response. The response was: ${ bittrexData.toString() }`
                        );
                    }

                    if( bittrexData.success ) {
                        fulfill( bittrexData.result );
                    }
                    else {
                        reject( bittrexData.message );
                    }

                } );

            } );
            clientRequest.setHeader( "apisign", apiSign );
            clientRequest.end();

        } );

    }

}