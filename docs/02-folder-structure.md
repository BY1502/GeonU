# 2) 폴더 구조 (제안)

```txt
.
├─ app/
│  ├─ (public)/
│  │  ├─ feed/page.tsx
│  │  ├─ feed/[id]/page.tsx
│  │  ├─ recipes/page.tsx
│  │  └─ auth/
│  │     ├─ login/page.tsx
│  │     └─ signup/page.tsx
│  ├─ (protected)/
│  │  ├─ feed/new/page.tsx
│  │  ├─ recipes/new/page.tsx
│  │  ├─ challenges/page.tsx
│  │  └─ me/page.tsx
│  ├─ api/
│  │  ├─ auth/
│  │  │  ├─ signup/route.ts
│  │  │  └─ login/route.ts
│  │  ├─ feed/
│  │  │  ├─ route.ts
│  │  │  ├─ [id]/route.ts
│  │  │  ├─ [id]/like/route.ts
│  │  │  └─ [id]/comments/route.ts
│  │  ├─ recipes/route.ts
│  │  ├─ challenges/
│  │  │  ├─ current/route.ts
│  │  │  └─ [id]/
│  │  │     ├─ join/route.ts
│  │  │     └─ checkin/route.ts
│  │  └─ me/route.ts
│  └─ layout.tsx
├─ components/
│  ├─ ui/                  # shadcn/ui
│  ├─ feed/
│  ├─ recipes/
│  ├─ challenges/
│  └─ me/
├─ lib/
│  ├─ auth.ts
│  ├─ db.ts
│  ├─ errors.ts
│  ├─ pagination.ts
│  ├─ rate-limit.ts
│  └─ utils.ts
├─ server/
│  ├─ validators/
│  │  ├─ auth.validator.ts
│  │  ├─ feed.validator.ts
│  │  ├─ recipe.validator.ts
│  │  └─ challenge.validator.ts
│  ├─ services/
│  │  ├─ auth.service.ts
│  │  ├─ feed.service.ts
│  │  ├─ recipe.service.ts
│  │  ├─ challenge.service.ts
│  │  └─ me.service.ts
│  └─ repositories/
├─ prisma/
│  ├─ schema.prisma
│  ├─ migrations/
│  └─ seed.ts
├─ tests/
│  ├─ unit/
│  ├─ integration/
│  └─ e2e/
├─ middleware.ts
├─ package.json
└─ README.md
```

