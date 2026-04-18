import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../helpers/jwt";


export interface UserPayload {
  UserID: number;
  RoleID: number;
}

export type AuthRequest = Request & {
  user?: UserPayload;
};

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token bulunamadı" });
  }
  const user = verifyToken(token);
  if (!user) {
    return res.status(403).json({ message: "Token geçersiz" });
  }
  (req as AuthRequest).user = user;
  next();
}
