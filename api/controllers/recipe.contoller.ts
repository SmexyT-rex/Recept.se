import type { Request, Response } from "express";
import { Recipe } from "../models/recipe.js";

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

// POST - Create a new recipe
export async function postRecipe(req: Request, res: Response) {
  try {
    const recipe = new Recipe(req.body);
    const savedRecipe = await recipe.save();

    res.status(201).json(savedRecipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not save recipe" });
  }
}

// PUT - Update a recipe
export async function updateRecipe(req: Request, res: Response) {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }, // Ensures Schema-rules being followed
    );

    if (!updatedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.json(updatedRecipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not update recipe" });
  }
}

// DELETE - Delete a recipe
export async function deleteRecipe(req: Request, res: Response) {
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);

    if (!deletedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.json({ message: "Recipe deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not delete recipe" });
  }
}
