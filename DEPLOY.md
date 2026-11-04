# 배포 정보
- 사이트: https://jhr-zeta.vercel.app (Vercel 프로젝트 jhr)
- Supabase 프로젝트: jhr-facility-guide (서울, ref pewippwnvduaseyckfkv)
- 편집 계정: 아이디 ksgi (내부 이메일 ksgi@example.com) — 비밀번호는 Supabase Authentication > Users 에서 변경

## 로컬에서 확인하기
1. 저장소 받기: `git clone https://github.com/leeyoungjoo/jhr` (이미 받았으면 `git pull`)
2. `index.html`을 브라우저로 열기 (더블클릭). 로컬에서도 실제 Supabase 데이터가 보이고 로그인·수정이 됩니다.
   - 파일로 열 때 문제가 있으면 폴더에서 `npx serve` 또는 `python -m http.server 8000` 실행 후 http://localhost:8000 접속

## 배포하기 (직접)
- 방법 A: 폴더에서 `npx vercel --prod` → 처음 한 번 로그인, 기존 프로젝트 `jhr`에 연결(Link)
- 방법 B: Vercel 대시보드 > Settings > Git 에서 이 저장소를 연결하면, 이후 `git push` 할 때마다 자동 배포
- 빌드 설정은 없음(정적 파일 그대로 배포). index.html, config.js, vercel.json 이 루트에 있으면 됩니다.
