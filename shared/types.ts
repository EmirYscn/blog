export enum ROLE {
  ADMIN = "ADMIN",
  USER = "USER",
  AUTHOR = "AUTHOR",
}

export type User = {
  id: number;
  email: string;
  username: string;
  role: ROLE;
  avatar: string;
};
