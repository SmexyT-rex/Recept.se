export class User {
  id!: number;
  username!: string;
  email!: string;
  password!: string;
  role: Role = Role.USER;
}

export class Recipe {
  id!: number;
  user_id!: number;
  recipe_id!: string;
}

export type JwtUser = {
  id: number;
  role: string;
};

export type CreateRecipe = Omit<Recipe, "id">;

export type UpdateRecipe = Partial<CreateRecipe>;

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

export type CreateUser = Omit<User, "id">;

export type UpdateUser = Partial<CreateUser>;

export interface JwtPayload {
  userId: number;
  role: "admin" | "user";
}

export interface AuthRequest extends Request {
  cookies: {
    [key: string]: string;
  };
  user?: {
    userId: number;
    role: "admin" | "user";
  };
}
