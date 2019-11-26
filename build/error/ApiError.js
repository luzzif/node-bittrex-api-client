"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represents an error returned from Bittrex during the API usage.
 */
class ApiError extends Error {
    constructor(response) {
        super(`Bittrex returned ${JSON.stringify(response)}`);
    }
}
exports.ApiError = ApiError;
//# sourceMappingURL=ApiError.js.map