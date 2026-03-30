import type { Request, Response } from "express";
import { Router } from "express";
import path from "path";
import { protect } from "../../middlewares/authMiddleware.js";
import { findManyRecipes } from "../../controllers/recipe.contoller.js";

interface RouteHandler {
  (req: Request, res: Response): void;
}

interface ProtectedRouteHandler {
  (req: Request, res: Response): void;
}

const router: Router = Router();
export const webPath: string = path.join(process.cwd(), "web");

router.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(webPath, "test.html"));
});

router.get("/recipes/:id", (req: Request, res: Response) => {
  res.sendFile(path.join(webPath, "recipe.html"));
});

router.post("/recipes", findManyRecipes);

router.get("/login", (req: Request, res: Response) => {
  res.sendFile(path.join(webPath, "login.html"));
});

router.get("/register", (req: Request, res: Response) => {
  res.sendFile(path.join(webPath, "register.html"));
});

router.get("/dashboard", protect.user, (req: Request, res: Response) => {
  res.sendFile(path.join(webPath, "dashboard.html"));
});

router.get("/admin", protect.admin, (req: Request, res: Response) => {
  res.sendFile(path.join(webPath, "admin.html"));
});

export default router;
