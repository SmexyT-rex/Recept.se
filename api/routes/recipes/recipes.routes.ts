import { Router } from "express";
import { Recipe } from "../../models/recipe.js";
import {
    findRecipes,
    findRecipeById,
    postRecipe,
    updateRecipe,
    deleteRecipe
} from "../../controllers/recipe.contoller.js";

const router = Router();

router.get("/", findRecipes);
router.get("/:id", findRecipeById);
router.post("/", postRecipe);
router.put("/:id", updateRecipe);
router.delete("/:id", deleteRecipe);

export default router;
