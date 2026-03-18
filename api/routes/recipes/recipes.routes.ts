import { Router } from "express";
import { Recipe } from "../../models/recipe.js";

const router = Router();

router.get("/", (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Could not fetch recipes" });
    }
});

router.post("/", (req, res) => {
    try {
        const recipe = new Recipe(req.body);
        const savedRecipe = await recipe.save();

        res.status(201).json(savedRecipe);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Could not save recipe" });
    }
});

export default router;
