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

export class BittrexApiClient {

    private apiKey: string;
    private apiSecret: string;

    constructor( apiKey: string, apiSecret: string ) {
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
    }

    public getMarkets(): Promise< Market[] > {

        return this.makeRequest(
            "public/getmarkets",
        )
        .then( ( marketsJson: any ): Market[] => {

            let markets: Market[] = [];
            for( let marketJson of marketsJson ) {
                markets.push( new Market( marketJson ) );
            }
            return markets;

        } )
        .catch( ( errorMessage: string ): null => {
            console.log( "Error calling Bittrex API: " + errorMessage );
            return null;
        } );

    }

    public getCurrencies(): Promise< Currency[] > {

        return this.makeRequest(
            "public/getcurrencies",
        )
        .then( ( currenciesJson: any ): Currency[] => {

            let currencies: Currency[] = [];
            for( let currencyJson of currenciesJson ) {
                currencies.push( new Currency( currencyJson ) );
            }
            return currencies;

        } )
        .catch( ( errorMessage: string ): null => {
            console.log( "Error calling Bittrex API: " + errorMessage );
            return null;
        } );

    }

    public getTicker( market: string ): Promise< Ticker > {

        return this.makeRequest(
            "public/getticker",
            [ "market", market ]
        )
        .then( ( tickerJson: any ): Ticker => {
            return new Ticker( tickerJson );
        } )
        .catch( ( errorMessage: string ): null => {
            console.log( "Error calling Bittrex API: " + errorMessage );
            return null;
        } );

    }

    public getMarketSummaries(): Promise< MarketSummary[] > {

        return this.makeRequest(
            "public/getmarketsummaries",
        )
        .then( ( marketSummariesJson: any ): MarketSummary[] => {

            let marketSummaries: MarketSummary[] = [];
            for( let marketSummaryJson of marketSummariesJson ) {
                marketSummaries.push( new MarketSummary( marketSummaryJson ) );
            }
            return marketSummaries;

        } )
        .catch( ( errorMessage: string ): null => {
            console.log( "Error calling Bittrex API: " + errorMessage );
            return null;
        } );

    }

    public getMarketSummary( market: string ): Promise< MarketSummary > {

        return this.makeRequest(
            "public/getmarketsummary",
            [ "market", market ]
        )
        .then( ( marketSummaryJson: any ): MarketSummary => {
            return new MarketSummary( marketSummaryJson[ 0 ] );
        } )
        .catch( ( errorMessage: string ): null => {
            console.log( "Error calling Bittrex API: " + errorMessage );
            return null;
        } );

    }

    public getOrderBook( market: string, type: OrderBookType ): Promise< Order[] > {

        return this.makeRequest(
            "public/getorderbook",
            [ "market", market ],
            [ "type", OrderBookType[ type ] ]
        )
        .then( ( ordersJson: any ): Order[] => {

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

        } )
        .catch( ( errorMessage: string ): null => {
            console.log( "Error calling Bittrex API: " + errorMessage );
            return null;
        } );

    }

    public getMarketHistory( market: string ): Promise< Trade[] > {

        return this.makeRequest(
            "/public/getmarkethistory",
            [ "market", market ]
        )
        .then( ( tradesJson: any ): Trade[] => {

            let trades: Trade[] = [];
            for( let tradeJson of tradesJson ) {
                trades.push( new Trade( tradeJson ) );
            }
            return trades;

        } )
        .catch( ( errorMessage: string ): null => {
            console.log( "Error calling Bittrex API: " + errorMessage );
            return null;
        } );

    }

    public buyWithLimit( market: string, quantity: number, rate: number ): Promise< string > {

        return this.makeRequest(
            "/market/buylimit",
            [ "market", market ],
            [ "quantity", quantity.toString() ],
            [ "rate", rate.toString() ]
        )
        .then( ( orderIdJson: any ): string => {
            return orderIdJson.uuid;
        } )
        .catch( ( errorMessage: string ): null => {
            console.log( "Error calling Bittrex API: " + errorMessage );
            return null;
        } );

    }

    public sellWithLimit( market: string, quantity: number, rate: number ): Promise< string > {

        return this.makeRequest(
            "/market/selllimit",
            [ "market", market ],
            [ "quantity", quantity.toString() ],
            [ "rate", rate.toString() ]
        )
            .then( ( orderIdJson: any ): string => {
                return orderIdJson.uuid;
            } )
            .catch( ( errorMessage: string ): null => {
                console.log( "Error calling Bittrex API: " + errorMessage );
                return null;
            } );

    }

    public cancelOrder( orderId: string ): Promise< boolean > {

        return this.makeRequest(
            "/market/cancelOrder",
            [ "uuid", orderId ]
        )
        .then( (): boolean => {
            return true;
        } )
        .catch( ( errorMessage ): boolean => {
            console.log( "Error calling Bittrex API: " + errorMessage );
            return false;
        } );

    }

    public getOpenOrders( market: string ): Promise< OpenOrder[] > {

        return this.makeRequest(
            "/market/getopenorders",
            [ "market", market ]
        )
        .then( ( openOrdersJson: any ): OpenOrder[] => {

            let openOrders: OpenOrder[] = [];
            for( let openOrderJson of openOrdersJson ) {
                openOrders.push( new OpenOrder( openOrderJson ) );
            }
            return openOrders;

        } )
        .catch( ( errorMessage ): null => {
            console.log( "Error calling Bittrex API: " + errorMessage );
            return null;
        } );

    }

    public getBalances(): Promise< Balance[] > {

        return this.makeRequest(
            "/account/getbalances",
        )
        .then( ( balancesJson: any ): Balance[] => {

            let balances: Balance[] = [];
            for( let balanceJson of balancesJson ) {
                balances.push( new Balance( balanceJson ) );
            }
            return balances;

        } )
        .catch( ( errorMessage ): null => {
            console.log( "Error calling Bittrex API: " + errorMessage );
            return null;
        } );

    }

    public getBalance( currency: string  ): Promise< Balance > {

        return this.makeRequest(
            "/account/getbalance",
            [ "currency", currency ]
        )
        .then( ( balanceJson: any ): Balance => {
            return new Balance( balanceJson );
        } )
        .catch( ( errorMessage ): null => {
            console.log( "Error calling Bittrex API: " + errorMessage );
            return null;
        } );

    }

    public getDepositAddress( currency: string ): Promise< string > {

        return this.makeRequest(
            "/account/getdepositaddress",
            [ "currency", currency ]
        )
        .then( ( depositAddressJson: any ): string => {
            return depositAddressJson.Address;
        } )
        .catch( ( errorMessage ): null => {
            console.log( "Error calling Bittrex API: " + errorMessage );
            return null;
        } );

    }

    public withdraw( currency: string, quantity: number, address: string, paymentId?: string ): Promise< string > {

        return this.makeRequest(
            "/account/withdraw",
            [ "currency", currency ],
            [ "quantity", quantity.toString() ],
            [ "address", address ],
            [ "paymentId", paymentId ],
        )
        .then( ( withdrawJson: any ): string => {
            return withdrawJson.uuid;
        } )
        .catch( ( errorMessage ): null => {
            console.log( "Error calling Bittrex API: " + errorMessage );
            return null;
        } );

    }

    public getExchangeStateUpdatesStream( watchableMarkets: string[], callback: ( marketUpdates: ExchangeStateUpdate[] ) => any ): void {

        let websocketClient: SignalR.client = new SignalR.client(
            "wss://socket.bittrex.com/signalr",
            [ "CoreHub" ]
        );

        websocketClient.serviceHandlers.connected = () => {

            for( let watchableMarket of watchableMarkets ) {
                websocketClient.call(
                    "CoreHub",
                    "SubscribeToExchangeDeltas",
                    watchableMarket
                );
            }

        };

        websocketClient.serviceHandlers.messageReceived = ( messageJson: any ): void => {

            if( messageJson.type !== "utf8" ) {
                return;
            }
            messageJson = JSON.parse( messageJson.utf8Data );
            let updatesJson = messageJson.M;
            if( updatesJson === undefined || updatesJson.length === 0 ) {
                return;
            }

            let exchangeStateUpdates: ExchangeStateUpdate[] = [];
            for( let updateJson of updatesJson ) {

                if( updateJson.M === "updateExchangeState" ) {

                    for( let exchangeStateUpdateJson of updateJson.A ) {
                        exchangeStateUpdates.push(
                            new ExchangeStateUpdate(
                                exchangeStateUpdateJson
                            )
                        );
                    }

                }

            }
            if( exchangeStateUpdates.length === 0 ) {
                return;
            }
            callback( exchangeStateUpdates );

        };

    }

    private makeRequest( operation: string, ...parameters: [ string, string ][] ): Promise< any > {

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

                    bittrexData = JSON.parse( bittrexData.toString() );
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