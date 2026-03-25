import type { Request, Response } from "express";
import { Recipe } from "../types/recipe.types.js";

// Define type of user-id as a number
type AuthorRequest = Request & {
    user?: {
        id: number;
    };
};

// GET - Find all recipes
export async function findRecipes(req: Request, res: Response) {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Could not fetch recipes" });
    }
}

// GET - Find a recipe by id
export async function findRecipeById(req: Request, res: Response) {
    try {
        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        res.json(recipe);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Could not fetch recipe" });
    }
}

// GET - Find recipes for logged-in user
export async function findMyRecipes(req: AuthorRequest, res: Response) {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const recipes = await Recipe.find({ author_id: req.user.id });
        res.json(recipes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Could not fetch user's recipes" });
    }
}

// POST - Create a new recipe for logged-in user
export async function postRecipe(req: AuthorRequest, res: Response) {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const recipe = new Recipe({
            ...req.body,
            author_id: req.user.id
        });

        const savedRecipe = await recipe.save();
        res.status(201).json(savedRecipe);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Could not save recipe" });
    }
}

// PUT - Update a recipe for logged-in user
export async function updateRecipe(req: AuthorRequest, res: Response) {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        if (recipe.author_id !== req.user.id) {
            return res.status(403).json({
                message: "Forbidden: You can only update your own recipes"
            });
        }

        const updatedRecipe = await Recipe.findByIdAndUpdate(
            req.params.id,
            {
                ...req.body,
                author_id: recipe.author_id
            },
            { new: true, runValidators: true } // Ensures Schema-rules being followed
        );

        res.json(updatedRecipe);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Could not update recipe" });
    }
}

// DELETE - Delete a recipe for logged-in user
export async function deleteRecipe(req: AuthorRequest, res: Response) {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        if (recipe.author_id !== req.user.id) {
            return res
                .status(403)
                .json({
                    message: "Forbidden: You can only delete your own recipes"
                });
        }

        await Recipe.findByIdAndDelete(req.params.id);

        res.json({ message: "Recipe deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Could not delete recipe" });
    }
}
