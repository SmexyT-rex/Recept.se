import express from "express";
import cors from "cors";
import "dotenv/config";
import userRoutes from "./routes/users/users.routes.js";
import { testConnection } from "./database/mysql/testConn.js";
import { connectMongoDB } from "./database/mongodb/connMongoDB.js";
import recipeRoutes from "./routes/recipes/recipes.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/recipes", recipeRoutes);

connectMongoDB();

testConnection();

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Server running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
