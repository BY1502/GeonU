import { z } from "zod";

export const createRecipeSchema = z.object({
  title: z.string().min(1).max(120),
  description: z.string().min(1).max(1000),
  servings: z.number().int().min(1).max(20),
  ingredients: z
    .array(
      z.object({
        name: z.string().min(1).max(50),
        quantity: z.number().positive(),
        unit: z.string().min(1).max(20),
      }),
    )
    .min(1)
    .max(30),
  steps: z
    .array(
      z.object({
        stepOrder: z.number().int().min(1),
        instruction: z.string().min(1).max(1000),
      }),
    )
    .min(1)
    .max(50),
});
