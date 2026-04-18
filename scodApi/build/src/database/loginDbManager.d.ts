import { UserLoginFields } from "../types/login";
export declare class LoginDbManager {
    findUniqueUser: (loginData: UserLoginFields) => Promise<any>;
    checkUserPassword: (password: string, hashPassword: string) => Promise<any>;
}
