"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represents an error which may happen during Cloudscraper's usage.
 */
class CloudscraperError extends Error {
    constructor(error) {
        super("A Cloudscraper error occurred: " + error);
    }
}
exports.CloudscraperError = CloudscraperError;
//# sourceMappingURL=CloudscraperError.js.map