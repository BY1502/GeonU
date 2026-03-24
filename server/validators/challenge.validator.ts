import { z } from "zod";

export const challengeIdParamSchema = z.object({ id: z.string().min(1) });

export const checkinSchema = z.object({
  mealPostId: z.string().min(1),
});
