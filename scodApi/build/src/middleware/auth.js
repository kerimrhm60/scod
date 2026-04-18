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
exports.auth = auth;
const unauthorized_1 = require("../domain/exception/unauthorized");
const user_1 = require("../domain/user");
function auth(roles, userRoles) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        if (!req.user || req.user.id <= 0) {
            throw new unauthorized_1.Unauthorized("user is not found");
        }
        // if (!isAuthorized(req.user.role, req.user.permissions, roles, userRoles)) {
        //   throw new Forbidden(`invalid user/corporate role`);
        // }
        // if (!isAuthorized(req.user.role, req.user.permissions, roles, userRoles)) {
        //   throw new Forbidden(`invalid user/corporate role`);
        // }
        next();
    });
}
const isAuthorized = (userRole, permission, roles, permissions) => {
    if (userRole === user_1.UserRole.Admin)
        return true;
    if (!roles && !permissions)
        return true;
    const isUserRoleOk = !roles ||
        (roles && roles.length === 0) ||
        (roles && roles.length > 0 && roles.includes(userRole));
    const isPermissionsOk = !permissions ||
        (permissions && permissions.length === 0) ||
        (permissions &&
            permissions.length > 0 &&
            permissions.includes((permission === null || permission === void 0 ? void 0 : permission.toString()) || ""));
    if (!isUserRoleOk || !isPermissionsOk) {
        return false;
    }
    return true;
};
