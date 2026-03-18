import type { Request, Response } from "express";
import { Recipe } from "../models/recipe.js";

export async function findRecipes(req: Request, res: Response) {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not fetch recipes" });
  }
}

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
