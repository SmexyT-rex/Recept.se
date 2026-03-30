import type { RequestHandler } from "express";

export const testMiddleware: RequestHandler = (req, res, next) => {
  console.log("TEST MIDDLEWARE HIT", req.method, req.url);
  next();
};
