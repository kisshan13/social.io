import { z } from "zod";

export const tokenSchema = z.object({
  userId: z.string(),
  role: z.string(),
});

export const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Must be of 8 letters"),
  username: z.string().min(2, "Must be of 3 letters"),
});
