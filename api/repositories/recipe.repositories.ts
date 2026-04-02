import { db } from "../database/mysql/connMySQL.js";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import type {
  CreateRecipe,
  UpdateRecipe,
  Recipe,
} from "../types/user.types.js";

export const recipeRepository = {
  async findAll(): Promise<Recipe[]> {
    const [rows] = await db.query<(Recipe & RowDataPacket)[]>(
      "SELECT * FROM recipes",
    );

    // Returnerar raderna som en lista av User-objekt.
    return rows;
  },

  async findById(id: number): Promise<Recipe | null> {
    const [rows] = await db.query<(Recipe & RowDataPacket)[]>(
      "SELECT * FROM recipes WHERE recipe_id = ?",
      [id],
    );

    return rows[0] ?? null;
  },

  async findByUserId(userId: number): Promise<Recipe | null> {
    const [rows] = await db.query<(Recipe & RowDataPacket)[]>(
      "SELECT * FROM recipes WHERE user_id = ?",
      [userId],
    );

    return rows[0] ?? null;
  },

  async create(data: CreateRecipe): Promise<Recipe> {
    await db.query(`INSERT INTO recipes (user_id, recipe_id) VALUES (?, ?)`, [
      data.user_id,
      data.recipe_id,
    ]);

    return data as Recipe;
  },

  async delete(id: string): Promise<boolean> {
    try {
      const [result] = await db.query<any>(
        "DELETE FROM recipes WHERE recipe_id = ?",
        [id],
      );

      const isDeleted = result?.affectedRows === 1;

      return isDeleted;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};
