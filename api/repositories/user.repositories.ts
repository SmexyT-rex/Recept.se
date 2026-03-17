import { db } from "../database/mysql/connMySQL.js";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import type { User, CreateUserDto, UpdateUserDto } from "../types/user.types";

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

  async findbyId(id: number): Promise<User | null> {
    const [rows] = await db.query<(User & RowDataPacket)[]>(
      "SELECT * FROM users WHERE id = ?",
      [id],
    );

    return rows[0] ?? null;
  },

  async findbyEmail(email: string): Promise<User | null> {
    const [rows] = await db.query<(User & RowDataPacket)[]>(
      "SELECT * FROM users WHERE email = ?",
      [email],
    );

    return rows[0] ?? null;
  },

  async create(data: CreateUserDto): Promise<User> {
    const [result] = await db.query<ResultSetHeader>(
      `INSERT INTO users (name, email, age, address, role)
       VALUES (?, ?, ?, ?, ?)`,
      [data.name, data.email, data.age, data.address, data.role],
    );

    return {
      id: result.insertId,
      ...data,
    };
  },

  async update(id: number, data: UpdateUserDto): Promise<boolean> {
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
