MY NEWS 365 — 새 로고 적용 프리미엄 홈페이지
==========================================

이번 파일은 기존 MY_NEWS_365_PREMIUM_APP_2026 최신 버전에서
로고/홈화면 아이콘만 새 디자인으로 교체한 배포용 완성본입니다.

[변경 내용]
- 첫 화면 왼쪽 상단에 새 MY NEWS 365 전체 로고 적용 (brand-logo.svg)
- 선명한 벡터 로고: 휴대폰과 PC에서 확대해도 문자와 심볼이 깨지지 않음
- 기존 서체 표현을 유지하면서 로고 심볼의 N·민트 포인트를 정리
- iPhone/Android 홈화면 아이콘과 파비콘을 동일한 새 로고 심볼로 교체
- 서비스 워커 캐시 이름 갱신: 기존 설치 앱에서도 새 파일 갱신하도록 유도
- TOP5·지역 선택·관심 키워드·언론사 바로가기·다크모드와 모바일 하단 메뉴 유지
- 운영자 로그인·댓글 관리·개선 의견 접수 기능은 추가하지 않음

[GitHub -> Netlify 배포]
1. ZIP을 압축 해제합니다.
2. https://github.com/landdesigner/mynews365 로 이동합니다.
3. Add file > Upload files 선택.
4. 압축 푼 파일 및 netlify/functions 폴더를 원래 구조대로 업로드.
5. Commit changes 선택.
6. Netlify Deploys에서 Published 확인, 웹사이트 새로고침.

* ZIP 자체를 GitHub에 업로드하면 사이트가 업데이트되지 않습니다.
* 배포 후 이전 아이콘이 보이면 브라우저/홈화면 앱의 캐시가 갱신될 때까지
  기존 아이콘이 잠시 남을 수 있습니다. 새로고침이나 홈화면 재설치로 확인하세요.
* Netlify 자동 배포는 GitHub 연결이 활성화된 경우에 작동합니다.
* 기사 표시는 기존 Netlify Functions 설정 및 외부 뉴스 RSS 상태에 따라 달라집니다.

[로고 파일]
brand-logo.svg = 상단 전체 로고 / brand-logo-1200.png = 고해상도 PNG
brand-icon.svg = N 심볼 / icon-192.png icon-512.png = 앱용 아이콘
apple-touch-icon.png = 아이폰 홈화면 아이콘
