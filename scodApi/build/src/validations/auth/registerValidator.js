"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.registerSchema = joi_1.default.object({
    id: joi_1.default.number().optional(),
    username: joi_1.default.string().optional(),
    email: joi_1.default.string().optional(),
    phone: joi_1.default.string().optional(),
    password: joi_1.default.string().required(),
    name: joi_1.default.string().required(),
    surname: joi_1.default.string().required(),
    roleId: joi_1.default.number().required(),
});
