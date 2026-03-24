import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("Password123!", 12);

  const user = await prisma.user.upsert({
    where: { email: "demo@honbaplog.dev" },
    update: {},
    create: { email: "demo@honbaplog.dev", passwordHash, name: "데모유저" },
  });

  const challenge = await prisma.challenge.upsert({
    where: { code: "WEEKLY_HOMECOOK_5" },
    update: { isActive: true },
    create: {
      code: "WEEKLY_HOMECOOK_5",
      title: "주 5회 집밥 인증",
      description: "일주일 동안 집에서 만든 한 끼를 5회 인증하세요.",
      weekStartDate: new Date("2026-03-23T00:00:00.000Z"),
      weekEndDate: new Date("2026-03-29T23:59:59.999Z"),
      targetCount: 5,
      isActive: true,
    },
  });

  await prisma.badge.upsert({
    where: { id: "weekly-homecook-badge" },
    update: {},
    create: {
      id: "weekly-homecook-badge",
      challengeId: challenge.id,
      name: "집밥 5회 달성",
      description: "주 5회 집밥 챌린지 달성 뱃지",
    },
  });

  await prisma.mealPost.create({
    data: {
      userId: user.id,
      title: "시드 샘플 한 끼",
      description: "데모용 게시물입니다.",
      cookingTimeMin: 15,
      estimatedCostWon: 7000,
      imageUrls: ["https://picsum.photos/320/200"],
      visibility: "PUBLIC",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
