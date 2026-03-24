# 10) 리스크 및 TODO

## 리스크
- tag 저장을 `Ingredient`에 위임한 구조는 장기적으로 정규화 이슈가 생길 수 있음
- NextAuth 로그인 검증 API와 세션 생성 흐름을 통합 UX로 개선 필요
- 이미지 업로드가 URL 기반 임시 처리 상태(실제 업로드 스토리지 미연동)
- rate limit 메모리 저장소는 멀티 인스턴스 환경에서 한계

## TODO
- 이미지 업로드(S3 등) + 서명 URL
- Redis 기반 rate limit
- 챌린지 주차 자동 교체 배치
- shadcn/ui 컴포넌트 세분화 및 디자인 토큰 정리
