import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  unit: { type: String, required: true },
});

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  tags: [{ type: String }],
  ingredients: [ingredientSchema],
  steps: [{ type: String }],
  images: [{ type: String }],
  author_id: { type: Number, required: true },
  created_at: { type: Date, default: Date.now },
});

export const Recipe = mongoose.model("Recipe", recipeSchema);
