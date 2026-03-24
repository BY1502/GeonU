import { prisma } from "@/lib/db";

export async function getRecipes() {
  return prisma.recipe.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { id: true, name: true } },
      ingredients: true,
      steps: { orderBy: { stepOrder: "asc" } },
    },
  });
}

export async function createRecipe(
  userId: string,
  input: {
    title: string;
    description: string;
    servings: number;
    ingredients: Array<{ name: string; quantity: number; unit: string }>;
    steps: Array<{ stepOrder: number; instruction: string }>;
  },
) {
  return prisma.recipe.create({
    data: {
      userId,
      title: input.title,
      description: input.description,
      servings: input.servings,
      ingredients: {
        create: input.ingredients,
      },
      steps: {
        create: input.steps,
      },
    },
    include: { ingredients: true, steps: true },
  });
}
