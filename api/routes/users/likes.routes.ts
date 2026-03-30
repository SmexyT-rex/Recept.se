import { Router } from "express";
import type { NextFunction, Request, Response } from "express";
import { protect } from "../../middlewares/authMiddleware.js";
import { userController } from "../../controllers/users.controller.js";

const router = Router();

router.get("/ping", (req: Request, res: Response) => {
  console.log("[GET] /api/likes/ping called", { ip: req.ip });
  res.status(200).json({ message: "Likes route is working" });
});

router.post(
  "/",
  protect.user,
  (req: Request, res: Response, next: NextFunction) => {
    console.log("[POST] /api/likes", {
      userId: req.user?.id,
      body: req.body,
      ip: req.ip,
    });
    next();
  },
  userController.likeRecipe,
);
/* router.post("/unlike", protect.user, userController.unlikeRecipe); */

export default router;
