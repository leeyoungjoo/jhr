# 배포 정보
- 사이트: https://jeju-hre-exhibition.vercel.app (Vercel 프로젝트 jhr)
- Supabase 프로젝트: jhr-facility-guide (서울, ref pewippwnvduaseyckfkv)
- 관리자 계정: 아이디 ksgi (내부 이메일 ksgi@example.com) — 비밀번호 변경은 Supabase Authentication > Users
- 보기 전용 계정: 아이디 ksgi-staff (내부 이메일 ksgi-staff@example.com) — 진행상황 공유 보기만 가능, 수정·글쓰기 불가

## 파일 구성
- index.html — 사이트 전체(메인페이지 · 전시회 안내 · 시설안내 · 진행상황 공유), 주소 뒤 #/about, #/facility, #/news 로 이동
- css/site.css — 사이트 디자인, css/facility.css — 시설안내 도면·상세 레이어
- js/facility.js — 층별 도면 데이터와 그리기, js/app.js — 메뉴 이동 · 관리자 로그인 · 진행상황 게시판
- assets/ — 메인 사진(번호판 흐림 처리), 현수막 사진, 후원기관 로고
- Supabase 테이블: rooms(시설 정보 수정분), posts(진행상황 소식), 저장소 room-photos(사진)

## 로컬에서 확인하기
1. 저장소 받기: `git clone https://github.com/leeyoungjoo/jhr` (이미 받았으면 `git pull`)
2. `index.html`을 브라우저로 열기 (더블클릭). 로컬에서도 실제 Supabase 데이터가 보이고 로그인·수정이 됩니다.
   - 파일로 열 때 문제가 있으면 폴더에서 `npx serve` 또는 `python -m http.server 8000` 실행 후 http://localhost:8000 접속

## 배포하기 (직접)
- 방법 A: 폴더에서 `npx vercel --prod` → 처음 한 번 로그인, 기존 프로젝트 `jhr`에 연결(Link)
- 방법 B: Vercel 대시보드 > Settings > Git 에서 이 저장소를 연결하면, 이후 `git push` 할 때마다 자동 배포
- 빌드 설정은 없음(정적 파일 그대로 배포). 폴더 전체를 그대로 올리면 됩니다.
