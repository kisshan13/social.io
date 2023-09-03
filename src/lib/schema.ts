import { z } from "zod";

export const tokenSchema = z.object({
  uuid: z.string(),
  role: z.string(),
});

export const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Must be of 8 letters"),
  username: z.string().min(2, "Must be of 3 letters"),
});

export const otpSchema = z.object({
  otp: z
    .number()
    .min(100000, "Must be of 6 digit")
    .max(999999, "Must be of 6 digit"),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
