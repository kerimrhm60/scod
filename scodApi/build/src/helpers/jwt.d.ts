import { UserFields } from "../types/user";
export declare function generateToken(user: UserFields): string;
export declare function verifyToken(token: string): UserFields | null;
