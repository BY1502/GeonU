# 4) API 계약서 (MVP 최소)

## 공통 규칙
- Base URL: `/api`
- Content-Type: `application/json`
- 모든 입력은 zod로 검증
- 공통 응답:
  - 성공: `{ "ok": true, "data": ... }`
  - 실패: `{ "ok": false, "error": { "code": "...", "message": "...", "details": [...] } }`

## 인증 정책
- 인증 불필요:
  - `POST /api/auth/signup`
  - `POST /api/auth/login`
  - `GET /api/feed`
  - `GET /api/feed/:id`
  - `GET /api/recipes`
  - `GET /api/challenges/current`
- 인증 필요:
  - `POST /api/feed`
  - `POST /api/feed/:id/like`
  - `POST /api/feed/:id/comments`
  - `POST /api/recipes`
  - `POST /api/challenges/:id/join`
  - `POST /api/challenges/:id/checkin`
  - `GET /api/me`

---

## 1) POST /api/auth/signup
### Request
```json
{
  "email": "user@example.com",
  "password": "Password123!",
  "name": "홍길동"
}
```
### Response
```json
{
  "ok": true,
  "data": {
    "user": { "id": "cuid", "email": "user@example.com", "name": "홍길동" }
  }
}
```

## 2) POST /api/auth/login
### Request
```json
{
  "email": "user@example.com",
  "password": "Password123!"
}
```
### Response
```json
{
  "ok": true,
  "data": { "message": "로그인 성공" }
}
```

## 3) GET /api/feed
### Query
- `cursor?: string`
- `limit?: number` (기본 10, 최대 20)

### Response
```json
{
  "ok": true,
  "data": {
    "items": [
      {
        "id": "cuid",
        "title": "된장찌개 한 상",
        "description": "간단한 저녁",
        "cookingTimeMin": 20,
        "estimatedCostWon": 6000,
        "imageUrls": ["https://..."],
        "ingredientTags": ["두부", "된장"],
        "visibility": "PUBLIC",
        "author": { "id": "cuid", "name": "홍길동" },
        "likeCount": 3,
        "commentCount": 2,
        "createdAt": "2026-03-24T00:00:00.000Z"
      }
    ],
    "nextCursor": "cuid_or_null"
  }
}
```

## 4) POST /api/feed
### Request
```json
{
  "title": "닭가슴살 샐러드",
  "description": "고단백 점심",
  "cookingTimeMin": 15,
  "estimatedCostWon": 5500,
  "imageUrls": ["https://img1", "https://img2"],
  "ingredientTags": ["닭가슴살", "양상추"],
  "visibility": "PUBLIC"
}
```

## 5) GET /api/feed/:id
### Response
- feed 단건 + 댓글 목록(최신순)

## 6) POST /api/feed/:id/like
### Response
```json
{
  "ok": true,
  "data": { "liked": true, "likeCount": 4 }
}
```
- 중복 좋아요는 `409 CONFLICT`, `code=ALREADY_LIKED`

## 7) POST /api/feed/:id/comments
### Request
```json
{ "content": "맛있어 보여요!" }
```

## 8) GET /api/recipes
### Response
- 레시피 목록(작성자, 인분, 대표 재료 수, 작성일)

## 9) POST /api/recipes
### Request
```json
{
  "title": "김치볶음밥",
  "description": "10분 완성",
  "servings": 1,
  "ingredients": [
    { "name": "김치", "quantity": 150, "unit": "g" },
    { "name": "밥", "quantity": 1, "unit": "공기" }
  ],
  "steps": [
    { "stepOrder": 1, "instruction": "팬 예열" },
    { "stepOrder": 2, "instruction": "재료 볶기" }
  ]
}
```

## 10) GET /api/challenges/current
### Response
- 활성 챌린지 1종 반환: `주 5회 집밥 인증`

## 11) POST /api/challenges/:id/join
### Response
```json
{
  "ok": true,
  "data": { "participationId": "cuid", "currentCount": 0, "completedRate": 0 }
}
```

## 12) POST /api/challenges/:id/checkin
### Request
```json
{ "mealPostId": "cuid" }
```
### Response
```json
{
  "ok": true,
  "data": {
    "currentCount": 3,
    "completedRate": 60,
    "badgeAwarded": false
  }
}
```

## 13) GET /api/me
### Response
- 내 프로필 + 내 게시물/레시피 + 챌린지 참여 현황 + 보유 뱃지

