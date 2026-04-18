import { RegisterDbManager } from "../../database/registerDbManager";
import { UserFields } from "../../types/user";
export declare class RegisterManager {
    request: UserFields;
    registerDbManager: RegisterDbManager;
    constructor(request: UserFields);
    create: () => Promise<{
        success: boolean;
        message: string;
        data?: any;
    }>;
}
