import type { Request, Response } from "express";
import { userService } from "../services/user.service.js";
import type { CreateUser, UpdateUser } from "../types/user.types.ts";
import jwt from "jsonwebtoken";

export const userController = {
  async getAll(req: Request, res: Response) {
    const users = await userService.getAll();
    res.json(users);
  },

  async getById(req: Request<{ id: string }>, res: Response) {
    const user = await userService.getById(Number(req.params.id));
    res.json(user);
  },

  async getUserRecipes(req: Request<{ id: number }>, res: Response) {
    const recipes = await userService.getUserRecipes(Number(req.params.id));
    res.json(recipes);
  },

  async getByUsername(req: Request<{ username: string }>, res: Response) {
    const user = await userService.getByUsername(req.params.username);
    res.json({ username: user.username, email: user.email });
  },

  async create(req: Request<{}, {}, CreateUser>, res: Response) {
    const user = await userService.create(req.body);
    res.status(201).json(user);
  },

  async update(req: Request<{ id: string }, {}, UpdateUser>, res: Response) {
    await userService.update(Number(req.params.id), req.body);
    res.json({ message: "Updated" });
  },

  async delete(req: Request<{ id: string }>, res: Response) {
    await userService.delete(Number(req.params.id));
    res.json({ message: "Deleted" });
  },

  async login(
    req: Request<{}, {}, { email: string; password: string }>,
    res: Response,
  ) {
    console.log("Step 1:", req.body);

    if (!req.body) {
      return res.status(400).json({ error: "Missing body" });
    }

    const { email, password } = req.body;

    const token = await userService.login(email, password);
    console.log("Step 7: Sending response with token", token);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 3600000,
    });

    res.on("finish", () => {
      console.log("Step 8: Response finished");
    });

    return res.redirect(303, "/profile");
  },

  async logout(req: Request, res: Response) {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.redirect("/");
  },

  async isAuthenticated(req: Request, res: Response) {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
        id: number;
      };

      const user = await userService.getById(decoded.id);

      res.json({
        isAuthenticated: true,
        id: user.id,
        username: user.username,
        role: user.role,
      });
    } catch {
      return res.status(401).json({ error: "Invalid token" });
    }
  },
};
