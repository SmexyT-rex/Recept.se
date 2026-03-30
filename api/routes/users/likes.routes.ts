import { Router } from "express";
import { protect } from "../../middlewares/authMiddleware.js";
import { userController } from "../../controllers/users.controller.js";

const router = Router();

router.post("/", protect.user, userController.likeRecipe);
/* router.post("/unlike", protect.user, userController.unlikeRecipe); */

export default router;
