import { Router } from "express";
import { userController } from "../../controllers/users.controller.js";

const router = Router();

router.get("/", userController.getAll);
router.get("/:id", userController.getById);
router.get("/username/:username", userController.getByUsername);
router.post("/", userController.create);
router.patch("/:id", userController.update);
router.delete("/:id", userController.delete);

export default router;
