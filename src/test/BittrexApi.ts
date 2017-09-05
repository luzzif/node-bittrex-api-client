import { MarketSummaryRequest } from "../main/request/MarketSummaryRequest";
import { BittrexApi } from "../main/BittrexApi";
import { MarketSummaryResponse } from "../main/response/MarketSummaryResponse";
import * as Assert from "assert";
import {} from "mocha";
import { MarketUpdatesStreamRequest } from "../main/request/MarketUpdatesStreamRequest";
import { MarketUpdate } from "../main/response/MarketUpdate";

describe( "BittrexApi", () => {

    let apiKey: string = process.env.BITTREX_API_KEY;
    if( apiKey === undefined ) {
        Assert.fail( "API key is undefined. Define your API key as an environmental variable named BITTREX_API_KEY" );
    }

    let apiSecret: string = process.env.BITTREX_API_SECRET;
    if( apiSecret === undefined ) {
        Assert.fail( "API secret is undefined. Define your API secret as an environmental variable named BITTREX_API_SECRET" );
    }

    let bittrexApi: BittrexApi = new BittrexApi(
        apiKey,
        apiSecret
    );
    describe( "#getMarketSummary()", () => {
        it( "Should return a market summary response, given a specific market", () => {

            let marketSummaryRequest: MarketSummaryRequest = new MarketSummaryRequest();
            marketSummaryRequest.setName( "BTC-LTC" );
            bittrexApi.getMarketSummary(
                marketSummaryRequest
            )
            .then( ( marketSummaryResponse: MarketSummaryResponse ) => {
                 Assert.ok( marketSummaryResponse instanceof MarketSummaryResponse );
            } )
            .catch( ( errorMessage: string ) => {
                Assert.fail( "Bittrex API call failed. Returned message: " + errorMessage );
            } );

        } )
    } );
    describe( "#getMarketUpdatesStream()", () => {
        it( "Should return an array of updates, given one or more specific markets", () => {

            let marketUpdatesStreamRequest: MarketUpdatesStreamRequest = new MarketUpdatesStreamRequest();
            marketUpdatesStreamRequest.setWatchableMarkets( [ "BTC-LTC" ] );
            bittrexApi.getMarketUpdatesStream(
                marketUpdatesStreamRequest,
                ( marketUpdatesStreamResponse: MarketUpdate[] ) => {
                    Assert.ok( marketUpdatesStreamResponse instanceof Array );
                }
            )
        } )
    } );

} );
