"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RequestRetryError extends Error {
    constructor(error) {
        super("A requestretry error occurred: " + error);
    }
}
exports.RequestRetryError = RequestRetryError;
//# sourceMappingURL=RequestRetryError.js.map