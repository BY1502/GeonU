import { test, expect } from "@playwright/test";

test("가입→로그인→한 끼 작성→피드 확인", async ({ page }) => {
  await page.goto("/auth/signup");
  await page.getByLabel("이메일").fill("e2e@honbaplog.dev");
  await page.getByLabel("비밀번호").fill("Password123!");
  await page.getByLabel("닉네임").fill("E2E유저");

  await page.goto("/auth/login");
  await page.getByLabel("이메일").fill("e2e@honbaplog.dev");
  await page.getByLabel("비밀번호").fill("Password123!");
  await page.getByLabel("로그인").click();

  await page.goto("/feed/new");
  await page.getByLabel("제목").fill("E2E 한 끼");
  await page.getByLabel("한 끼 작성").click();

  await page.goto("/feed");
  await expect(page.getByText("E2E 한 끼")).toBeVisible();
});
