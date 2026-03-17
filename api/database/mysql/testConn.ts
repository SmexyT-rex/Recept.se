import { db } from "./connMySQL.js"; // your pool

export async function testConnection() {
  try {
    const connection = await db.getConnection();
    console.log("Connected to MySQL!");

    // Optional: run a simple query
    const [rows] = await db.query("SHOW STATUS LIKE 'Ssl_cipher';");
    console.log(rows);

    connection.release();
  } catch (err) {
    console.error("MySQL connection failed:", err);
  }
}
