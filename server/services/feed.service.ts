import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { ApiError } from "@/lib/errors";
import { parseLimit } from "@/lib/pagination";
import { Visibility } from "@prisma/client";

export async function getFeed(input: { cursor?: string; limit?: number; viewerId?: string }) {
  const limit = parseLimit(input.limit ? String(input.limit) : null);
  const items = await prisma.mealPost.findMany({
    where: {
      OR: [{ visibility: Visibility.PUBLIC }, ...(input.viewerId ? [{ userId: input.viewerId }] : [])],
    },
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    take: limit + 1,
    ...(input.cursor ? { cursor: { id: input.cursor }, skip: 1 } : {}),
    include: {
      user: { select: { id: true, name: true } },
      likes: true,
      comments: true,
      ingredients: { include: { ingredient: true } },
    },
  });

  const hasNext = items.length > limit;
  const sliced = hasNext ? items.slice(0, limit) : items;

  return {
    items: sliced.map((post) => ({
      id: post.id,
      title: post.title,
      description: post.description,
      cookingTimeMin: post.cookingTimeMin,
      estimatedCostWon: post.estimatedCostWon,
      imageUrls: post.imageUrls,
      ingredientTags: post.ingredients.map((i) => i.ingredient.name),
      visibility: post.visibility,
      author: post.user,
      likeCount: post.likes.length,
      commentCount: post.comments.length,
      createdAt: post.createdAt,
    })),
    nextCursor: hasNext ? sliced[sliced.length - 1]?.id ?? null : null,
  };
}

export async function createFeedPost(
  userId: string,
  input: {
    title: string;
    description: string;
    cookingTimeMin: number;
    estimatedCostWon: number;
    imageUrls: string[];
    ingredientTags: string[];
    visibility: Visibility;
  },
) {
  return prisma.$transaction(async (tx) => {
    const post = await tx.mealPost.create({
      data: {
        userId,
        title: input.title,
        description: input.description,
        cookingTimeMin: input.cookingTimeMin,
        estimatedCostWon: input.estimatedCostWon,
        imageUrls: input.imageUrls,
        visibility: input.visibility,
      },
    });

    for (const tag of input.ingredientTags) {
      const ingredient = await tx.ingredient.create({
        data: {
          recipeId: (await ensureTagRecipe(tx, userId)).id,
          name: tag,
          quantity: 1,
          unit: "tag",
        },
      });

      await tx.mealPostIngredient.create({
        data: {
          mealPostId: post.id,
          ingredientId: ingredient.id,
        },
      });
    }

    return post;
  });
}

async function ensureTagRecipe(tx: Prisma.TransactionClient, userId: string) {
  const title = "__tag_container_recipe__";
  const existing = await tx.recipe.findFirst({ where: { userId, title } });
  if (existing) return existing;
  return tx.recipe.create({ data: { userId, title, description: "tag", servings: 1 } });
}

export async function getFeedById(id: string) {
  const post = await prisma.mealPost.findUnique({
    where: { id },
    include: {
      user: { select: { id: true, name: true } },
      comments: {
        orderBy: { createdAt: "desc" },
        include: { user: { select: { id: true, name: true } } },
      },
      likes: true,
      ingredients: { include: { ingredient: true } },
    },
  });

  if (!post) throw new ApiError("NOT_FOUND", 404, "게시물을 찾을 수 없습니다.");

  return {
    ...post,
    ingredientTags: post.ingredients.map((i) => i.ingredient.name),
    likeCount: post.likes.length,
  };
}

export async function likePost(userId: string, mealPostId: string) {
  try {
    await prisma.like.create({ data: { userId, mealPostId } });
  } catch {
    throw new ApiError("CONFLICT", 409, "이미 좋아요를 눌렀습니다.", { code: "ALREADY_LIKED" });
  }

  const likeCount = await prisma.like.count({ where: { mealPostId } });
  return { liked: true, likeCount };
}

export async function addComment(userId: string, mealPostId: string, content: string) {
  return prisma.comment.create({
    data: { userId, mealPostId, content },
    include: { user: { select: { id: true, name: true } } },
  });
}
