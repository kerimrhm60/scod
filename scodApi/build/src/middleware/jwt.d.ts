import { UserFields } from "../types/user";
import { Request, Response, NextFunction } from "express";
declare global {
    namespace Express {
        interface Request {
            user: UserFields;
        }
    }
}
export declare function jwt(req: Request, res: Response, next: NextFunction): Promise<void>;
