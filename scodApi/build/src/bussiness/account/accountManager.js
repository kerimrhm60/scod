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
exports.AccountManager = void 0;
const acountDbManager_1 = __importDefault(require("../../database/acountDbManager"));
class AccountManager {
    constructor(request) {
        this.createAccount = (accountData) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.accountDbManager.createAccount(accountData);
            return result;
        });
        this.createtransferMany = (transfermanyData) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.accountDbManager.createtransferMany(transfermanyData);
            return result;
        });
        this.createDebt = (debtData) => __awaiter(this, void 0, void 0, function* () {
            // console.log("burası account manager dept methodu ",debtData)
            const result = yield this.accountDbManager.createDebt(debtData);
            return result;
        });
        this.createcashReceivable = (debtData) => __awaiter(this, void 0, void 0, function* () {
            console.log("burası account manager cashrecaivable  methodu ", debtData);
            const result = yield this.accountDbManager.createcashReceivable(debtData);
            return result;
        });
        this.createUserCah = (userCashData) => __awaiter(this, void 0, void 0, function* () {
            console.log("veriler manager sınıfına geldi", userCashData);
            const result = yield this.accountDbManager.createUserCash(userCashData);
            return result;
        });
        this.getInactiveUsers = (userId) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.accountDbManager.getInactiveUsers(userId);
            return result;
        });
        this.activateUser = (userId) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.accountDbManager.activateUser(userId);
            return result;
        });
        this.getUserCashAmount = (userId) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.accountDbManager.getUserCashAmount(userId);
            return result;
        });
        this.getUserFinancialSummary = (userId) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.accountDbManager.getUserFinancialSummary(userId);
            return result;
        });
        this.getUserTotalDebt = (userId) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.accountDbManager.getUserTotalDebt(userId);
            return result;
        });
        // async activatedUser(userId: { id: number }): Promise<any> {
        //   const result =  await this.accountDbManager.activatedUser(userId);
        //   return result;
        // }
        this.getAccountIınfo = (userId) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.accountDbManager.getAccountIınfo(userId);
            return result;
        });
        this.request = request;
        this.accountDbManager = new acountDbManager_1.default();
    }
}
exports.AccountManager = AccountManager;
