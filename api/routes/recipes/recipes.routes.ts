import { Router } from "express";
import { protect } from "../../middlewares/authMiddleware.js";
import {
  findRecipes,
  findRecipeById,
  postRecipe,
  updateRecipe,
  deleteRecipe,
} from "../../controllers/recipe.contoller.js";

const router = Router();

router.get("/", findRecipes);
router.get("/:id", findRecipeById);
router.post("/", protect.user, postRecipe);
router.put("/:id", protect.user, updateRecipe);
router.delete("/:id", protect.user, deleteRecipe);

export default router;
