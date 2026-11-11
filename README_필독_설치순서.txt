MY NEWS 365 수정판 - 설치 순서

1. ZIP 압축을 풀어 GitHub 저장소의 같은 경로에 업로드하고 Commit 합니다.
2. Supabase SQL Editor에서 기존 supabase_setup.sql을 실행한 적이 있다면 재실행할 필요 없습니다. 새 파일 supabase_feedback_setup.sql 전체를 복사하여 Run 하세요.
3. site-config.js에 기존에 사용하던 Supabase 프로젝트 URL과 공개용 anon/publishable 키를 입력하세요. 기존 GitHub에 올린 정상 설정이 있다면 덮어쓰지 말고 그 설정을 유지하세요. 비밀 키는 절대 올리지 마세요.
4. Supabase Authentication > Users에 운영자 이메일 계정이 있어야 합니다. Supabase SQL Editor에서 다음 SQL을 운영자 이메일로 변경해 실행합니다.
insert into public.profiles(id,is_admin) select id,true from auth.users where email='YOUR_ADMIN_EMAIL@example.com' on conflict(id) do update set is_admin=true;
5. 홈페이지 '운영자 로그인 · 댓글 관리'에서 로그인 링크를 발송하고 이메일에서 링크를 열면, '함께 만드는 MY NEWS 365' 아래 '관리자 승인 대기'에서 댓글 승인/삭제 및 비공개 개선 의견 확인이 가능합니다.
6. '관심 뉴스 · 추가 요청 · 개선 의견'은 Netlify Forms가 아니라 Supabase feedback 테이블로 접수합니다. Netlify Forms의 HTTP 404를 회피합니다.
7. 기기 간 설정 동기화 UI와 기능은 제거했습니다. MY TOPICS와 즐겨찾기는 기기별 로컬 저장으로 유지됩니다.
8. Netlify 배포가 Published인지 확인하고 강력 새로고침(Ctrl+Shift+R) 후 테스트하세요.
주의: 기존 site-config.js를 빈 기본값으로 덮어쓰면 댓글이 작동하지 않습니다.
