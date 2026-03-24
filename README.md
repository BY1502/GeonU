# 혼밥로그 MVP

1인 가구를 위한 한 끼 기록 + 레시피 공유 + 주간 챌린지 서비스 MVP입니다.

## 기술 스택
- Next.js 14 (App Router), TypeScript, Tailwind
- PostgreSQL + Prisma
- NextAuth (Credentials)
- zod validation
- Vitest + Playwright

## 로컬 실행
1. 의존성 설치
   ```bash
   npm install
   ```
2. 환경변수 설정 (`.env`)
   ```bash
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/honbaplog"
   AUTH_SECRET="your-secret"
   NEXTAUTH_URL="http://localhost:3000"
   NEXT_PUBLIC_BASE_URL="http://localhost:3000"
   ```
3. Prisma 생성/마이그레이션
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   ```
4. 시드 데이터 적재
   ```bash
   npm run prisma:seed
   ```
5. 개발 서버 실행
   ```bash
   npm run dev
   ```

## 테스트
- 단위/통합: `npm test`
- E2E: `npm run test:e2e`

## 기본 계정 (시드)
- email: `demo@honbaplog.dev`
- password: `Password123!`
