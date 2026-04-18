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
const express_1 = __importDefault(require("express"));
const requestValidator_1 = require("../../middleware/requestValidator");
const accountValidator_1 = require("../../validations/comesandgoes/accountValidator");
const accountManager_1 = require("../../bussiness/account/accountManager");
const customerManager_1 = require("../../bussiness/customer/customerManager");
const router = express_1.default.Router();
// const accountManager = new AccountManager();
router.post("/addAccount", (0, requestValidator_1.requestValidator)(accountValidator_1.accountSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("body ekrana yazdırıldı ", req.body);
    const request = req.body;
    const account = yield new accountManager_1.AccountManager(request).createAccount(request);
    res.send(account);
}));
router.post("/addTransferMany", (0, requestValidator_1.requestValidator)(accountValidator_1.transferManySchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("body ekrana yazdırıldı ", req.body);
    const request = req.body;
    const transferMany = yield new accountManager_1.AccountManager(request).createtransferMany(request);
    res.send(transferMany);
}));
router.post("/addDebt", (0, requestValidator_1.requestValidator)(accountValidator_1.debtSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("burası add debt methoduna giden yer body ekrana yazdırıldı ", req.body);
    const request = req.body;
    const debt = yield new accountManager_1.AccountManager(request).createDebt(request);
    res.send(debt);
}));
router.get("/getUserFinancialSummary", (0, requestValidator_1.requestValidator)(accountValidator_1.userCashSema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.query.userId;
        console.log("body ekrana yazdırıldı ", userId);
        if (!userId) {
            res.status(400).send({ success: false, message: "userId is required" });
            return;
        }
        const request = { userId: parseInt(userId, 10) };
        const userCashAmount = yield new accountManager_1.AccountManager(request).getUserFinancialSummary(request.userId);
        res.send(userCashAmount);
    }
    catch (error) {
        res
            .status(500)
            .send({
            success: false,
            message: "Hata müşteri total nakit miktarı getirilemedi",
        });
    }
}));
router.post("/addCashReceivable", (0, requestValidator_1.requestValidator)(accountValidator_1.cashReceivableSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("body ekrana yazdırıldı ", req.body);
    const request = req.body;
    const debt = yield new accountManager_1.AccountManager(request).createcashReceivable(request);
    res.send(debt);
}));
router.post("/addUserCash", (0, requestValidator_1.requestValidator)(accountValidator_1.userCashSema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("body ekrana yazdırıldı ", req.body);
    const request = req.body;
    const debt = yield new accountManager_1.AccountManager(request).createUserCah(request);
    res.send(debt);
}));
router.get("/getUserCashAmount", 
// requestValidator(userCashSema),
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.query.userId;
        console.log("body ekrana yazdırıldı ", userId);
        if (!userId) {
            res.status(400).send({ success: false, message: "userId is required" });
            return;
        }
        const request = { userId: parseInt(userId, 10) };
        const userCashAmount = yield new accountManager_1.AccountManager(request).getUserCashAmount(request.userId);
        res.send(userCashAmount);
    }
    catch (error) {
        res
            .status(500)
            .send({
            success: false,
            message: "Hata müşteri total nakit miktarı getirilemedi",
        });
    }
}));
router.post("/addCustomer", (0, requestValidator_1.requestValidator)(accountValidator_1.customerSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("body ekrana yazdırıldı ", req.body);
    const request = req.body;
    const debt = yield new customerManager_1.CustomerManager(request).createCustomer(request);
    res.send(debt);
}));
router.get("/getCustomerList", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.query.userId;
        console.log("userId ekrana yazdırıldı", userId);
        if (!userId) {
            res.status(400).send({ success: false, message: "userId is required" });
            return;
        }
        const request = { userId: parseInt(userId, 10) };
        const getCustomerList = yield new customerManager_1.CustomerManager(request).getCustomerList(request);
        res.send(getCustomerList);
    }
    catch (error) {
        res
            .status(500)
            .send({
            success: false,
            message: "An error occurred while fetching customer list",
        });
    }
}));
router.get("/cashReceivableList", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.query.userId;
        console.log("userId ekrana yazdırıldı", userId);
        if (!userId) {
            res.status(400).send({ success: false, message: "userId is required" });
            return;
        }
        const request = { userId: parseInt(userId, 10) };
        const getCustomerList = yield new customerManager_1.CustomerManager(request).cashReceivableList(request);
        res.send(getCustomerList);
    }
    catch (error) {
        res
            .status(500)
            .send({
            success: false,
            message: "An error occurred while fetching customer list",
        });
    }
}));
router.get("/debCustomerList", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.query.userId;
        console.log("userId ekrana yazdırıldı", userId);
        if (!userId) {
            res.status(400).send({ success: false, message: "userId is required" });
            return;
        }
        const request = { userId: parseInt(userId, 10) };
        const getCustomerList = yield new customerManager_1.CustomerManager(request).debCustomerList(request);
        res.send(getCustomerList);
    }
    catch (error) {
        res
            .status(500)
            .send({
            success: false,
            message: "An error occurred while fetching customer list",
        });
    }
}));
router.get("/getMoneyTransfers", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.query.userId;
        console.log("userId ekrana yazdırıldı", userId);
        if (!userId) {
            res.status(400).send({ success: false, message: "userId is required" });
            return;
        }
        const request = { userId: parseInt(userId, 10) };
        const getCustomerList = yield new customerManager_1.CustomerManager(request).getMoneyTransfers(request);
        res.send(getCustomerList);
    }
    catch (error) {
        res
            .status(500)
            .send({
            success: false,
            message: "An error occurred while fetching customer list",
        });
    }
}));
router.get("/getCombinedCustomerData", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.query.userId;
        console.log("get combined methodu userId ekrana yazdırıldı", userId);
        if (!userId) {
            res.status(400).send({ success: false, message: "userId is required" });
            return;
        }
        const parsedUserId = parseInt(userId, 10);
        if (isNaN(parsedUserId)) {
            res.status(400).send({ success: false, message: "Invalid userId" });
            return;
        }
        const request = { userId: parsedUserId };
        const getCustomerList = yield new customerManager_1.CustomerManager(request).getCombinedCustomerData(request);
        res.send(getCustomerList);
    }
    catch (error) {
        console.error("Error fetching customer list:", error); // Hata loglama
        res.status(500).send({
            success: false,
            message: "An error occurred while fetching customer list",
        });
    }
}));
router.post("/getCombinedDetailCustomerData", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, customerId } = req.body;
        console.log(req.body);
        console.log("Burası routesuserId ve customerId ekrana yazdırıldı", userId, customerId);
        if (!userId && !customerId) {
            res.status(400).send({ success: false, message: "userId is required" });
            return;
        }
        const request = {
            userId: parseInt(userId, 10),
            customerId: parseInt(customerId, 10),
        };
        console.log("istek console yazdırıldı ", request);
        const getCustomerList = yield new customerManager_1.CustomerManager(request).getCombinedDetailCustomerData(request);
        res.send(getCustomerList);
    }
    catch (error) {
        res
            .status(500)
            .send({
            success: false,
            message: "An error occurred while fetching customer list",
        });
    }
}));
router.get("/getInactiveUsers", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.query.userId;
        console.log("userId ekrana yazdırıldı", userId);
        if (!userId) {
            res.status(400).send({ success: false, message: "userId is required" });
            return;
        }
        const request = { userId: parseInt(userId, 10) };
        const getCustomerList = yield new accountManager_1.AccountManager(request).getInactiveUsers(request);
        res.send(getCustomerList);
    }
    catch (error) {
        res
            .status(500)
            .send({
            success: false,
            message: "An error occurred while fetching customer list",
        });
    }
}));
router.post("/activatedUser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = req.body;
        if (typeof request.id !== "number") {
            res
                .status(400)
                .send({ success: false, message: "Geçersiz kullanıcı ID" });
            return;
        }
        const activateUserResult = yield new accountManager_1.AccountManager(request).activateUser(request);
        console.log("kullanıcı ekrana yazdırıldı", activateUserResult);
        res.send(activateUserResult);
    }
    catch (error) {
        console.error("Hata:", error);
        res
            .status(500)
            .send({
            success: false,
            message: "Kullanıcıyı güncellerken bir hata oluştu",
        });
    }
}));
router.get("/getAccountInfo", 
// requestValidator(userCashSema),
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.query.userId;
        console.log("account info bilgileri  ekrana yazdırıldı ", userId);
        if (!userId) {
            res.status(400).send({ success: false, message: "userId is required" });
            return;
        }
        const request = { userId: parseInt(userId, 10) };
        const accountInfo = yield new accountManager_1.AccountManager(request).getAccountIınfo(request.userId);
        res.send(accountInfo);
    }
    catch (error) {
        res
            .status(500)
            .send({
            success: false,
            message: "ERROR  : Kullanıcı bilgileri getirilirken hata oluştu",
        });
    }
}));
exports.default = router;
