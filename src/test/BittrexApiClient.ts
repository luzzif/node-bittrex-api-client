import * as Assert from "assert";
import {} from "mocha";
import { Market } from "../main/model/Market";
import { Currency } from "../main/model/Currency";
import { Ticker } from "../main/model/Ticker";
import { MarketSummary } from "../main/model/MarketSummary";
import { OrderBookType } from "../main/enum/OrderBookType";
import { Order } from "../main/model/Order";
import { Trade } from "../main/model/Trade";
import { OrderType } from "../main/enum/OrderType";
import { BittrexApiClient } from "../main/BittrexApiClient";
import { OpenOrder } from "../main/model/OpenOrder";
import { Balance } from "../main/model/Balance";
import { ExchangeStateUpdate } from "../main/model/ExchangeStateUpdate";

describe( "BittrexApi", () => {

    let apiKey: string = process.env.BITTREX_API_KEY;
    if( apiKey === undefined ) {
        Assert.fail( "API key is undefined. Define your API key as an environmental variable named BITTREX_API_KEY" );
    }

    let apiSecret: string = process.env.BITTREX_API_SECRET;
    if( apiSecret === undefined ) {
        Assert.fail( "API secret is undefined. Define your API secret as an environmental variable named BITTREX_API_SECRET" );
    }

    let bittrexApi: BittrexApiClient = new BittrexApiClient(
        apiKey,
        apiSecret
    );

    describe( "getMarketSummary()", (): void => {
        it( "Should return a non empty array of markets", (): void => {

            bittrexApi.getMarkets()
            .then( ( markets: Market[] ): void => {
                 Assert.ok( markets.length > 0 );
            } )
            .catch( ( errorMessage: string ): void => {
                Assert.fail( "Bittrex API call failed. Returned message: " + errorMessage );
            } );

        } );
    } );

    describe( "getCurrencies()", (): void => {
        it( "Should return a non empty array of currencies", (): void => {

            bittrexApi.getCurrencies()
            .then( ( currencies: Currency[] ): void => {
                Assert.ok( currencies.length > 0 );
            } )
            .catch( ( errorMessage: string ): void => {
                Assert.fail( "Bittrex API call failed. Returned message: " + errorMessage );
            } );

        } );
    } );

    describe( "getTicker()", (): void => {
        it( "Given a market, it should return an object representing its ticker", (): void => {

            bittrexApi.getTicker( "BTC-LTC" )
            .then( ( ticker: Ticker ): void => {
                Assert.ok( ticker !== null && ticker !== undefined );
            } )
            .catch( ( errorMessage: string ): void => {
                Assert.fail( "Bittrex API call failed. Returned message: " + errorMessage );
            } );

        } );
    } );

    describe( "getMarketSummaries()", (): void => {
        it( "It should return a non empty array of market summaries", (): void => {

            bittrexApi.getMarketSummaries()
            .then( ( marketSummaries: MarketSummary[] ): void => {
                Assert.ok( marketSummaries.length > 0 );
            } )
            .catch( ( errorMessage: string ): void => {
                Assert.fail( "Bittrex API call failed. Returned message: " + errorMessage );
            } );

        } );
    } );

    describe( "getMarketSummary()", (): void => {
        it( "Given a market, it should return an object representing its summary", (): void => {

            bittrexApi.getMarketSummary( "BTC-LTC" )
            .then( ( marketSummary: MarketSummary ): void => {
                Assert.ok( marketSummary !== null && marketSummary !== undefined );
            } )
            .catch( ( errorMessage: string ): void => {
                Assert.fail( "Bittrex API call failed. Returned message: " + errorMessage );
            } );

        } );
    } );

    describe( "getOrderBook()", (): void => {
        it( "Should return a non empty array of buy orders if called with buy as a type", (): void => {

            bittrexApi.getOrderBook( "BTC-LTC", OrderBookType.BUY ).then( ( orders: Order[] ): void => {
                Assert.ok( orders.length > 0 && orders[ 0 ].type === OrderType.BUY );
            } )
            .catch( ( errorMessage: string ) => {
                Assert.fail( "Bittrex API call failed. Returned message: " + errorMessage );
            } );

        } );
        it( "Should return a non empty array of sell orders if called with sell as a type", (): void => {

            bittrexApi.getOrderBook( "BTC-LTC", OrderBookType.SELL )
            .then( ( orders: Order[] ): void => {
                Assert.ok( orders.length > 0 && orders[ 0 ].type === OrderType.SELL );
            } )
            .catch( ( errorMessage: string ): void => {
                Assert.fail( "Bittrex API call failed. Returned message: " + errorMessage );
            } );

        } );
        it( "Should return a non empty array of buy and sell orders if called with both as a type", (): void => {

            bittrexApi.getOrderBook( "BTC-LTC", OrderBookType.BOTH )
            .then( ( orders: Order[] ): void => {

                let buyOrdersPresent: boolean = orders.filter( ( order: Order ) => {
                    if( order.type === OrderType.BUY ) {
                        return order;
                    }
                } ).length > 0;

                let sellOrdersPresent: boolean = orders.filter( ( order: Order ) => {
                    if( order.type === OrderType.SELL ) {
                        return order;
                    }
                } ).length > 0;

                Assert.ok( orders.length > 0 && buyOrdersPresent && sellOrdersPresent );

            } )
            .catch( ( errorMessage: string ): void => {
                Assert.fail( "Bittrex API call failed. Returned message: " + errorMessage );
            } );

        } )
    } );

    describe( "getMarketHistory()", (): void => {
        it( "Should return a non empty array of trades", (): void => {

            bittrexApi.getMarketHistory( "BTC-LTC" )
            .then( ( trades: Trade[] ): void => {
                Assert.ok( trades.length > 0 );
            } )
            .catch( ( errorMessage: string ): void => {
                Assert.fail( "Bittrex API call failed. Returned message: " + errorMessage );
            } );

        } )
    } );


    let orderId: string;
    describe( "buyLimit()", (): void => {
        it( "Should return the just-placed order ID", (): void => {

            bittrexApi.buyLimit( "BTC-LTC", 1, Number.MAX_VALUE )
            .then( ( placedOrderId: string ): void => {
                orderId = placedOrderId;
                Assert.ok( placedOrderId !== null && placedOrderId !== undefined );
            } )
            .catch( ( errorMessage: string ): void => {
                Assert.fail( "Bittrex API call failed. Returned message: " + errorMessage );
            } );

        } )
    } );

    describe( "cancel()", (): void => {
        it( "Should return true when the order is successfully canceled", (): void => {

            bittrexApi.cancel( orderId )
            .then( (): void => {
                Assert.ok( true );
            } )
            .catch( ( errorMessage: string ): void => {
                Assert.fail( "Bittrex API call failed. Returned message: " + errorMessage );
            } );

        } )
    } );

    describe( "getOpenOrders()", (): void => {
        it( "Should return a non empty list of open orders (if any open order is opened on the target account), an empty list otherwise", (): void => {

            bittrexApi.getOpenOrders( "BTC-LTC" )
            .then( ( openOrders: OpenOrder[] ): void => {
                Assert.ok( openOrders !== null && openOrders !== undefined );
            } )
            .catch( ( errorMessage: string ): void => {
                Assert.fail( "Bittrex API call failed. Returned message: " + errorMessage );
            } );

        } )
    } );

    describe( "getBalances()", (): void => {
        it( "Should return a non empty list of balances", (): void => {

            bittrexApi.getBalances()
            .then( ( balances: Balance[] ): void => {
                Assert.ok( balances.length > 0 );
            } )
            .catch( ( errorMessage: string ): void => {
                Assert.fail( "Bittrex API call failed. Returned message: " + errorMessage );
            } );

        } )
    } );

    describe( "getBalance()", (): void => {
        it( "Should return a non empty balance", (): void => {

            bittrexApi.getBalance( "BTC" )
            .then( ( balance: Balance ): void => {
                Assert.ok( balance !== null && balance !== undefined );
            } )
            .catch( ( errorMessage: string ): void => {
                Assert.fail( "Bittrex API call failed. Returned message: " + errorMessage );
            } );

        } )
    } );

    describe( "getDepositAddress()", (): void => {
        it( "Should return a string representing the deposit address for the given currency", (): void => {

            bittrexApi.getDepositAddress( "BTC" )
            .then( ( despositAddress: string ): void => {
                Assert.ok( despositAddress !== null && despositAddress !== undefined );
            } )
            .catch( ( errorMessage: string ): void => {
                Assert.fail( "Bittrex API call failed. Returned message: " + errorMessage );
            } );

        } )
    } );

    describe( "withdraw()", (): void => {
        it( "Should return a string representing the withdrawal ID", (): void => {

            bittrexApi.withdraw( "BTC", 0, "" )
            .then( ( withdrawalId: string ): void => {
                Assert.ok( withdrawalId !== null && withdrawalId !== undefined );
            } )
            .catch( ( errorMessage: string ): void => {
                Assert.fail( "Bittrex API call failed. Returned message: " + errorMessage );
            } );

        } )
    } );

    describe( "withdraw()", (): void => {
        it( "Should return a string representing the withdrawal ID", (): void => {

            bittrexApi.getExchangeStateUpdatesStream( [ "BTC-LTC" ], ( exchangeUpdates: ExchangeStateUpdate[] ): void => {
                Assert.ok( exchangeUpdates !== null && exchangeUpdates !== undefined );
            } );

        } )
    } );

} );
