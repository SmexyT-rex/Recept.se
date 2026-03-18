import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectMongoDB } from "./database/mongodb/connMongoDB.js";
import recipeRoutes from "./routes/recipes/recipes.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/recipes", recipeRoutes);

connectMongoDB();

app.get("/", (req, res) => {
    res.send("Server running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
