import { userRepository } from "../repositories/user.repositories.js";
import type { CreateUser, UpdateUser, User } from "../types/user.types.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// export function printUser(user: User): string {
//   return `
//     ID: ${user.id}
//     Name: ${user.name}
//     Email: ${user.email}
//     Age: ${user.age}
//     Address: ${user.address}
//     Role: ${user.role}
//   `;
// }

export const userService = {
  async getAll(): Promise<User[]> {
    return userRepository.findAll();
  },

  async getById(id: number): Promise<User> {
    const user = await userRepository.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    // printUser(user);

    return user;
  },

  async getByUsername(username: string): Promise<User> {
    const user = await userRepository.findByUsername(username);

    if (!user) {
      throw new Error("User not found");
    }

    // printUser(user);

    return user;
  },

  async create(data: CreateUser): Promise<User> {
    const existingEmail = await userRepository.findByEmail(data.email);
    const existingUsername = await userRepository.findByUsername(data.username);

    if (existingUsername) {
      throw new Error("Username already exists");
    }

    if (existingEmail) {
      throw new Error("Email already exists");
    }

    const hash = await bcrypt.hash(data.password, 12);
    data.password = hash;

    return userRepository.create(data);
  },

  async update(id: number, data: UpdateUser): Promise<void> {
    const updateData = { ...data };

    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 12);
    }

    const updated = await userRepository.update(id, updateData);

    if (!updated) {
      throw new Error("User not found");
    }
  },

  async delete(id: number): Promise<void> {
    const deleted = await userRepository.delete(id);

    if (!deleted) {
      throw new Error("User not found");
    }
  },
};
