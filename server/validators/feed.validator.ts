import { Visibility } from "@prisma/client";
import { z } from "zod";

export const createMealPostSchema = z.object({
  title: z.string().min(1).max(120),
  description: z.string().min(1).max(1000),
  cookingTimeMin: z.number().int().min(1).max(600),
  estimatedCostWon: z.number().int().min(0).max(1_000_000),
  imageUrls: z.array(z.string().url()).min(1).max(3),
  ingredientTags: z.array(z.string().min(1).max(30)).max(20),
  visibility: z.nativeEnum(Visibility).default(Visibility.PUBLIC),
});

export const addCommentSchema = z.object({
  content: z.string().min(1).max(500),
});

export const feedQuerySchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(20).optional(),
});
