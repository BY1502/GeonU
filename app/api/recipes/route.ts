import { ok } from "@/lib/errors";
import { parseBody, withErrorHandling } from "@/lib/route";
import { requireAuth } from "@/lib/require-auth";
import { createRecipe, getRecipes } from "@/server/services/recipe.service";
import { createRecipeSchema } from "@/server/validators/recipe.validator";

export async function GET() {
  return withErrorHandling(async () => ok(await getRecipes()));
}

export async function POST(req: Request) {
  return withErrorHandling(async () => {
    const user = await requireAuth();
    const input = await parseBody(req, createRecipeSchema);
    const recipe = await createRecipe(user.id, input);
    return ok(recipe, 201);
  });
}
