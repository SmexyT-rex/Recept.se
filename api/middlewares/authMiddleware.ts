import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";

import path from "path";
import { webPath } from "../routes/public/public.routes.js";

const user: RequestHandler = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    res.sendFile(path.join(webPath, "login.html"));
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    req.user = decoded as any;
    next();
  } catch {
    res.sendFile(path.join(webPath, "login.html"));
    return;
  }
};

const adminCheck: RequestHandler = (req, res, next) => {
  if (req.user?.role !== "admin") {
    res.sendFile(path.join(webPath, "login.html"));
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
