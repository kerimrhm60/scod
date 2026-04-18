"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Permissions = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["Admin"] = "ADMIN";
    UserRole["Dietician"] = "DIETICIAN";
    UserRole["UserWithDietician"] = "USERWITHDIETICIAN";
    UserRole["User"] = "USER";
})(UserRole || (exports.UserRole = UserRole = {}));
var Permissions;
(function (Permissions) {
    Permissions["view_clients"] = "VIEW_CLIENTS";
    Permissions["edit_clients"] = "EDIT_CLIENTS";
    Permissions["delete_clients"] = "DELETE_CLIENTS";
    Permissions["view_own_profile"] = "VIEW_OWN_PROFILE";
    Permissions["edit_own_profile"] = "EDIT_OWN_PROFILE";
    Permissions["record_daily_intake"] = "RECORD_DAILY_INTAKE";
})(Permissions || (exports.Permissions = Permissions = {}));
