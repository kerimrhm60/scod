"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetMlWordsSchema = exports.CreateSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.CreateSchema = joi_1.default.object({
    MlCode: joi_1.default.string().required(),
    CountryCode: joi_1.default.string().required(),
    MlValue: joi_1.default.string().required(),
    ApplicationCode: joi_1.default.string().required(),
    UpdatedDate: joi_1.default.date().optional(),
});
exports.GetMlWordsSchema = joi_1.default.object({
    MlCode: joi_1.default.string().required(),
    CountryCode: joi_1.default.string().required(),
    ApplicationCode: joi_1.default.string().required(),
});
