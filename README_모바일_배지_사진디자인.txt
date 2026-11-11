MY NEWS 365 — 프리미엄 사진 뉴스 디자인 + Netlify 모바일 배지 대응
================================================================

[변경 내용]
1. 사용자가 첨부한 프리미엄 디자인 시안의 사진 부분만 추출해 뉴스 카드용
   대표 이미지로 적용했습니다. 사진은 기사별 실제 보도 사진이 아니라
   분야별 대표 사진이며, 이를 홈페이지에도 명시했습니다.
2. 오늘의 주요 뉴스 TOP 5: PC에서는 큰 대표 사진 1건 + 작은 썸네일 4건,
   모바일에서는 큰 카드 + 터치에 편한 썸네일 뉴스 리스트.
3. 내 지역 최신 뉴스 6건: 첫 기사에 지역 대표 풍경 사진 추가.
4. 기존 시·군·구 선택, 개인 관심 뉴스 키워드, 키워드 새로고침, 언론사 검색,
   즐겨찾기, 새 로고·앱 아이콘, 라이트/다크 전환 그대로 유지.
5. 모바일 하단 4개 메뉴: Netlify 배지와 겹치지 않도록 위쪽 54px로 띄우고
   모든 아이콘·글자를 또렷하게 표시합니다. 여백과 안전 영역 추가.
6. 첫 방문 화면은 시안과 같은 네이비/민트 다크 테마.
   이미 라이트 모드를 선택한 사용자의 저장 설정은 유지합니다.
7. 댓글·관리자 로그인·개선의견 접수 기능은 다시 추가하지 않았습니다.

[매우 중요: Powered by Netlify 뱃지 설정]
Netlify가 방문자 페이지의 우하단에 삽입하는 Powered by Netlify 배지는
프로젝트의 HTML/CSS로 제거할 수 없는 별도 프레임입니다.
Netlify 대시보드 > 프로젝트 > Project configuration > General
> Powered by Netlify badge > Off > Save
로 끄는 것이 가장 확실합니다. 이 설정은 재배포 없이 적용됩니다.
참고: https://docs.netlify.com/manage/projects/powered-by-netlify-badge/

[홈페이지 설치]
A. 이 ZIP 압축을 풉니다. ZIP 파일 자체를 GitHub에 올리지 마세요.
B. GitHub https://github.com/landdesigner/mynews365 에서
   Add file > Upload files, 압축 해제한 전체 파일과 폴더 경로를 유지해 업로드합니다.
   특히 assets/editorial 폴더, photo-edition.css, news-widgets.js,
   index.html, netlify/functions/headlines.js, sw.js 를 빠뜨리지 마세요.
C. Commit changes 눌러 main 브랜치에 저장합니다.
D. Netlify 배포 상태 Published 확인 후 브라우저를 새로고침합니다.
E. 아이폰/갤럭시 홈화면 앱에서 예전 모습이 보이면 앱을 닫고 다시 열거나
   Safari/Chrome 일반 브라우저에서 먼저 확인하세요.

[참고 및 제한]
- 기사 제목과 링크는 기존 Google 뉴스 RSS에서 계속 가져옵니다.
- Google 뉴스 RSS는 이미지 정보를 항상 제공하지 않습니다.
  그 경우 테마/지역별 대표 사진을 보여주며, 실제 기사 사진으로 꾸미지 않습니다.
- Netlify Functions는 온라인 배포 후 구동됩니다. 단순 HTML 파일 미리보기나
  ZIP 내 파일 열기에서는 실시간 뉴스가 로드되지 않을 수 있습니다.
- 구미시, 경상북도 등 선택 지역과 나만의 관심 키워드는 기존 localStorage 사용.
- 실제 운영 사이트 배포 작업은 GitHub에 업로드해주셔야 완료됩니다.
