import { db } from "../database/mysql/connMySQL.js";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import type { User, CreateUser, UpdateUser } from "../types/user.types.ts";

export const userRepository = {
  async findAll(): Promise<User[]> {
    // Kör en SQL-fråga mot databasen och säger till TypeScript
    // att varje rad som returneras är både en User och en RowDataPacket.
    // RowDataPacket krävs av mysql2 för att typningen ska fungera korrekt.
    // Vi destrukturerar första värdet i arrayen eftersom db.query returnerar
    // [rows, fields], och vi är bara intresserade av rows.
    const [rows] = await db.query<(User & RowDataPacket)[]>(
      "SELECT * FROM users",
    );

    // Returnerar raderna som en lista av User-objekt.
    return rows;
  },

  async findById(id: number): Promise<User | null> {
    const [rows] = await db.query<(User & RowDataPacket)[]>(
      "SELECT * FROM users WHERE id = ?",
      [id],
    );

    return rows[0] ?? null;
  },

  async findByEmail(email: string): Promise<User | null> {
    const [rows] = await db.query<(User & RowDataPacket)[]>(
      "SELECT * FROM users WHERE email = ?",
      [email],
    );

    return rows[0] ?? null;
  },

  async findByUsername(username: string): Promise<User | null> {
    const [rows] = await db.query<(User & RowDataPacket)[]>(
      "SELECT * FROM users WHERE username = ?",
      [username],
    );

    return rows[0] ?? null;
  },

  async create(data: CreateUser): Promise<User> {
    await db.query(`CALL create_user_with_role(?, ?, ?, ?)`, [
      data.username,
      data.email,
      data.password,
      data.role,
    ]);

    return data as User;
  },

  async update(id: number, data: UpdateUser): Promise<boolean> {
    const fields = Object.keys(data);
    const values = Object.values(data);

    if (!fields.length) return false;

    const setClause = fields.map((f) => `${f} = ?`).join(", ");

    const [result] = await db.query<ResultSetHeader>(
      `UPDATE users SET ${setClause} WHERE id = ?`,
      [...values, id],
    );

    return result.affectedRows > 0;
  },

  async delete(id: number): Promise<boolean> {
    const [result] = await db.query<ResultSetHeader>(
      "DELETE FROM users WHERE id = ?",
      [id],
    );

    return result.affectedRows > 0;
  },
};
