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
exports.RegisterDbManager = void 0;
const client_1 = __importDefault(require("../../prisma/client"));
// export class RegisterDbManager {
//   create = async (registerData: UserFields): Promise<any> => {
//     console.log("register data ekrana yazdırıldı",registerData)
//     const user = prisma.user.create({
//       data: {
//         name: registerData.name,
//         username: registerData.username,
//         surname: registerData.surname,
//         email: registerData.email,
//         password: registerData.password,
//         phone: registerData.phone,
//         roleId: registerData.roleId,
//     },
//     });
//     return user;
//   };
// }
class RegisterDbManager {
    constructor() {
        this.create = (registerData) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                console.log("Register data ekrana yazdırıldı", registerData);
                const user = yield client_1.default.user.create({
                    data: {
                        name: registerData.name,
                        username: registerData.username,
                        surname: registerData.surname,
                        email: registerData.email,
                        password: registerData.password,
                        phone: registerData.phone,
                        roleId: registerData.roleId,
                    },
                });
                return {
                    success: true,
                    message: "Kullanıcı kaydı başarılı.",
                    data: user
                };
            }
            catch (error) {
                console.error("Kayıt sırasında hata oluştu:", error);
                // Prisma'dan dönen benzersiz kısıtlama hatasını kontrol ediyoruz
                if (error.code === 'P2002' && ((_a = error.meta) === null || _a === void 0 ? void 0 : _a.target.includes('email'))) {
                    return {
                        success: false,
                        message: "Bu e-posta adresiyle zaten bir kullanıcı kaydı bulunmaktadır.",
                    };
                }
                return {
                    success: false,
                    message: "Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.",
                };
            }
        });
    }
}
exports.RegisterDbManager = RegisterDbManager;
