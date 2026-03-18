import { Router } from "express";
import { Recipe } from "../../models/recipe.js";
import { findRecipes, postRecipe } from "../../controllers/recipe.contoller.js";

const router = Router();

router.get("/", findRecipes);

router.post("/", postRecipe);

export default router;
