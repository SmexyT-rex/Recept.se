import "express-serve-static-core";

declare module "express-serve-static-core" {
  interface Request {
    cookies: { [key: string]: string };
  }
}

import type { JwtPayload } from "../user.types";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export {};
