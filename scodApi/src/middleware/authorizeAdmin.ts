import { Response, NextFunction } from "express";
import { AuthRequest } from "./authenticateToken"; 

export function authorizeAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  if (req.user?.RoleID !== 1) {
    return res.status(403).json({ message: "Yetkiniz yok" });
  }
  next();
}