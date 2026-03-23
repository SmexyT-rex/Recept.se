export class User {
  id!: number;
  username!: string;
  email!: string;
  password!: string;
  role: Role = Role.USER;
}

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
