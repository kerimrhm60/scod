import { LoginDbManager } from "../../database/loginDbManager";
import { NotFound } from "../../domain/exception";
import { UserLoginFields } from "../../types/login";
export declare class LoginManager {
    request: UserLoginFields;
    loginDbManager: LoginDbManager;
    constructor(request: UserLoginFields);
    findUniqueUser: () => Promise<NotFound | {
        success: boolean;
        message: string;
        token?: undefined;
        user?: undefined;
    } | {
        success: boolean;
        token: string;
        user: any;
        message?: undefined;
    }>;
}
