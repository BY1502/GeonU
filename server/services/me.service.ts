import { prisma } from "@/lib/db";

export async function getMe(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
      mealPosts: { orderBy: { createdAt: "desc" }, take: 10 },
      recipes: { orderBy: { createdAt: "desc" }, take: 10 },
      participations: {
        include: {
          challenge: true,
        },
      },
      userBadges: { include: { badge: true } },
    },
  });

  return user;
}
