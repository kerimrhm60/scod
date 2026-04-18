import { UserRole, Permissions } from "../domain/user";
import { Request, Response } from "express";
export declare function auth(roles?: UserRole[], userRoles?: Permissions[]): (req: Request, res: Response, next: Function) => Promise<void>;
