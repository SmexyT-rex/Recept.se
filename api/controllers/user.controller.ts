import { Request, Response } from "express";
import { userService } from "../services/user.service";
import type { CreateUserDto, UpdateUserDto } from "../types/user.types";

export const userController = {
  async getAll(req: Request, res: Response) {
    const users = await userService.getAll();
    res.json(users);
  },

  async getById(req: Request<{ id: string }>, res: Response) {
    const user = await userService.getById(Number(req.params.id));
    res.json(user);
  },

  async create(
    req: Request<{}, {}, CreateUserDto>,
    res: Response
  ) {
    const user = await userService.create(req.body);
    res.status(201).json(user);
  },

  async update(
    req: Request<{ id: string }, {}, UpdateUserDto>,
    res: Response
  ) {
    await userService.update(Number(req.params.id), req.body);
    res.json({ message: "Updated" });
  },

  async delete(req: Request<{ id: string }>, res: Response) {
    await userService.delete(Number(req.params.id));
    res.json({ message: "Deleted" });
  },
};