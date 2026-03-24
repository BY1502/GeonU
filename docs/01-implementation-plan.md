# 1) 구현 계획 (MVP 1차 설계)

## 목표
혼밥로그 MVP의 핵심 유저 플로우(가입→로그인→한 끼 작성→피드 확인)를 기준으로, 8주 내 배포 가능한 기능 집합을 단계적으로 구현한다.

## 범위
- 포함: 인증, 피드/레시피 CRUD(최소), 좋아요/댓글, 단일 주간 챌린지, 마이페이지, 테스트 기본 세트
- 제외: NFT, 동네거래, 실시간 채팅, 광고 매칭 플랫폼

## 단계별 실행 계획
1. **프로젝트 부트스트랩**
   - Next.js 14(App Router) + TypeScript + Tailwind + shadcn/ui 초기화
   - Prisma + PostgreSQL 연결, 환경변수 구조 수립
2. **인증 기반 구축**
   - NextAuth Credentials 구성
   - `POST /api/auth/signup`, `POST /api/auth/login`
   - bcrypt 비밀번호 해시, 로그인 rate limit 적용
3. **데이터 모델/서비스 레이어 구현**
   - Prisma 모델 생성 및 마이그레이션
   - 도메인별 서비스(`feed`, `recipes`, `challenges`, `me`) 구성
4. **API 라우트 구현 + zod 검증 + 공통 에러 포맷**
   - 요청/응답 DTO, validator, 핸들러 구현
   - 인증 필요 엔드포인트 가드
5. **UI 구현(모바일 우선)**
   - 피드 리스트/상세/작성, 레시피 리스트/작성
   - 챌린지 참여/체크인/달성률, 마이페이지 대시보드
6. **테스트**
   - 단위: validator/service
   - 통합: 게시물 생성/조회, 좋아요 중복 방지, 챌린지 체크인
   - E2E: 가입→로그인→한 끼 작성→피드 확인
7. **시드/README/배포 준비**
   - seed 데이터 생성
   - 로컬 실행/테스트 가이드 문서화

## 기술적 의사결정
- **입력 검증**: 모든 API는 zod schema 기반 검증 실패 시 `400` + 표준 에러 포맷
- **에러 포맷 통일**:
  ```json
  {
    "ok": false,
    "error": {
      "code": "VALIDATION_ERROR",
      "message": "요청 값이 올바르지 않습니다.",
      "details": []
    }
  }
  ```
- **인증 필요 엔드포인트**: 서버 세션 검사 유틸(`requireAuth`)로 강제
- **페이지네이션**: `GET /api/feed?cursor=<id>&limit=10` 커서 방식
- **접근성**: 핵심 버튼/입력에 `aria-label` 의무 적용

