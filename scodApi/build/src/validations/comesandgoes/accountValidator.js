"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerSchema = exports.userCashSema = exports.cashReceivableSchema = exports.debtSchema = exports.transferManySchema = exports.accountSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.accountSchema = joi_1.default.object({
    totalAmount: joi_1.default.number().integer().required(),
    totalCurrency: joi_1.default.string().required(),
    userId: joi_1.default.number().integer().required(),
    clientId: joi_1.default.number().integer().required(),
});
exports.transferManySchema = joi_1.default.object({
    // id : joi.number().integer().optional(),
    receivedAmount: joi_1.default.number().integer().required(),
    moneyCurrency: joi_1.default.string().required(),
    senderId: joi_1.default.number().integer().required(),
    receiverId: joi_1.default.number().integer().required(),
    intermediaryId: joi_1.default.number().integer().required(),
    receivedDate: joi_1.default.string().isoDate().required(),
    transferDate: joi_1.default.string().isoDate().required(),
});
exports.debtSchema = joi_1.default.object({
    // id : joi.number().integer().optional(),
    debtAmount: joi_1.default.number().integer().required(),
    debtCurrency: joi_1.default.string().required(),
    debtorId: joi_1.default.number().integer().required(),
    creditorId: joi_1.default.number().integer().required(),
    debtIssuanceDate: joi_1.default.string().isoDate().required(),
    debtRepaymentDate: joi_1.default.string().isoDate().required(),
});
exports.cashReceivableSchema = joi_1.default.object({
    // id : joi.number().integer().optional(),
    debtAmount: joi_1.default.number().integer().required(),
    debtCurrency: joi_1.default.string().required(),
    debtorId: joi_1.default.number().integer().required(),
    creditorId: joi_1.default.number().integer().required(),
    debtIssuanceDate: joi_1.default.string().isoDate().required(),
    debtRepaymentDate: joi_1.default.string().isoDate().required(),
});
exports.userCashSema = joi_1.default.object({
    // id : joi.number().integer().optional(),
    totalCash: joi_1.default.number().integer().required(),
    cashCurrency: joi_1.default.string().required(),
    userId: joi_1.default.number().integer().required(),
});
exports.customerSchema = joi_1.default.object({
    id: joi_1.default.number().integer().optional(),
    userId: joi_1.default.number().integer().optional(),
    clientName: joi_1.default.string().required(),
    clientSurname: joi_1.default.string().required(),
    clientPhone: joi_1.default.string().required(),
});
