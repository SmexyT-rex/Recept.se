import { Router } from "express";
import path from "path";

const router = Router();
const webPath = path.join(process.cwd(), "web");

router.get("/", (req, res) => {
  res.sendFile(path.join(webPath, "test.html"));
});

router.get("/recipes/:id", (req, res) => {
  res.sendFile(path.join(webPath, "recipe.html"));
});

router.get("/login", (req, res) => {
  res.sendFile(path.join(webPath, "login.html"));
});

router.get("/register", (req, res) => {
  res.sendFile(path.join(webPath, "register.html"));
});

export default router;
