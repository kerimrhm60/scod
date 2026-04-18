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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerManager = void 0;
const customerDbManager_1 = __importDefault(require("../../database/customerDbManager"));
class CustomerManager {
    constructor(request) {
        this.createCustomer = (customerData) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.customerDbManager.createCustomer(customerData);
            return result;
        });
        this.getCustomerList = (getCustomerList) => __awaiter(this, void 0, void 0, function* () {
            const resullt = yield this.customerDbManager.getCustomerList(getCustomerList);
            return resullt;
        });
        this.cashReceivableList = (getCustomerList) => __awaiter(this, void 0, void 0, function* () {
            const resullt = yield this.customerDbManager.cashReceivableList(getCustomerList);
            return resullt;
        });
        this.debCustomerList = (getCustomerList) => __awaiter(this, void 0, void 0, function* () {
            const resullt = yield this.customerDbManager.debCustomerList(getCustomerList);
            return resullt;
        });
        this.getMoneyTransfers = (getCustomerList) => __awaiter(this, void 0, void 0, function* () {
            const resullt = yield this.customerDbManager.getMoneyTransfers(getCustomerList);
            return resullt;
        });
        this.getCombinedCustomerData = (getCustomerList) => __awaiter(this, void 0, void 0, function* () {
            console.log("burası custom manager sayfası : ", getCustomerList);
            const resullt = yield this.customerDbManager.getCombinedCustomerData(getCustomerList);
            return resullt;
        });
        this.getCombinedDetailCustomerData = (getCustomerList) => __awaiter(this, void 0, void 0, function* () {
            const resullt = yield this.customerDbManager.getCombinedDetailCustomerData(getCustomerList);
            return resullt;
        });
        this.request = request;
        this.customerDbManager = new customerDbManager_1.default();
    }
}
exports.CustomerManager = CustomerManager;
