import mysql, { type PoolOptions } from "mysql2/promise";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const poolOptions: PoolOptions = {
  host: process.env.MYSQL_DB_HOST!,
  user: process.env.MYSQL_DB_USER!,
  password: process.env.MYSQL_DB_PASSWORD!,
  database: process.env.MYSQL_DB_NAME!,
  port: Number(process.env.MYSQL_DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 5,
};

if (process.env.MYSQL_DB_CERT_PATH) {
  poolOptions.ssl = {
    ca: fs.readFileSync(process.env.MYSQL_DB_CERT_PATH, "utf-8"),
  };
}

export const db = mysql.createPool(poolOptions);

export default db;
