"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSchema = void 0;
const joi_1 = __importDefault(require("joi"));
// export const postSchema = joi.object({
//     id: joi.number().optional(),
//     userId: joi.number().optional(),
//     postText: joi.string().optional(),
//     postImage: joi.string().optional(),
//     postDate: joi.string().optional(),
// });
exports.postSchema = joi_1.default.object({
    userId: joi_1.default.number().optional(),
});
