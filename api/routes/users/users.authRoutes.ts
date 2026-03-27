import { Router } from "express";
import { userController } from "../../controllers/users.controller.js";

const router = Router();

router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/me", userController.isAuthenticated);

export default router;
