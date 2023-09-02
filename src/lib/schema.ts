import { z } from "zod";

export const tokenSchema = z.object({
  userId: z.string(),
  role: z.string(),
});
