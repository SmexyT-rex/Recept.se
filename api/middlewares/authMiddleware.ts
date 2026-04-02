import type { RequestHandler } from "express";
import type { JwtUser } from "../types/user.types.js";
import jwt from "jsonwebtoken";

const user: RequestHandler = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    res.redirect(303, "/login");
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    req.user = decoded as JwtUser;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
    return;
  }
};

const adminCheck: RequestHandler = (req, res, next) => {
  if (req.user?.role !== "admin") {
    res.status(403).json({ error: "Access denied" });
    return;
  }

  next();
};

export const protect: {
  user: RequestHandler;
  admin: RequestHandler[];
} = {
  user,
  admin: [user, adminCheck],
};
