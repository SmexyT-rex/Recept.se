import express from "express";
import cors from "cors";
import "dotenv/config";
import userRoutes from "./routes/users/users.routes.js";
import { testConnection } from "./database/mysql/testConn.js";

const app = express();

app.use(cors());
app.use(express.json());

testConnection();

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Server running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
