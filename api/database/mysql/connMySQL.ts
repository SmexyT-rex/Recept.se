import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const db = mysql.createPool({
  host: process.env.MYSQL_HOST || "",
  user: process.env.MYSQL_USER || "",
  password: process.env.MYSQL_PASSWORD || "",
  database: process.env.MYSQL_DATABASE || "",
  ssl: {
    ca: process.env.DB_SSL_CA?.replace(/\\n/gm, "\n") || "",
  },
  waitForConnections: true,
  connectionLimit: 5,
});
