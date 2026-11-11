MY NEWS 365 — 통합 배포 안내

1. GitHub landdesigner/mynews365에 ZIP 압축을 푼 파일을 업로드합니다. index.html, site-config.js, pro-features.js는 저장소 최상위에 있어야 합니다.
2. Supabase 무료 프로젝트 생성 후 SQL Editor에서 supabase_setup.sql 실행.
3. Authentication > URL Configuration에서 Site URL = https://mynews365.netlify.app, Redirect URLs에도 https://mynews365.netlify.app/** 추가. 이메일 OTP 활성화.
4. Supabase Project Settings > API에서 Project URL과 publishable key(또는 legacy anon key)를 복사하여 site-config.js 두 값에 입력. service_role / secret key는 절대로 입력하지 마세요.
5. 사이트에 본인 이메일로 한 번 로그인한 뒤 SQL 파일 마지막의 관리자 지정 INSERT를 실제 이메일로 바꿔 Supabase SQL Editor에서 실행.
6. Netlify 배포가 Published가 되면 뉴스 TOP 5, 승인 대기 댓글, 승인 후 공개, 다른 기기 로그인 동기화를 테스트.

중요: 관리자 승인과 RLS는 DB에서 강제됩니다. 단, 익명 댓글은 자동화된 대량 제출에 취약할 수 있으므로 실제 공개 운영에는 Cloudflare Turnstile + 서버측 검증, IP별 rate limit, 신고/차단 정책을 추가 권장합니다. 현재는 브라우저 30초 제한과 숨김 필드만 기본 제공하며 강력한 서버측 스팸 차단은 아닙니다.

기기 간 동기화는 기존 즐겨찾기 저장 키를 사용하는 경우에만 적용됩니다. 다른 저장 키를 쓰는 기존 버전은 별도 매핑이 필요할 수 있습니다. 동일 계정으로 로그인한 다음 새로고침하여 반영하세요.
