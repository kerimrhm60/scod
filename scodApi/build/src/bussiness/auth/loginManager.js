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
exports.LoginManager = void 0;
const loginDbManager_1 = require("../../database/loginDbManager");
const exception_1 = require("../../domain/exception");
const jwt_1 = require("../../helpers/jwt");
class LoginManager {
    constructor(request) {
        this.findUniqueUser = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.loginDbManager.findUniqueUser(Object.assign({}, this.request));
                // const result = await this.loginDbManager.checkUserPassword(
                //   this.request.passwordHash,
                //   user.passwordHash
                // );
                // return new InvalidParameter();
                // else if(!result) return new InvalidParameter
                if (!user)
                    return new exception_1.NotFound();
                if (!user.isActive) {
                    return {
                        success: false,
                        message: "Hesabınız henüz aktif değil. Yönetici onayı bekleniyor.",
                    };
                }
                const token = (0, jwt_1.generateToken)(user);
                return {
                    success: true,
                    token,
                    user,
                };
            }
            catch (error) {
                console.error("findUniqueUser'da hata oluştu:", error);
                throw error;
            }
        });
        this.request = request;
        this.loginDbManager = new loginDbManager_1.LoginDbManager();
    }
}
exports.LoginManager = LoginManager;
