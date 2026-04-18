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
exports.MultilanguageDbManager = void 0;
const client_1 = __importDefault(require("../../prisma/client"));
const exception_1 = require("../domain/exception");
class MultilanguageDbManager {
    constructor() {
        this.addMultilanguage = (mlDef) => __awaiter(this, void 0, void 0, function* () {
            try {
                const isUnique = yield client_1.default.multilanguage.findUnique({
                    where: {
                        MlCode: mlDef.MlCode,
                    },
                });
                if (!isUnique) {
                    throw new exception_1.BusinessException("ml must be unique", 400);
                }
                const definition = yield client_1.default.multilanguage.create({
                    data: {
                        ApplicationCode: mlDef.ApplicationCode,
                        CountryCode: mlDef.CountryCode,
                        MlCode: mlDef.MlCode,
                        MlValue: mlDef.MlValue,
                        createdAt: new Date(),
                        updatedAt: mlDef.UpdatedDate,
                        isDeleted: false,
                    },
                });
                return definition;
            }
            catch (error) {
                return error;
            }
        });
        this.getMultilanguageValue = (req) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield client_1.default.multilanguage.findUnique({
                    where: {
                        MlCode: req.MlCode,
                        ApplicationCode: req.ApplicationCode,
                        CountryCode: req.CountryCode
                    }
                });
                if (!result) {
                    return { isError: true, message: "multilanguage code can not found", status: 404 };
                }
                return result;
            }
            catch (error) {
            }
        });
    }
}
exports.MultilanguageDbManager = MultilanguageDbManager;
