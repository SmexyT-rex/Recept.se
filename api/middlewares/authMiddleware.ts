import type { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { AuthRequest, JwtPayload } from "../types/user.types.js";

const user = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).send("No token");
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as JwtPayload;

    req.user = decoded;
    next();
  } catch {
    return res.status(401).send("Invalid token");
  }
};

const adminCheck = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user?.role !== "admin") {
    return res.status(403).send("Admin access required");
  }
  next();
};

export const protect: { user: Function; admin: Function[] } = {
  user,
  admin: [user, adminCheck],
};
