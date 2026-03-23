import type { Request, Response } from "express";
import { userService } from "../services/user.service.js";
import type { CreateUser, UpdateUser } from "../types/user.types.ts";

export const userController = {
  async getAll(req: Request, res: Response) {
    const users = await userService.getAll();
    res.json(users);
  },

  async getById(req: Request<{ id: string }>, res: Response) {
    const user = await userService.getById(Number(req.params.id));
    res.json(user);
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
    if (!req.body) {
      return res.status(400).json({ error: "Missing body" });
    }

    const { email, password } = req.body;

    const token = await userService.login(email, password);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 3600000,
    });
  },
};
