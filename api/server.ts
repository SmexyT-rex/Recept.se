import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);

app.listen(process.env.PORT || 5002, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});
