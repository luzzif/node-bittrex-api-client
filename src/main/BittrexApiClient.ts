import * as CryptoJs from "crypto-js";
import * as SignalR from "signalr-client";
import { URL } from "url";
import { Market } from "./model/Market";
import { Currency } from "./model/Currency";
import { Ticker } from "./model/Ticker";
import { MarketSummary } from "./model/MarketSummary";
import { OrderBookType } from "./enum/OrderBookType";
import { Trade } from "./model/Trade";
import { Order } from "./model/Order";
import { Balance } from "./model/Balance";
import { ExchangeStateUpdate } from "./model/ExchangeStateUpdate";
import { isNullOrUndefined } from "util";
import { ApiError } from "./error/ApiError";
import * as Path from "path";
import * as Cloudscraper from "cloudscraper";
import { CloudscraperError } from "./error/CloudscraperError";
import { OrderBook } from "./model/OrderBook";
import * as request from "requestretry";

/**
 * Represents a single Bittrex API client.
 */
export class BittrexApiClient {

    /**
     * The personal account's API key.
     */
    private apiKey: string;

    /**
     * The personal account's API secret.
     */
    private apiSecret: string;

    /**
     * Initializes a new Bittrex API client.
     *
     * @param apiKey    The personal account API key.
     * @param apiSecret The personal account API secret.
     */
    constructor( apiKey?: string, apiSecret?: string ) {
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
    }

    /**
     * Interface to the "public/getmarkets" Bittrex's API operation.
     *
     * @returns Either a promise of a market, or a market
     *          if using the await construct.
     */
    public async getMarkets(): Promise< Market[] > {

        let marketsJson: any = await this.makeRequest( "public/getmarkets" );
        let markets: Market[] = [];
        for( let marketJson of marketsJson ) {
            markets.push( new Market( marketJson ) );
        }
        return markets;

    }

    /**
     * Interface to the "public/getcurrencies" Bittrex's API operation.
     *
     * @returns Either a promise of a currency array, or a currency array
     *          if using the await construct.
     */
    public async getCurrencies(): Promise< Currency[] > {

        let currenciesJson: any = await this.makeRequest( "public/getcurrencies" );
        let currencies: Currency[] = [];
        for( let currencyJson of currenciesJson ) {
            currencies.push( new Currency( currencyJson ) );
        }
        return currencies;

    }

    /**
     * Interface to the "public/getticker" Bittrex's API operation.
     *
     * @param   market The market of which we would like
     *                 to retrieve the ticker.
     * @returns Either a promise of a ticker, or a ticker
     *          if using the await construct.
     */
    public async getTicker( market: string ): Promise< Ticker > {

        return new Ticker( await this.makeRequest(
            "public/getticker",
            [ "market", market ]
        ) );

    }

    /**
     * Interface to the "public/getmarketsummaries" Bittrex's API operation.
     *
     * @returns Either a promise of a market summary array, or a market summary
     *          array if using the await construct.
     */
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

    /**
     * Interface to the "public/getmarketsummary" Bittrex's API operation.
     *
     * @param   market The market of which we would like
     *                 to retrieve the summary.
     * @returns Either a promise of a market summary, or a market summary
     *          if using the await construct.
     */
    public async getMarketSummary( market: string ): Promise< MarketSummary > {

        return new MarketSummary(
            ( await this.makeRequest(
                "public/getmarketsummary",
                [ "market", market ]
            ) )[ 0 ]
        );

    }

    /**
     * Interface to the "public/getorderbook" Bittrex's API operation.
     *
     * @param   market The market of which we would like
     *                 to retrieve the order book.
     * @param   type   The type of the order book that we want to
     *                 retrieve, depending on if we want only the
     *                 buys, sells, or both.
     * @returns Either a promise of an order book, or an order book
     *          if using the await construct.
     */
    public async getOrderBook( market: string, type: OrderBookType ): Promise< OrderBook > {

        return new OrderBook( await this.makeRequest(
            "public/getorderbook",
            [ "market", market ],
            [ "type", OrderBookType[ type ].toLowerCase() ]
        ) );

    }

    /**
     * Interface to the "public/getmarkethistory" Bittrex's API operation.
     *
     * @param   market The market of which we would like
     *                 to retrieve the market history.
     * @returns Either a promise of a trade array, or a trade array
     *          if using the await construct.
     */
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

    /**
     * Interface to the "public/buylimit" Bittrex's API operation.
     *
     * @param   market   The market on which we would like to buy.
     * @param   quantity The quantity that we would like to buy.
     * @param   rate     The price at which we would like to buy.
     * @returns Either a promise of the placed order's identifier, or the placed
     *          order's identifier if using the await construct.
     */
    public async buyWithLimit( market: string, quantity: number, rate: number ): Promise< string > {

        return ( await this.makeRequest(
            "/market/buylimit",
            [ "market", market ],
            [ "quantity", quantity.toString() ],
            [ "rate", rate.toString() ]
        ) ).uuid;

    }

    /**
     * Interface to the "public/selllimit" Bittrex's API operation.
     *
     * @param   market   The market on which we would like to sell.
     * @param   quantity The quantity that we would like to sell.
     * @param   rate     The price at which we would like to sell.
     * @returns Either a promise of the placed order's identifier, or the placed
     *          order's identifier if using the await construct.
     */
    public async sellWithLimit( market: string, quantity: number, rate: number ): Promise< string > {

        return ( await this.makeRequest(
            "/market/selllimit",
            [ "market", market ],
            [ "quantity", quantity.toString() ],
            [ "rate", rate.toString() ]
        ) ).uuid;

    }

    /**
     * Interface to the "public/cancelorder" Bittrex's API operation.
     *
     * @param   orderId The ID of the order we would like to cancel.
     * @returns True if the operation resulted in a success, throws
     *          otherwise.
     */
    public async cancelOrder( orderId: string ): Promise< boolean > {

        await this.makeRequest(
            "/market/cancel",
            [ "uuid", orderId ]
        );
        return true;

    }

    /**
     * Interface to the "public/getopenorders" Bittrex's API operation.
     *
     * @param   market The market of which we would like to retrieve
     *                 the open orders.
     * @returns Either a promise of an open order array, or an open
     *          order array if using the await construct.
     */
    public async getOpenOrders( market?: string ): Promise< Order[] > {

        let openOrdersJson: any = await this.makeRequest(
            "/market/getopenorders",
            [ "market", market ]
        );
        let openOrders: Order[] = [];
        for( let openOrderJson of openOrdersJson ) {
            openOrders.push( new Order( openOrderJson ) );
        }
        return openOrders;

    }

    /**
     * Interface to the "public/getbalances" Bittrex's API operation.
     *
     * @returns Either a promise of a balance array, or a balance
     *          array if using the await construct.
     */
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

    /**
     * Interface to the "public/getbalance" Bittrex's API operation.
     *
     * @param currency The currency of which we would like to retrieve
     *                 the balance.
     * @returns Either a promise of a balance, or a balance if using
     *          the await construct.
     */
    public async getBalance( currency: string ): Promise< Balance > {

        return new Balance( await this.makeRequest(
            "/account/getbalance",
            [ "currency", currency ]
        ) );

    }

    /**
     * Interface to the "public/getdepositaddress" Bittrex's API operation.
     *
     * @param currency The currency of which we would like to retrieve
     *                 the deposit address.
     * @returns Either a promise of a deposit address, or a deposit
     *          address if using the await construct.
     */
    public async getDepositAddress( currency: string ): Promise< string > {

        return ( await this.makeRequest(
            "/account/getdepositaddress",
            [ "currency", currency ]
        ) ).Address;

    }

    /**
     * Interface to the "public/getdepositaddress" Bittrex's API operation.
     *
     * @param currency  The currency which we would like to withdraw.
     * @param quantity  The quantity which we would like to withdraw.
     * @param address   The address to which we would like to withdraw.
     * @param paymentId Optional parameter used for CryptoNotes/BitShareX/Nxt.
     *
     * @returns Either a promise of a withdrawal ID, or a withdrawal ID
     *          if using the await construct.
     */
    public async withdraw( currency: string, quantity: number, address: string, paymentId?: string ): Promise< string > {

        return ( await this.makeRequest(
            "/account/withdraw",
            [ "currency", currency ],
            [ "quantity", quantity.toString() ],
            [ "address", address ],
            [ "paymentId", paymentId ],
        ) ).uuid;

    }

    /**
     * Interface to the "public/getorder" Bittrex's API operation.
     *
     * @param uuid  The uuid of the order of which we would like to get the detail.
     *
     * @returns Either a promise of an order, or an order if using
     *          the await construct.
     */
    public async getOrder( uuid: string ): Promise< Order > {

        return new Order( await this.makeRequest(
            "/account/getorder",
            [ "uuid", uuid ]
        ) );

    }

    /**
     * Interface to the Bittrex's API websockets system.
     *
     * @param watchableMarkets The markets of which we would like
     *                         to receive constant updates.
     * @param callback A callback function invoked as soon as new
     *                updates about the watched markets are received
     *                from Bittrex.
     */
    public getExchangeStateUpdatesStream( watchableMarkets: string[], callback: ( marketUpdates: ExchangeStateUpdate[] ) => any ): void {

        let websocketClient: SignalR.client;
        Cloudscraper.get( "https://bittrex.com/", ( error, response ) => {

            if( error ) {
                throw new CloudscraperError( error );
            }
            websocketClient = new SignalR.client(
                "wss://socket.bittrex.com/signalr",
                [ "CoreHub" ],
                null,
                true
            );
            websocketClient.headers[ "User-Agent" ] = response.request.headers[ "User-Agent" ] || "";
            websocketClient.headers[ "cookie" ] = response.request.headers[ "cookie" ] || "";

            websocketClient.serviceHandlers.reconnecting = () => {
                return false;
            };

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
                try {
                    messageJson = JSON.parse( messageJson.utf8Data );
                }
                catch( error ) {
                    return;
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
            websocketClient.start();

        } );

    }

    /**
     * Utility method that sends a request to the Bittrex's API, handling the
     * authentication through the API key and API secret possibly given when
     * instantiating the client itself.
     *
     * @param operation The Bittrex's API operation that we would like to call.
     * @param parameters The parameters which the operation takes in.
     *
     * @returns Either the promise of the Bittrex's API JSON response, or the
     *          JSON response if using the await construct.
     */
    private async makeRequest( operation: string, ...parameters: [ string, string ][] ): Promise< any > {

        let apiEndpointUrl: URL = new URL(
            Path.join( "/api/v1.1", operation ),
            "https://www.bittrex.com/"
        );

        if( !isNullOrUndefined( this.apiKey ) ) {

            apiEndpointUrl.searchParams.append(
                "apikey",
                this.apiKey
            );

        }

        apiEndpointUrl.searchParams.append(
            "nonce",
            new Date().getTime().toString()
        );

        for( let parameter of parameters ) {

            if( isNullOrUndefined( parameter[ 1 ] ) ) {
                continue;
            }
            apiEndpointUrl.searchParams.append( parameter[ 0 ], parameter[ 1 ] );

        }
        let apiEndpointUrlString: string = apiEndpointUrl.toString();
        let apiSign: string = CryptoJs.HmacSHA512(
            apiEndpointUrlString,
            this.apiSecret
        );

        let response: any = await request( {

            url: apiEndpointUrlString,
            headers: {
                "apisign": apiSign
            },
            json: true,
            maxAttempts: 10,
            retryDelay: 2500,
            retryStrategy: ( error, response ) => {
                return response.statusCode >= 500 && response.statusCode < 600;
            },
            fullResponse: false

        } );
        if( response.success ) {
            return response.result;
        }
        throw new ApiError( response.message );

    }

}