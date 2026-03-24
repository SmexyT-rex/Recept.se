import express from "express";
import cors from "cors";
import "dotenv/config";
import userRoutes from "./routes/users/users.routes.js";
import { testConnection } from "./database/mysql/testConn.js";
import { connectMongoDB } from "./database/mongodb/connMongoDB.js";
import recipeRoutes from "./routes/recipes/recipes.routes.js";
import cookieParser from "cookie-parser";
import path from "path";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const webPath: string = path.join(process.cwd(), "web");
app.use(express.static(webPath));

app.use("/recipes", recipeRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(webPath, "index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(webPath, "login.html"));
});

await connectMongoDB();
await testConnection();

const PORT: number | string = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
