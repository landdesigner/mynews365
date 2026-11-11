MY NEWS 365 커뮤니티 버전

1. GitHub landdesigner/mynews365 저장소에 압축 해제한 파일을 같은 폴더 구조로 업로드합니다.
2. netlify/functions/comments.js, topic-news.js, headlines.js, package.json, netlify.toml이 포함되어야 합니다.
3. Netlify 자동 빌드 후 /.netlify/functions/comments 와 /.netlify/functions/topic-news?q=구미 를 테스트합니다.
4. 공개 댓글은 Netlify Blobs에 저장되며 즉시 공개됩니다. 별도의 승인/삭제/스팸 방지 관리 기능은 아직 없습니다. 공개 운영 시 악성 댓글 관리 기능을 추가하는 것이 좋습니다.
5. 관심 키워드는 브라우저 localStorage에 저장되어 기기 간 자동 동기화되지 않습니다.
6. Netlify 환경/요금제와 Blobs 기능 사용 가능 여부에 따라 서버 함수 설정이 필요할 수 있습니다.
