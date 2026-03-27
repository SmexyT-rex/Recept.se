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

    return user;
  },

  async getByUsername(username: string): Promise<User> {
    const user = await userRepository.findByUsername(username);

    if (!user) {
      throw new Error("User not found");
    }

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
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 12);
    }

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

  async login(email: string, password: string): Promise<string> {
    console.log("Step 2:", { email, password });

    const error: string = "Invalid username or password";

    const user = await userRepository.login(email);
    console.log("Step 3: User found", user);
    if (!user) throw new Error(error);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Step 4: Password match", isMatch);
    if (!isMatch) throw new Error(error);

    const userRole = user.role;
    console.log("Step 5: User role", userRole);

    const token = jwt.sign(
      { id: user.id, username: user.username, role: userRole },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      },
    );
    console.log("Step 6: JWT Token generated", token);

    return token;
  },

  async getUserRecipes(userId: number) {
    return userRepository.findUserRecipes(userId);
  },
};
