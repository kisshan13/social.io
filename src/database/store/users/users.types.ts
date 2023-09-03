export interface CreateUserInterface {
  email: string;
  password: string;
  username: string;
}

export interface UpdateUserInterface {
  username?: string;
  bio?: string;
  avatar?: string;
  profileType?: string;
  verified?: boolean;
}

export interface UserQueryInterface {
  id?: string;
  email?: string;
  username?: string;
}

export type UserFieldSelection =
  | "username"
  | "bio"
  | "avatar"
  | "profileType"
  | "email"
  | "password"
  | "followers"
  | "following"
  | "posts"
  | "requests"
  | "verified";
