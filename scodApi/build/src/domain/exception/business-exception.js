"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessException = void 0;
const exception_1 = require("./exception");
class BusinessException extends exception_1.Exception {
    constructor(message, status) {
        super(message);
        this.name = this.constructor.name;
        this.status = status;
        this.isError = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.BusinessException = BusinessException;
