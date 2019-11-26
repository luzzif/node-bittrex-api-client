"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoJs = require("crypto-js");
const SignalR = require("signalr-client");
const url_1 = require("url");
const Market_1 = require("./model/Market");
const Currency_1 = require("./model/Currency");
const Ticker_1 = require("./model/Ticker");
const MarketSummary_1 = require("./model/MarketSummary");
const OrderBookType_1 = require("./enum/OrderBookType");
const Trade_1 = require("./model/Trade");
const Order_1 = require("./model/Order");
const Balance_1 = require("./model/Balance");
const ExchangeStateUpdate_1 = require("./model/ExchangeStateUpdate");
const util_1 = require("util");
const ApiError_1 = require("./error/ApiError");
const Path = require("path");
const Cloudscraper = require("cloudscraper");
const CloudscraperError_1 = require("./error/CloudscraperError");
const OrderBook_1 = require("./model/OrderBook");
const request = require("requestretry");
const RequestRetryError_1 = require("./error/RequestRetryError");
/**
 * Represents a single Bittrex API client.
 */
class BittrexApiClient {
    /**
     * Initializes a new Bittrex API client.
     *
     * @param apiKey    The personal account API key.
     * @param apiSecret The personal account API secret.
     */
    constructor(apiKey, apiSecret) {
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
    }
    /**
     * Interface to the "public/getmarkets" Bittrex's API operation.
     *
     * @returns Either a promise of a market, or a market
     *          if using the await construct.
     */
    getMarkets() {
        return __awaiter(this, void 0, void 0, function* () {
            let marketsJson = yield this.makeRequest("public/getmarkets");
            let markets = [];
            for (let marketJson of marketsJson) {
                markets.push(new Market_1.Market(marketJson));
            }
            return markets;
        });
    }
    /**
     * Interface to the "public/getcurrencies" Bittrex's API operation.
     *
     * @returns Either a promise of a currency array, or a currency array
     *          if using the await construct.
     */
    getCurrencies() {
        return __awaiter(this, void 0, void 0, function* () {
            let currenciesJson = yield this.makeRequest("public/getcurrencies");
            let currencies = [];
            for (let currencyJson of currenciesJson) {
                currencies.push(new Currency_1.Currency(currencyJson));
            }
            return currencies;
        });
    }
    /**
     * Interface to the "public/getticker" Bittrex's API operation.
     *
     * @param   market The market of which we would like
     *                 to retrieve the ticker.
     * @returns Either a promise of a ticker, or a ticker
     *          if using the await construct.
     */
    getTicker(market) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Ticker_1.Ticker(yield this.makeRequest("public/getticker", ["market", market]));
        });
    }
    /**
     * Interface to the "public/getmarketsummaries" Bittrex's API operation.
     *
     * @returns Either a promise of a market summary array, or a market summary
     *          array if using the await construct.
     */
    getMarketSummaries() {
        return __awaiter(this, void 0, void 0, function* () {
            let marketSummariesJson = yield this.makeRequest("public/getmarketsummaries");
            let marketSummaries = [];
            for (let marketSummaryJson of marketSummariesJson) {
                marketSummaries.push(new MarketSummary_1.MarketSummary(marketSummaryJson));
            }
            return marketSummaries;
        });
    }
    /**
     * Interface to the "public/getmarketsummary" Bittrex's API operation.
     *
     * @param   market The market of which we would like
     *                 to retrieve the summary.
     * @returns Either a promise of a market summary, or a market summary
     *          if using the await construct.
     */
    getMarketSummary(market) {
        return __awaiter(this, void 0, void 0, function* () {
            return new MarketSummary_1.MarketSummary((yield this.makeRequest("public/getmarketsummary", ["market", market]))[0]);
        });
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
    getOrderBook(market, type) {
        return __awaiter(this, void 0, void 0, function* () {
            return new OrderBook_1.OrderBook(yield this.makeRequest("public/getorderbook", ["market", market], ["type", OrderBookType_1.OrderBookType[type].toLowerCase()]));
        });
    }
    /**
     * Interface to the "public/getmarkethistory" Bittrex's API operation.
     *
     * @param   market The market of which we would like
     *                 to retrieve the market history.
     * @returns Either a promise of a trade array, or a trade array
     *          if using the await construct.
     */
    getMarketHistory(market) {
        return __awaiter(this, void 0, void 0, function* () {
            let tradesJson = yield this.makeRequest("/public/getmarkethistory", ["market", market]);
            let trades = [];
            for (let tradeJson of tradesJson) {
                trades.push(new Trade_1.Trade(tradeJson));
            }
            return trades;
        });
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
    buyWithLimit(market, quantity, rate) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.makeRequest("/market/buylimit", ["market", market], ["quantity", quantity.toString()], ["rate", rate.toString()])).uuid;
        });
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
    sellWithLimit(market, quantity, rate) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.makeRequest("/market/selllimit", ["market", market], ["quantity", quantity.toString()], ["rate", rate.toString()])).uuid;
        });
    }
    /**
     * Interface to the "public/cancelorder" Bittrex's API operation.
     *
     * @param   orderId The ID of the order we would like to cancel.
     * @returns True if the operation resulted in a success, throws
     *          otherwise.
     */
    cancelOrder(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.makeRequest("/market/cancel", ["uuid", orderId]);
            return true;
        });
    }
    /**
     * Interface to the "public/getopenorders" Bittrex's API operation.
     *
     * @param   market The market of which we would like to retrieve
     *                 the open orders.
     * @returns Either a promise of an open order array, or an open
     *          order array if using the await construct.
     */
    getOpenOrders(market) {
        return __awaiter(this, void 0, void 0, function* () {
            let openOrdersJson = yield this.makeRequest("/market/getopenorders", ["market", market]);
            let openOrders = [];
            for (let openOrderJson of openOrdersJson) {
                openOrders.push(new Order_1.Order(openOrderJson));
            }
            return openOrders;
        });
    }
    /**
     * Interface to the "public/getbalances" Bittrex's API operation.
     *
     * @returns Either a promise of a balance array, or a balance
     *          array if using the await construct.
     */
    getBalances() {
        return __awaiter(this, void 0, void 0, function* () {
            let balancesJson = yield this.makeRequest("/account/getbalances");
            let balances = [];
            for (let balanceJson of balancesJson) {
                balances.push(new Balance_1.Balance(balanceJson));
            }
            return balances;
        });
    }
    /**
     * Interface to the "public/getbalance" Bittrex's API operation.
     *
     * @param currency The currency of which we would like to retrieve
     *                 the balance.
     * @returns Either a promise of a balance, or a balance if using
     *          the await construct.
     */
    getBalance(currency) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Balance_1.Balance(yield this.makeRequest("/account/getbalance", ["currency", currency]));
        });
    }
    /**
     * Interface to the "public/getdepositaddress" Bittrex's API operation.
     *
     * @param currency The currency of which we would like to retrieve
     *                 the deposit address.
     * @returns Either a promise of a deposit address, or a deposit
     *          address if using the await construct.
     */
    getDepositAddress(currency) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.makeRequest("/account/getdepositaddress", ["currency", currency])).Address;
        });
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
    withdraw(currency, quantity, address, paymentId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.makeRequest("/account/withdraw", ["currency", currency], ["quantity", quantity.toString()], ["address", address], ["paymentId", paymentId])).uuid;
        });
    }
    /**
     * Interface to the "public/getorder" Bittrex's API operation.
     *
     * @param uuid  The uuid of the order of which we would like to get the detail.
     *
     * @returns Either a promise of an order, or an order if using
     *          the await construct.
     */
    getOrder(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Order_1.Order(yield this.makeRequest("/account/getorder", ["uuid", uuid]));
        });
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
    getExchangeStateUpdatesStream(watchableMarkets, callback) {
        let websocketClient;
        Cloudscraper.get("https://bittrex.com/", (error, response) => {
            if (error) {
                throw new CloudscraperError_1.CloudscraperError(error);
            }
            websocketClient = new SignalR.client("wss://socket.bittrex.com/signalr", ["CoreHub"], null, true);
            websocketClient.headers["User-Agent"] = response.request.headers["User-Agent"] || "";
            websocketClient.headers["cookie"] = response.request.headers["cookie"] || "";
            websocketClient.serviceHandlers.reconnecting = () => {
                return true;
            };
            websocketClient.serviceHandlers.disconnected = function () {
                websocketClient.start();
            };
            websocketClient.serviceHandlers.onerror = function () {
                websocketClient.start();
            };
            websocketClient.serviceHandlers.connectionLost = function () {
                websocketClient.start();
            };
            websocketClient.serviceHandlers.connectFailed = function () {
                websocketClient.start();
            };
            websocketClient.serviceHandlers.connected = () => {
                for (let watchableMarket of watchableMarkets) {
                    websocketClient.call("CoreHub", "SubscribeToExchangeDeltas", watchableMarket);
                }
            };
            websocketClient.serviceHandlers.messageReceived = (messageJson) => {
                if (messageJson.type !== "utf8") {
                    return;
                }
                try {
                    messageJson = JSON.parse(messageJson.utf8Data);
                }
                catch (error) {
                    return;
                }
                let updatesJson = messageJson.M;
                if (updatesJson === undefined || updatesJson.length === 0) {
                    return;
                }
                let exchangeStateUpdates = [];
                for (let updateJson of updatesJson) {
                    if (updateJson.M !== "updateExchangeState") {
                        continue;
                    }
                    for (let exchangeStateUpdateJson of updateJson.A) {
                        exchangeStateUpdates.push(new ExchangeStateUpdate_1.ExchangeStateUpdate(exchangeStateUpdateJson));
                    }
                }
                if (exchangeStateUpdates.length === 0) {
                    return;
                }
                callback(exchangeStateUpdates);
            };
            websocketClient.start();
        });
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
    makeRequest(operation, ...parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            let apiEndpointUrl = new url_1.URL(Path.join("/api/v1.1", operation), "https://www.bittrex.com/");
            if (!util_1.isNullOrUndefined(this.apiKey)) {
                apiEndpointUrl.searchParams.append("apikey", this.apiKey);
            }
            apiEndpointUrl.searchParams.append("nonce", new Date().getTime().toString());
            for (let parameter of parameters) {
                if (util_1.isNullOrUndefined(parameter[1])) {
                    continue;
                }
                apiEndpointUrl.searchParams.append(parameter[0], parameter[1]);
            }
            let apiEndpointUrlString = apiEndpointUrl.toString();
            let apiSign = CryptoJs.HmacSHA512(apiEndpointUrlString, this.apiSecret);
            let response;
            try {
                response = yield request({
                    url: apiEndpointUrlString,
                    headers: {
                        "apisign": apiSign
                    },
                    json: true,
                    maxAttempts: 10,
                    retryDelay: 2500,
                    retryStrategy: (error, response) => {
                        return error ||
                            response.statusCode === 524 ||
                            response.statusCode === 502 ||
                            response.statusCode === 504 ||
                            response.statusCode === 522 ||
                            response.statusCode === 503 ||
                            response.statusCode === 1016;
                    },
                    fullResponse: false
                });
            }
            catch (error) {
                throw new RequestRetryError_1.RequestRetryError(error);
            }
            if (response.success) {
                return response.result;
            }
            throw new ApiError_1.ApiError(response);
        });
    }
}
exports.BittrexApiClient = BittrexApiClient;
//# sourceMappingURL=BittrexApiClient.js.map