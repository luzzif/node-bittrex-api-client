import { MarketSummaryResponse } from "./response/MarketSummaryResponse";
import { MarketSummaryRequest } from "./request/MarketSummaryRequest";
import * as CryptoJs from "crypto-js";
import * as Https from "https";
import * as SignalR from "signalr-client";
import { URL } from "url";
import { MarketUpdatesStreamRequest } from "./request/MarketUpdatesStreamRequest";
import { MarketUpdate } from "./response/MarketUpdate";
import { BuyLimitRequest } from "./request/BuyLimitRequest";
import { BuyLimitResponse } from "./response/BuyLimitResponse";

export class BittrexApiClient {

    private static readonly WEB_SOCKET_HOST: string = "wss://socket.bittrex.com/signalr";
    private static readonly WEB_SOCKET_HUB: string = "CoreHub";
    private static readonly WEB_SOCKET_HUB_SUBSCRIBE_DELTAS: string = "SubscribeToExchangeDeltas";
    private static readonly API_BASE_URL_PATH = "/api/v1.1/";
    private static readonly API_BASE_URL_ROOT = "https://www.bittrex.com/";
    private static readonly API_API_KEY_PARAMETER = "apikey";
    private static readonly API_TIMESTAMP_PARAMETER = "nonce";

    private apiKey: string;
    private apiSecret: string;

    constructor( apiKey: string, apiSecret: string ) {
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
    }

    public getMarketSummary( marketSummaryRequest: MarketSummaryRequest ): Promise< MarketSummaryResponse > {

        return this.makeRequest(
            "public/getmarketsummary",
            [ "market", marketSummaryRequest.getName() ]
        )
        .then( ( jsonResponse: any ) => {
            return new MarketSummaryResponse( jsonResponse );
        } )
        .catch( ( errorMessage: string ): null => {
            console.log( "Error calling Bittrex API: " + errorMessage );
            return null;
        } );

    }

    public buyLimit( buyLimitRequest: BuyLimitRequest ): Promise< BuyLimitResponse > {

        return this.makeRequest(
            "/market/buylimit",
            [ "market", buyLimitRequest.getMarket() ],
            [ "quantity", buyLimitRequest.getQuantity().toString() ],
            [ "rate", buyLimitRequest.getPrice().toString() ]
        )
        .then( ( jsonResponse: any ) => {
            return new BuyLimitResponse( jsonResponse );
        } )
        .catch( ( errorMessage: string ): null => {
            console.log( "Error calling Bittrex API: " + errorMessage );
            return null;
        } );

    }

    public getMarketUpdatesStream( marketUpdatesStreamRequest: MarketUpdatesStreamRequest, callback: ( marketUpdates: MarketUpdate[] ) => any ): void {

        let websocketClient: SignalR.client = new SignalR.client(
            BittrexApiClient.WEB_SOCKET_HOST,
            BittrexApiClient.WEB_SOCKET_HUB
        );
        let watchableMarkets: string[] = marketUpdatesStreamRequest.getWatchableMarkets();
        websocketClient.serviceHandlers.connected = () => {

            for( let watchableMarket of watchableMarkets ) {
                websocketClient.call(
                    BittrexApiClient.WEB_SOCKET_HUB,
                    BittrexApiClient.WEB_SOCKET_HUB_SUBSCRIBE_DELTAS,
                    watchableMarket
                );
            }

        };

        websocketClient.serviceHandlers.messageReceived = ( message: any ) => {

            if( message.type !== "utf8" ) {
                return;
            }
            message = JSON.parse( message.utf8Data );
            let updates = message.M;
            if( updates === undefined || updates.length === 0 ) {
                return;
            }

            let marketUpdates: MarketUpdate[] = [];
            for( let updateJson of message.M ) {

                console.log( updateJson );
                if( updateJson.M !== "updateExchangeState" ) {
                    return;
                }
                for( let marketUpdateJson of updateJson.A ) {
                    marketUpdates.push( new MarketUpdate( marketUpdateJson ) );
                }

            }
            callback( marketUpdates );

        };

    }

    public makeRequest( operation: string, ...parameters: [ string, string ][] ): Promise< any > {

        let apiEndpointUrl: URL = new URL(
            BittrexApiClient.API_BASE_URL_PATH + operation,
            BittrexApiClient.API_BASE_URL_ROOT
        );

        apiEndpointUrl.searchParams.append(
            BittrexApiClient.API_API_KEY_PARAMETER,
            this.apiKey
        );
        apiEndpointUrl.searchParams.append(
            BittrexApiClient.API_TIMESTAMP_PARAMETER,
            new Date().getTime().toString()
        );

        for( let parameter of parameters ) {
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
                        fulfill( bittrexData );
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