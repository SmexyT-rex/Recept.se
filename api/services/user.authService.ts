/*

_________________________________________________________________________________________________

_________________________________________________________________________________________________


import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";
import { userRepository } from "../repositories/user.repositories.js";
import type { CreateUser } from "../types/user.types.ts";
import userService from "./user.service.js";

export const register = async (email: string, password: string) => {
  const hash = await bcrypt.hash(password, 12);
  return await userRepository.create({ email, password: hash });
};

export const login = async (email: string, password: string) => {
  const user = await userRepository.findOne({ email });
  if (!user) throw new Error("User not found");

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) throw new Error("Wrong password");

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return token;
};

_________________________________________________________________________________________________

_________________________________________________________________________________________________
 */
