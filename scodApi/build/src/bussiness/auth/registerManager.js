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
exports.RegisterManager = void 0;
const registerDbManager_1 = require("../../database/registerDbManager");
class RegisterManager {
    constructor(request) {
        this.create = () => __awaiter(this, void 0, void 0, function* () {
            // const passwordHashed = await hashPassword(this.request.password);
            // this.request.password = "$2y$10$ARdN/9vRmnCFNkJVOO5SUO7cVVXm60JS.BL1P1Met3QPaZboKdQSybu";
            // this.request.password = "1234";
            //dbde boyle bir kullanici var mi?
            //gelen requestteki passwordu hasleyecez
            // if (this.request.surname === undefined) {
            //   this.request.surname = "";
            // }
            const result = yield this.registerDbManager.create(Object.assign({}, this.request));
            return result;
        });
        this.request = request;
        this.registerDbManager = new registerDbManager_1.RegisterDbManager();
    }
}
exports.RegisterManager = RegisterManager;
