MY NEWS 365 — 세 가지 문제 수정판 (2026-11-11)

1) 댓글 불러오기: site-config.js의 supabaseUrl에는 https://프로젝트ID.supabase.co 만 입력합니다. /rest/v1, /dashboard, /project/... 경로를 넣으면 Invalid path 오류가 발생합니다. supabaseAnonKey에는 publishable/anon 공개 키를 입력합니다. SQL Editor에서 supabase_setup.sql을 실행했는지 확인합니다. Supabase URL이 잘못된 경우 화면에 안내가 표시되도록 개선했습니다. 실제 프로젝트 URL과 키는 사용자가 입력해야 합니다.
2) 다온숲 검색: netlify/functions/topic-news.js의 잘못된 정규식 이스케이프를 수정했습니다. 최근 30일 검색 후 결과가 없으면 기간 제한 없이 재검색합니다. 다온숲 기사 자체가 없으면 결과가 없을 수 있습니다. GitHub 업로드 시 netlify/functions/topic-news.js를 반드시 해당 경로에 넣으세요.
3) 의견 보내기: Netlify가 빌드 시 양식을 인식할 수 있도록 forms.html을 추가하고 별도 접수 페이지 feedback-success.html을 생성했습니다. Netlify 대시보드 > 해당 사이트 > Forms에서 양식이 인식되고 접수가 활성화되었는지 확인하세요. Forms가 비활성화되거나 플랜 제한이면 전송할 수 없습니다.

업로드: ZIP을 풀어 GitHub 저장소 루트와 netlify/functions 폴더에 기존 파일을 덮어씁니다. Commit 후 Netlify Deploys에서 Published 확인. 브라우저 강력 새로고침.

테스트: https://mynews365.netlify.app/.netlify/functions/topic-news?q=%EB%8B%A4%EC%98%A8%EC%88%B2 에서 JSON items가 나오는지 확인합니다. /forms.html이 열리는지 확인하고 Netlify Forms에 mynews365-feedback이 나타나는지 확인합니다. 댓글은 Supabase 설정 후 테스트합니다.
