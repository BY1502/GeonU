import { z } from "zod";

export const signupInputSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .max(64)
    .regex(/[A-Za-z]/, "영문자를 포함해야 합니다.")
    .regex(/[0-9]/, "숫자를 포함해야 합니다."),
  name: z.string().min(1).max(50).optional(),
});

export const loginInputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(64),
});
