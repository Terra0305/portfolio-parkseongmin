# 박성민 포트폴리오 디자인 아이디어

## 배경
- 백엔드 개발자 박성민의 포트폴리오
- PDF 원본: 베이지/크림 톤, 미니멀, 코너 브라켓 장식 요소
- 참고 사이트(soyoung-lee.com): 싱글 페이지 스크롤, 그라디언트 배경, 스크롤 애니메이션

---

<response>
<probability>0.08</probability>
<idea>

**Design Movement**: Japanese Minimalism meets Swiss Typography (和洋折衷 / Wabi-Sabi Precision)

**Core Principles**:
1. 여백이 콘텐츠다 — 빈 공간을 의도적으로 활용하여 각 요소에 숨을 부여
2. 타이포그래피 계층 — 굵기와 크기의 극적인 대비로 정보 위계 형성
3. 수평선과 수직선 — PDF의 코너 브라켓 모티프를 웹에서 선(line) 요소로 재해석
4. 절제된 움직임 — 과하지 않은 스크롤 트리거 애니메이션

**Color Philosophy**:
- 배경: #F7F5F0 (따뜻한 크림 — PDF 원본 색상 유지)
- 텍스트: #1A1A1A (거의 검정 — 강한 대비)
- 포인트: #2D2D2D (짙은 차콜) + 얇은 선 #CCCCCC
- 강조: 단 하나의 컬러 포인트 — #3B5BDB (딥 인디고, 링크/호버에만)
- 의도: 코드를 다루는 사람의 정밀함과 신뢰감

**Layout Paradigm**:
- 비대칭 레이아웃 — 섹션마다 텍스트 블록이 좌우 교차
- 섹션 번호를 좌측 세로로 배치 (01, 02, 03...)
- 프로젝트 카드: 넓은 가로 배너 형태 (풀 와이드)
- 기술 스택: 태그 클라우드가 아닌 수평 스크롤 리스트

**Signature Elements**:
1. PDF의 코너 브라켓([]) 모티프를 섹션 제목 왼쪽에 세로선으로 재현
2. 섹션 전환 시 얇은 수평선(divider)이 왼쪽에서 오른쪽으로 그어지는 애니메이션
3. 프로젝트 카드 호버 시 배경이 #1A1A1A로 전환되며 텍스트가 크림색으로 반전

**Interaction Philosophy**:
- 스크롤 시 요소가 아래에서 위로 슬라이드인 (translateY + opacity)
- 네비게이션 링크 호버: 밑줄이 왼쪽에서 오른쪽으로 그어짐
- 프로젝트 카드: 호버 시 배경색 반전 (다크 모드 효과)

**Animation**:
- 페이지 로드: 헤더 텍스트가 위에서 아래로 페이드인 (0.8s ease-out)
- 섹션 진입: IntersectionObserver로 opacity 0→1, translateY 30px→0 (0.6s)
- 기술 태그: 순차적으로 나타남 (stagger 0.05s)
- 커서: 기본 커서 유지 (과한 커스텀 커서 없음)

**Typography System**:
- Display: "Bebas Neue" (영문 헤딩) + "Noto Sans KR" 900 (한글 헤딩)
- Body: "Noto Sans KR" 400 (본문)
- Mono: "JetBrains Mono" (코드, 날짜, 기술 태그)
- 헤딩 크기: 96px → 64px → 40px → 24px → 16px 계층

</idea>
</response>

<response>
<probability>0.07</probability>
<idea>

**Design Movement**: Editorial Dark Mode — 기술 잡지 레이아웃

**Core Principles**:
1. 다크 배경에 크림 텍스트 — 개발자 환경(IDE)의 미학
2. 타이포그래피가 곧 그래픽 — 거대한 텍스트 자체가 배경 요소
3. 컬러 포인트로 에너지 주입 — 단색 배경에 형광 그린 포인트
4. 카드 없는 레이아웃 — 경계선 없이 콘텐츠가 흐름

**Color Philosophy**:
- 배경: #0F0F0F (거의 검정)
- 텍스트: #F0EDE6 (따뜻한 오프화이트)
- 포인트: #A8FF3E (형광 라임 그린 — 터미널 커서 색상)
- 보조: #333333 (카드 배경)
- 의도: 개발자의 작업 환경을 연상시키는 에디토리얼 다크

**Layout Paradigm**:
- 풀스크린 섹션 (100vh per section)
- 배경에 거대한 회색 텍스트 (BACKEND, DEVELOPER 등) 워터마크
- 프로젝트: 수평 스크롤 슬라이더
- 기술 스택: 터미널 스타일 리스트

**Signature Elements**:
1. 터미널 커서 깜빡임 효과 (헤로 섹션 타이핑 애니메이션)
2. 배경 워터마크 텍스트 (섹션마다 다른 키워드)
3. 형광 그린 포인트 컬러 (링크, 강조, 호버)

**Interaction Philosophy**:
- 타이핑 효과 (Typewriter animation)
- 스크롤 시 배경 워터마크 패럴랙스
- 프로젝트 카드 호버: 형광 그린 테두리 등장

**Animation**:
- 헤로: 타이핑 애니메이션 (커서 깜빡임)
- 섹션: 슬라이드인 from bottom
- 배경 텍스트: 스크롤 패럴랙스 (느리게 이동)

**Typography System**:
- Display: "Space Grotesk" Bold
- Body: "Space Grotesk" Regular
- Mono: "Fira Code" (코드 요소)

</idea>
</response>

<response>
<probability>0.06</probability>
<idea>

**Design Movement**: Brutalist Editorial — 거칠지만 정교한 레이아웃

**Core Principles**:
1. 격자를 깨는 레이아웃 — 의도적인 비대칭과 오버랩
2. 텍스트 크기의 극적 대비 — 1px 텍스트와 200px 텍스트 공존
3. 테두리와 선의 적극적 활용 — 요소를 구분하는 굵은 선
4. 색상 최소화 — 흑백 + 단 하나의 포인트 컬러

**Color Philosophy**:
- 배경: #FFFFFF (순백)
- 텍스트: #000000 (순검정)
- 포인트: #FF3B00 (브루탈리스트 레드)
- 의도: 타협 없는 명확함

**Layout Paradigm**:
- 비대칭 그리드 (3:7 또는 2:8 분할)
- 섹션 제목이 페이지를 가로지르는 거대한 텍스트
- 프로젝트: 테이블 형태 (번호, 제목, 기간, 태그)

**Signature Elements**:
1. 굵은 검정 테두리 박스
2. 섹션 번호가 거대하게 배경에 표시
3. 호버 시 배경이 검정으로 채워지는 효과

**Interaction Philosophy**:
- 빠르고 즉각적인 반응
- 호버 시 색상 반전
- 스크롤 진행 표시바

**Animation**:
- 최소한의 애니메이션
- 호버: 즉각적인 색상 전환 (transition 없음)
- 스크롤: 요소 슬라이드인

**Typography System**:
- Display: "Barlow Condensed" ExtraBold
- Body: "Barlow" Regular
- Mono: "Courier New"

</idea>
</response>

---

## 선택된 디자인

**선택: Response 1 — Japanese Minimalism meets Swiss Typography**

PDF 원본의 베이지/크림 톤과 코너 브라켓 모티프를 웹에서 자연스럽게 계승하면서,
백엔드 개발자의 정밀함과 신뢰감을 표현하는 미니멀 스타일을 채택합니다.
