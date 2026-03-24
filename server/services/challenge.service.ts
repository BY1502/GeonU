import { prisma } from "@/lib/db";
import { ApiError } from "@/lib/errors";

export async function getCurrentChallenge() {
  return prisma.challenge.findFirst({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
    include: { badges: true },
  });
}

export async function joinChallenge(userId: string, challengeId: string) {
  return prisma.challengeParticipation.upsert({
    where: { userId_challengeId: { userId, challengeId } },
    update: {},
    create: {
      userId,
      challengeId,
      currentCount: 0,
      completedRate: 0,
    },
  });
}

export async function checkinChallenge(userId: string, challengeId: string, mealPostId: string) {
  const participation = await prisma.challengeParticipation.findUnique({
    where: { userId_challengeId: { userId, challengeId } },
    include: { challenge: true },
  });

  if (!participation) throw new ApiError("NOT_FOUND", 404, "챌린지 참여 이력이 없습니다.");

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const existing = await prisma.challengeCheckin.findFirst({
    where: {
      participationId: participation.id,
      checkinDate: today,
    },
  });

  if (existing) throw new ApiError("CONFLICT", 409, "오늘은 이미 체크인했습니다.");

  await prisma.challengeCheckin.create({
    data: {
      participationId: participation.id,
      mealPostId,
      checkinDate: today,
    },
  });

  const currentCount = participation.currentCount + 1;
  const completedRate = Math.min(100, Math.floor((currentCount / participation.challenge.targetCount) * 100));
  const completedAt = completedRate >= 100 ? new Date() : null;

  const updated = await prisma.challengeParticipation.update({
    where: { id: participation.id },
    data: { currentCount, completedRate, completedAt },
  });

  let badgeAwarded = false;
  if (completedAt) {
    const badge = await prisma.badge.findFirst({ where: { challengeId } });
    if (badge) {
      await prisma.userBadge.upsert({
        where: { userId_badgeId: { userId, badgeId: badge.id } },
        update: {},
        create: { userId, badgeId: badge.id },
      });
      badgeAwarded = true;
    }
  }

  return { currentCount: updated.currentCount, completedRate: updated.completedRate, badgeAwarded };
}
