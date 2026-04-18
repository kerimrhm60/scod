import { UserFields } from "../types/user";
export declare class RegisterDbManager {
    create: (registerData: UserFields) => Promise<{
        success: boolean;
        message: string;
        data?: any;
    }>;
}
