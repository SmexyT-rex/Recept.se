export interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  address: string;
  role: "user" | "admin";

  // phone: string;
}

export type CreateUserDto = Omit<User, "id">;

export type UpdateUserDto = Partial<CreateUserDto>;