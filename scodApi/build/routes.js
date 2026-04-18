"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setRoutes = void 0;
const express_1 = __importDefault(require("express"));
const logger_1 = __importDefault(require("./src/logger/logger"));
const morgan = require("morgan");
const cors_1 = __importDefault(require("cors"));
const helmet = require("helmet");
const register_1 = __importDefault(require("./src/routes/auth/register"));
const login_1 = __importDefault(require("./src/routes/auth/login"));
const multilanguage_1 = __importDefault(require("./src/routes/multiLanguage/multilanguage"));
const comesgoes_1 = __importDefault(require("./src/routes/comesandgoes/comesgoes"));
const setRoutes = (app) => {
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(logger_1.default);
    if (app.get("env") === "development") {
        app.use(morgan('combined'));
    }
    app.use(express_1.default.static("public"));
    app.use(helmet());
    app.use("/api/register", register_1.default);
    app.use("/api/login", login_1.default);
    app.use("/api/comesandgoes", comesgoes_1.default);
    app.use("/api/multilanguage", multilanguage_1.default);
};
exports.setRoutes = setRoutes;
