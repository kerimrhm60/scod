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
const loginManager_1 = require("../../bussiness/auth/loginManager");
const exception_1 = require("../../domain/exception");
const router = express_1.default.Router();
router.post("/", 
// requestValidator(loginSchema),
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const request = req.body;
    console.log("request ekrana yazdırıldı", request);
    // const user = await new LoginManager(request).findUniqueUser();
    const loginManager = new loginManager_1.LoginManager(request);
    // const token  = await loginManager.findUniqueUser();
    // console.log("api tarafında user ekrana yazdırıldı",token);
    // res.send({token},);
    // result.success kontrolü yaparak başarısız durumlarda uygun yanıt döndürebilirsiniz
    const result = yield loginManager.findUniqueUser();
    console.log("API tarafında user ekrana yazdırıldı", result);
    // NotFound ya da diğer hatalı durumları ele almak
    if (result instanceof exception_1.NotFound) {
        res.status(404).send({ message: "Kullanıcı bulunamadı." });
        return;
    }
    if (!result.success) {
        res.status(400).send({ message: result.message });
        return;
    }
    // Başarılı yanıtı token ve user ile döndürüyoruz
    res.send({
        token: result.token,
        user: result.user,
    });
}));
exports.default = router;
