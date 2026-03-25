import { Router } from "express";
import {
    findRecipes,
    findRecipeById,
    findMyRecipes,
    postRecipe,
    updateRecipe,
    deleteRecipe
} from "../../controllers/recipe.controller.js";

const router = Router();

router.get("/my/all", findMyRecipes); // This needs to be placed at top
router.get("/", findRecipes);
router.get("/:id", findRecipeById);
router.post("/", postRecipe);
router.put("/:id", updateRecipe);
router.delete("/:id", deleteRecipe);

export default router;
