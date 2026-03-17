import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectMongoDB } from "./connMongoDB";

const app = express();

app.use(cors());
app.use(express.json());

connectMongoDB();

app.get("/", (req, res) => {
    res.send("Server running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
