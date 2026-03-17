import { userRepository } from "../repositories/user.repositories.js";
import type { CreateUser, UpdateUser, User } from "../types/user.types.ts";

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
    const existing = await userRepository.findByEmail(data.email);

    if (existing) {
      throw new Error("Email already exists");
    }

    return userRepository.create(data);
  },

  async update(id: number, data: UpdateUser): Promise<void> {
    const updated = await userRepository.update(id, data);

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
