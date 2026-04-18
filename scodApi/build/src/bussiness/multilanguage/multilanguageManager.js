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
exports.MultilanguageManager = void 0;
const multilanguageDbManager_1 = require("../../database/multilanguageDbManager");
const exception_1 = require("../../domain/exception");
class MultilanguageManager {
    constructor(request) {
        this.addMultilanguageDefinition = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const definition = yield this.multilanguageDbManager.addMultilanguage(this.request);
                return definition;
            }
            catch (error) {
                throw new exception_1.BusinessException("unexpected error ${error}", 400);
            }
        });
        this.getMultilanguageValue = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.multilanguageDbManager.getMultilanguageValue(this.request);
                return response;
            }
            catch (error) {
            }
        });
        this.request = request;
        this.multilanguageDbManager = new multilanguageDbManager_1.MultilanguageDbManager();
    }
}
exports.MultilanguageManager = MultilanguageManager;
