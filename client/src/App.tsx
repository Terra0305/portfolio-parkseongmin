/*
 * Design: Japanese Minimalism meets Swiss Typography
 * Cream (#F7F5F0) base, Dark (#1A1A1A) text, Indigo (#3B5BDB) accent
 * Sections: Hero → About → Skills → Projects → Awards → Contact
 */

import { useEffect, useState, type ReactNode } from "react";
import "./index.css";

// ─── Image Assets (self-hosted in client/public/images) ──────────────────────
const IMAGES = {
  profile: "/images/profile.png",
  proj1_combined: "/images/proj1-codeforces.jpg",
  proj2_screenshot: "/images/proj2-visualizer.png",
  proj3_photo: "/images/proj3-sonedduck.jpg",
  proj4_doc: "/images/proj4-gist-mit.png",
  award1: "/images/award-icpc.png",
  award2: "/images/award-ideathon.png",
  award3: "/images/award-honam.png",
};

// ─── Data ─────────────────────────────────────────────────────────────────────

type Metric = { label: string; before: string; after: string; note?: string };

type Figure = {
  src: string;
  alt: string;
  caption?: string;
  /** px 상한. 지정하면 원본 비율 그대로 이 폭까지만 늘어남 */
  maxWidth?: number;
};

type Troubleshooting = {
  title: string;
  images?: Figure[];
  rows?: { tag: string; text: string; sub?: string }[];
  metrics?: Metric[];
  steps?: string[];
  footnote?: string;
};

type Project = {
  id: string;
  tab: string;
  title: string;
  period: string;
  periodNote?: string;
  role: string;
  purpose: string[];
  roles: string[];
  results: string[];
  tags: string[];
  flows?: { label: string; steps: string[] }[];
  structureImages?: Figure[];
  resultImages?: Figure[];
  owned?: string[];
  troubleshooting?: Troubleshooting[];
  outcomeNote?: string;
  github: string;
  demo?: string;
  notion?: string;
  press?: string;
  images?: string[];
  imageCaption?: string;
  note?: string;
};

const PROJECTS: Project[] = [
  {
    id: "01",
    tab: "CSforces",
    title: "교내 알고리즘 대회 플랫폼 CSforces",
    period: "2025.12 ~ 2026.08",
    periodNote: "2026.08 후속 운영진 선발 및 운영 이관 완료",
    role: "Infra & Deployment",
    purpose: [
      "조선대학교 교내 알고리즘 경시대회의 문제 풀이·제출·채점 및 대회 운영을 지원하는 웹 플랫폼",
      "개발 완료 후 SW중심대학사업 주관 교내 알고리즘 대회의 공식 운영 플랫폼으로 채택되어 실제 대회에 활용",
    ],
    roles: [
      "Docker 기반 프론트엔드·백엔드 배포 환경 구성",
      "Nginx Reverse Proxy 및 단일 진입점 구축",
      "Azure VM 운영환경 및 CI/CD 자동배포 구성",
      "헬스체크·트래픽 로그 기반 운영 환경 구축",
    ],
    results: [
      "2026년 4월 실제 교내 알고리즘 대회 운영",
      "참가자 대상 만족도 조사 평균 95.3% 기록",
    ],
    tags: ["Django", "React", "Docker", "Nginx", "Azure VM", "GitHub Actions"],
    flows: [
      {
        label: "배포 흐름",
        steps: [
          "GitHub Repo (dev)",
          "push",
          "GitHub Actions",
          "SSH Deploy",
          "Docker Compose (Azure VM)",
        ],
      },
      {
        label: "요청 흐름",
        steps: [
          "사용자",
          "HTTPS",
          "Nginx",
          "/ → React 정적 파일 · /api → Django + DRF (SQLite)",
        ],
      },
      {
        label: "채점 흐름",
        steps: [
          "Celery Beat",
          "Redis (Broker)",
          "Celery Worker (채점 결과 갱신)",
          "Codeforces API",
        ],
      },
    ],
    structureImages: [
      {
        src: "/images/csforces-architecture.webp",
        alt: "CSforces 프로젝트 구조: GitHub Actions가 SSH로 Azure VM에 배포하고, Nginx가 React 정적 파일과 Django API로 분기하며, Celery Beat·Redis·Celery Worker가 Codeforces API로 채점 결과를 갱신하는 구성도",
        caption:
          "Azure VM 위의 Docker Compose 구성 (주황 테두리: 직접 담당한 인프라·배포 영역)",
        maxWidth: 420,
      },
    ],
    owned: [
      "Docker Compose 기반 컨테이너 구성",
      "Nginx Reverse Proxy / HTTPS",
      "Certbot 인증서 관리",
      "Redis 기반 Celery Broker",
      "GitHub Actions CI/CD",
      "Azure VM 배포 및 운영",
    ],
    troubleshooting: [
      {
        title:
          "Azure VM 운영 경험이 없는 상태에서 배포·운영 인프라를 직접 구성",
        steps: [
          "Nginx 단일 진입점 구성: /는 React 정적 파일, /api/는 Django로 분기",
          "dev 브랜치 push 시 배포 파이프라인 자동 실행",
          "SSH 접속 후 최신 코드 반영, Docker Compose로 컨테이너 재빌드·재기동",
        ],
        images: [
          {
            src: "/images/csforces-nginx.webp",
            alt: "Nginx 설정: location /는 React 정적 파일, location /api/는 backend:8000으로 proxy_pass",
            maxWidth: 486,
          },
          {
            src: "/images/csforces-deploy-trigger.webp",
            alt: "GitHub Actions 설정: on push branches dev",
            maxWidth: 197,
          },
          {
            src: "/images/csforces-deploy-script.webp",
            alt: "배포 스크립트: git fetch --all, git reset --hard origin/dev, docker compose down, docker compose up -d --build",
            maxWidth: 323,
          },
        ],
        footnote: "학습 → 직접 구성 → 실제 교내 대회 운영 → 후속 운영진 이관",
      },
      {
        title: "제한된 예산에서 실제 서비스 운영",
        images: [
          {
            src: "/images/csforces-azure-cost.webp",
            alt: "Azure Cost Management 누적 비용 그래프 (2025년 10월~2026년 9월, 약 11만 원대)",
            caption: "Azure Cost Management 기준",
          },
        ],
        metrics: [
          {
            label: "누적 인프라 사용 비용 (Azure 학생 크레딧)",
            before: "",
            after: "₩118.8K",
            note: "Azure Cost Management 기준",
          },
        ],
        footnote:
          "학생 크레딧 → 경량 VM → Docker Compose → 실제 대회 운영. 단일 VM에 전 서비스를 컨테이너로 통합해 비용 최소화",
      },
    ],
    github: "https://github.com/Terra0305/Korean-codeforces.git",
    notion:
      "https://hallowed-second-cae.notion.site/CSforces-33cca50bf30d80f78ee4cdb9070df8a6?source=copy_link",
    press:
      "https://sw.chosun.ac.kr/main/menu?gc=934NPWN&do=view&bwrite_id=VMb3JyheK4Xq",
    images: [IMAGES.proj1_combined],
    imageCaption: "실제 교내 알고리즘 대회 운영 모습",
  },
  {
    id: "02",
    tab: "시각화 플랫폼",
    title: "어린이 코딩 교육을 위한 알고리즘 시각화 플랫폼",
    period: "2025.06 ~ 2026.01",
    role: "Backend",
    purpose: [
      "초급자가 코드 실행 과정과 변수 변화를 단계별로 확인하며 학습하는 교육용 웹 서비스",
      "코드 저장·불러오기로 학생별 학습 코드를 계정에 보관, 실제 코딩 학원 수업에 적용",
    ],
    roles: [
      "회원가입 API: 아이디·이메일 중복 검증 + BCrypt 해시 저장",
      "로그인 API: 인증 후 JWT 발급",
      "JWT 필터 기반 Stateless 인증·인가 (경로별 접근 제어)",
      "Vercel 배포",
    ],
    results: ["교내 지원금 200만 원 유치", "코딩 학원 수업 적용"],
    tags: [
      "Java",
      "Spring Boot",
      "Spring Security",
      "JWT",
      "Spring Data JPA",
      "PostgreSQL",
      "Swagger",
      "Vercel",
    ],
    flows: [
      {
        label: "Frontend (Vue 3, 브라우저 내 처리)",
        steps: [
          "CodeMirror 에디터",
          "Pyodide (WASM) 줄 단위 추적",
          "단계별 스냅샷",
          "변수 시각화 화면",
        ],
      },
      {
        label: "Backend (Spring Boot, 직접 구현)",
        steps: [
          "HTTPS 요청 (Bearer JWT)",
          "Spring Security + JWT 인증 필터",
          "Auth API · Code API",
          "Spring Data JPA",
          "PostgreSQL (Neon)",
        ],
      },
    ],
    structureImages: [
      {
        src: "/images/visualizer-architecture.webp",
        alt: "시각화 웹 프로젝트 구조: Vue 3 프론트엔드(CodeMirror, Pyodide, 단계별 스냅샷, 변수 시각화)와 Spring Boot 백엔드(Spring Security + JWT 필터, Auth API, Code API, Spring Data JPA), PostgreSQL(Neon), cron-job.org 구성도",
        caption:
          "Vercel 배포 · 직접 구현한 Backend(Spring Boot) 영역 중심의 구조",
      },
    ],
    owned: [
      "인증 필터 공개 경로: /api/auth/** · /api/ping · /api/health · Swagger, 그 외 모든 API는 인증 필수",
      "Auth API: signup(중복 검증·BCrypt 저장) · login(JWT 발급)",
      "Code API: 코드 저장, 토큰의 사용자 기준 조회(내 코드·최신순)",
      "스키마 설계: users, code_snippet (User 1 : N CodeSnippet)",
      "cron-job.org가 1분마다 /api/ping 호출해 서버가 잠들지 않게 유지",
    ],
    troubleshooting: [
      {
        title: "서버와 DB가 서로 다른 대륙에 있었다",
        rows: [
          { tag: "문제", text: "DB를 쓰는 API(로그인 등)가 약 1.2초 걸림" },
          {
            tag: "원인",
            text: "서버는 미국(iad1), DB는 싱가포르 → 쿼리마다 대륙을 왕복",
            sub: "응답 헤더(x-vercel-id)로 실행 위치 확인",
          },
          {
            tag: "해결",
            text: "서버 실행 지역을 DB와 같은 싱가포르(sin1)로 고정",
            sub: "vercel.json 설정 한 줄 · 추가 비용 없음",
          },
        ],
        metrics: [
          {
            label: "로그인 (DB 조회 + BCrypt)",
            before: "1.2초",
            after: "0.33초",
            note: "약 3.6배 빠름",
          },
          {
            label: "DB 조회 API (health)",
            before: "0.8초",
            after: "0.24초",
            note: "약 3.4배 빠름",
          },
        ],
        footnote:
          "측정: 운영 사이트, 서버가 깨어 있을 때 5회 중앙값 · 같은 배포에 DB 연결 풀 설정도 포함",
      },
    ],
    resultImages: [
      {
        src: "/images/visualizer-class.webp",
        alt: "코딩 학원 수업에서 알고리즘 시각화 웹으로 학생들에게 설명하는 모습",
        caption: "코딩 학원 수업 시연",
        maxWidth: 520,
      },
      {
        src: "/images/visualizer-survey.webp",
        alt: "설문 결과: 시각화 웹을 같이 보는 것이 더 이해하기 쉬웠는가 — 매우 그렇다 75%, 그렇다 25% (응답 8개)",
        caption: "수업 후 설문 결과 (응답 8개)",
        maxWidth: 420,
      },
    ],
    outcomeNote:
      "학원 수업에서 시연 후 설문 결과, 응답자 100%가 기존 코드 설명보다 시각화 웹을 활용한 설명이 이해하기 쉽다고 평가했습니다. (매우 그렇다 75%, 그렇다 25%)",
    github: "https://github.com/Terra0305/Capstone",
    demo: "https://selfmade-orange.vercel.app/",
    images: [IMAGES.proj2_screenshot],
    imageCaption: "알고리즘 흐름을 단계별로 확인하는 코딩 시각화 화면",
  },
  {
    id: "03",
    tab: "손에딱",
    title: '생성형 AI 기반 노인 맞춤형 기차 예매 서비스 "손에딱"',
    period: "2025.06 ~ 2025.11",
    role: "Team Leader & Backend",
    purpose: [
      "디지털 소외 계층(고령층)을 위한 음성 예매",
      "Google STT + Gemini LLM 기반 서비스",
    ],
    roles: [
      "팀장으로서 기획 · 정부 과제 수행 총괄 · 발표",
      "Gemini API 연동, 발화 → 예매 정보 JSON 추출",
      "DataInitializer로 테스트 데이터 자동 생성",
    ],
    results: [
      "정부 지원 과제(300만 원 규모) 수행",
      "중간 · 최종 평가 통과",
      "GICON 프로젝트 전시",
    ],
    tags: ["Java", "Spring Boot", "Google STT", "Gemini API", "PostgreSQL"],
    flows: [
      {
        label: "AI 응답 처리 파이프라인",
        steps: [
          "사용자 (React 음성 UI)",
          "Google STT (음성 → 텍스트)",
          "Gemini (API 호출 · 도구 호출 반복)",
          "JSON 정규화 (출발·도착·날짜, YYYY-MM-DD)",
          "예매 로직 (Spring Boot: 검색·예매·취소)",
          "PostgreSQL (기차·예매·사용자)",
        ],
      },
    ],
    structureImages: [
      {
        src: "/images/sonedduck-architecture.webp",
        alt: "손에딱 음성 예매 구조도: 사용자(React 음성 UI) → Google STT → Gemini → JSON 정규화(YYYY-MM-DD) → 예매 로직(Spring Boot) → PostgreSQL, DataInitializer가 더미 기차표 자동 생성",
        caption: "주황: 직접 구현한 부분 · 회색: 팀 구현",
      },
    ],
    owned: [
      "Gemini API 호출과 도구 호출 반복",
      "JSON 정규화: 함수 호출 스키마 + 프롬프트 날짜 규칙",
      "DataInitializer: 더미 기차표 자동 생성",
    ],
    troubleshooting: [
      {
        title: "서버를 껐다 켜면 예매가 사라지던 문제 수정",
        images: [
          {
            src: "/images/sonedduck-fix.webp",
            alt: "수정 후 코드(DummyDataInitializer.java): 이미 있는 마지막 날짜 다음 날부터만 추가로 생성하도록 변경",
            caption: "수정 후 코드 (DummyDataInitializer.java)",
          },
        ],
        rows: [
          {
            tag: "문제",
            text: "서버를 껐다 켜면 기차표와 예매 내역이 전부 삭제됨",
            sub: "코드 리뷰로 발견한 잠재 결함",
          },
          {
            tag: "원인",
            text: "서버가 켜질 때마다 기차표를 지우고 새로 만드는 코드",
          },
          {
            tag: "해결",
            text: "지우지 않고, 빠진 날짜의 기차표만 추가",
            sub: "기존 기차표와 예매 내역은 그대로 유지",
          },
          {
            tag: "결과",
            text: "껐다 켜도 예매 내역이 유지됨",
            sub: "기차표 7,350건도 그대로 유지",
          },
        ],
        metrics: [
          {
            label: "서버를 껐다 켠 뒤 예매 내역 (전 → 후)",
            before: "1 → 0",
            after: "1 → 1",
            note: "수정 전 → 수정 후",
          },
        ],
        footnote:
          "측정: 테스트용 DB에 예매를 직접 넣고, 서버를 껐다 켠 뒤 남은 예매 수를 셈 (각 1회). 프로젝트가 끝난 뒤(2026년)에 발견하고 고친 문제 (DummyDataInitializer.java)",
      },
    ],
    github: "https://github.com/Terra0305/Teambuilding",
    notion:
      "https://www.notion.so/6-268ca50bf30d8046a487e201dc991d6b?source=copy_link",
    images: [IMAGES.proj3_photo],
    imageCaption: "개발자 소그룹 팀빌딩 6기 프로젝트 발표 및 검증 자료",
  },
  {
    id: "04",
    tab: "GIST-MIT",
    title: "GIST-MIT 공동연구 데이터 전처리 지원",
    period: "2025.09 ~ 2025.10",
    role: "Research Assistant",
    purpose: [
      "연구에 사용할 VTT 자막 데이터의 타임스탬프, 특수문자, 불필요한 문구 등을 정리하고 반복적으로 발생하는 오타를 교정",
    ],
    roles: [
      "데이터 전처리 지원: VTT 자막 데이터 정리 및 오타 교정",
      "반복 작업 자동화: 파일별로 반복되던 정제 작업 중 규칙화 가능한 부분을 Python과 정규표현식으로 자동화",
      "여러 파일을 한 번에 처리할 수 있도록 예외 처리와 로그 기능을 추가",
    ],
    results: [],
    tags: ["Python", "Regex", "Data Processing"],
    github: "https://github.com/Terra0305/vtt-data-preprocessor",
    notion:
      "https://hallowed-second-cae.notion.site/GIST-MIT-273ca50bf30d8046b01ef222d90e9152",
    images: [IMAGES.proj4_doc],
    imageCaption: "GIST-MIT 공동연구 외부 참여 연구원 확인 자료",
    note: "본 프로젝트의 세부 방법론 및 연구 성과는 보안서약(NDA) 체결로 인해 상세 기술이 제한됩니다.",
  },
];

const COMPETENCIES = [
  {
    num: "1",
    title: "서비스 개발 및 운영",
    items: [
      "웹 서비스의 백엔드 설계·개발부터 배포·운영까지 경험",
      "실제 사용자 대상 서비스 및 대회 플랫폼 운영 경험",
    ],
    keywords: "Spring Boot / Django / Azure / PostgreSQL",
  },
  {
    num: "2",
    title: "문제 해결 및 자동화",
    items: [
      "반복 업무와 개발 과정의 문제 분석 후 구조적으로 개선",
      "Python 기반 데이터 전처리 및 반복 작업 자동화",
      "테스트·배포·데이터 처리 과정의 효율성과 안정성 개선",
    ],
    keywords: "Python / Data Processing / Testing",
  },
  {
    num: "3",
    title: "리더십 및 협업",
    items: [
      "팀장으로서 프로젝트 기획·역할 분배·일정 관리 및 결과물 조율",
      "정부지원 프로젝트 및 팀 프로젝트의 중간·최종 평가 대응 경험",
    ],
    keywords: "Team Leadership / Project Management",
  },
  {
    num: "4",
    title: "교육 및 커뮤니케이션",
    items: [
      "Python·Arduino 강사 근무중",
      "직접 교육자료·예제 제작 및 피드백 기반 수업 개선",
      "기술 내용을 비개발자도 이해할 수 있게 내용 전달",
    ],
    keywords: "Teaching / Communication",
  },
];

const AWARDS = [
  {
    title: "2026 AI창업 부트캠프",
    result: "1위 (대상)",
    date: "2026.06.23",
    org: "조선대학교 SW중심대학사업단",
    link: "https://www.canva.com/design/DAHNQ6zTlEk/c4ndsNDftl_H7CTK8wJUSA/edit",
    image: "/images/aquaguard-grand-prize.jpeg",
  },
  {
    title: "2025 프로그래밍 경시대회 ICPC",
    result: "교내 1위 (대상)",
    date: "2025.10.11",
    org: "조선대학교 SW중심대학사업단",
    image: IMAGES.award1,
  },
  {
    title: "2025 조선대학교 SW아이디어톤 경진대회",
    result: "3위 (우수상)",
    date: "2025.11.22",
    org: "조선대학교 SW중심대학사업단",
    image: IMAGES.award2,
  },
  {
    title: "2025 호남권 SW창업 아이디어 경진대회",
    result: "6위 (장려상)",
    date: "2025.09.30",
    org: "호남권 소프트웨어중심대학협의회",
    image: IMAGES.award3,
  },
];

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    document
      .querySelectorAll(".reveal, .divider-line")
      .forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const nav = [
    ["about", "About"],
    ["skills", "Skills"],
    ["projects", "Projects"],
    ["awards", "Awards"],
    ["links", "Links"],
    ["contact", "Contact"],
  ];
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: "rgba(247,245,240,0.94)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(204,204,204,0.4)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.25rem clamp(1.5rem,5vw,4rem)",
        }}
      >
        <a
          href="#hero"
          style={{
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: "0.85rem",
            fontWeight: 500,
            color: "var(--charcoal)",
            textDecoration: "none",
            letterSpacing: "0.05em",
          }}
        >
          PSM.dev
        </a>
        <div
          className="desktop-only"
          style={{ display: "flex", gap: "2.5rem" }}
        >
          {nav.map(([s, l]) => (
            <a key={s} href={`#${s}`} className="nav-link">
              {l}
            </a>
          ))}
        </div>
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "none",
            flexDirection: "column",
            gap: "5px",
            padding: "4px",
          }}
          aria-label="메뉴"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {[0, 1, 2].map(i => (
            <span
              key={i}
              style={{
                display: "block",
                width: "22px",
                height: "1.5px",
                background: "var(--charcoal)",
              }}
            />
          ))}
        </button>
      </div>
      {menuOpen && (
        <div
          id="mobile-menu"
          className="mobile-menu"
          style={{
            padding: "1rem clamp(1.5rem,5vw,4rem) 1.5rem",
            borderTop: "1px solid rgba(204,204,204,0.4)",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {nav.map(([s, l]) => (
            <a
              key={s}
              href={`#${s}`}
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              {l}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section
      id="hero"
      data-chapter
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "clamp(6rem,12vh,10rem) clamp(1.5rem,5vw,4rem) 4rem",
        backgroundImage: `url(/images/hero-bg.webp)`,
        backgroundSize: "cover",
        backgroundPosition: "center right",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <span
        style={{
          position: "absolute",
          top: "5rem",
          left: "1.5rem",
          width: "1.75rem",
          height: "1.75rem",
          borderTop: "2px solid var(--charcoal)",
          borderLeft: "2px solid var(--charcoal)",
        }}
      />
      <span
        style={{
          position: "absolute",
          bottom: "1.5rem",
          right: "1.5rem",
          width: "1.75rem",
          height: "1.75rem",
          borderBottom: "2px solid var(--charcoal)",
          borderRight: "2px solid var(--charcoal)",
        }}
      />
      <div style={{ maxWidth: "900px" }}>
        <p
          className="hero-animate hero-animate-1 font-mono"
          style={{
            fontSize: "0.8rem",
            color: "var(--gray-text)",
            marginBottom: "1.25rem",
            letterSpacing: "0.15em",
          }}
        >
          Backend Developer
        </p>
        <h1
          className="hero-animate hero-animate-2"
          style={{
            fontFamily: "'Noto Sans KR',sans-serif",
            fontWeight: 900,
            fontSize: "clamp(2.8rem,7vw,6rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            marginBottom: "0.15rem",
          }}
        >
          개발자 박성민
        </h1>
        <p
          className="font-display hero-animate hero-animate-3"
          aria-hidden="true"
          style={{
            fontSize: "clamp(3.2rem,9vw,8.5rem)",
            lineHeight: 1,
            letterSpacing: "0.02em",
            marginBottom: "2.5rem",
            color: "var(--charcoal)",
          }}
        >
          PORTFOLIO
        </p>
        <div className="hero-divider" />
        <p
          className="hero-animate hero-animate-4"
          style={{
            fontSize: "clamp(0.9rem,1.5vw,1.05rem)",
            color: "var(--charcoal-mid)",
            lineHeight: 1.9,
            maxWidth: "460px",
          }}
        >
          문제를 해결하고, 배운 것을 나누는 개발자입니다.
          <br />
          꾸준한 알고리즘 학습과 서비스 개발로 두 차례 대상을 수상했으며,
          <br />
          현재 파이썬·아두이노 강사로 근무하고 있습니다.
        </p>
        <div
          className="hero-animate hero-animate-5"
          style={{
            display: "flex",
            gap: "1rem",
            marginTop: "2.5rem",
            flexWrap: "wrap",
          }}
        >
          <a
            href="#projects"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.7rem 1.6rem",
              background: "var(--charcoal)",
              color: "var(--cream)",
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: "0.8rem",
              letterSpacing: "0.08em",
              textDecoration: "none",
            }}
          >
            View Projects →
          </a>
          <a
            href="mailto:jpsm0305@naver.com"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.7rem 1.6rem",
              border: "1px solid var(--charcoal)",
              color: "var(--charcoal)",
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: "0.8rem",
              letterSpacing: "0.08em",
              textDecoration: "none",
              background: "transparent",
            }}
          >
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────

function AboutSection() {
  return (
    <section
      id="about"
      data-chapter
      style={{ padding: "clamp(5rem,10vh,8rem) clamp(1.5rem,5vw,4rem)" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <SectionHeader num="01" label="ABOUT ME" />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
            gap: "clamp(2rem,5vw,6rem)",
            alignItems: "start",
          }}
        >
          {/* Left: 프로필 사진 + 연락처 */}
          <div>
            {/* 프로필 사진 */}
            <div
              className="reveal"
              style={{
                width: "200px",
                overflow: "hidden",
                border: "1px solid var(--gray-line)",
                marginBottom: "2rem",
              }}
            >
              <img
                src={IMAGES.profile}
                alt="박성민 프로필"
                loading="lazy"
                decoding="async"
                style={{
                  width: "100%",
                  display: "block",
                  objectFit: "cover",
                  objectPosition: "center top",
                }}
              />
            </div>
            <h2
              className="reveal reveal-delay-1"
              style={{
                fontFamily: "'Noto Sans KR',sans-serif",
                fontWeight: 900,
                fontSize: "clamp(1.8rem,3.5vw,3rem)",
                lineHeight: 1.25,
                marginBottom: "1.5rem",
              }}
            >
              기본기가 튼튼한
              <br />
              <span style={{ fontWeight: 300 }}>개발자를 지향하는</span>
              <br />
              지원자 박성민입니다.
            </h2>
            <div
              className="reveal reveal-delay-2"
              style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: "0.8rem",
                color: "var(--gray-text)",
                lineHeight: 2.2,
                borderLeft: "2px solid var(--gray-line)",
                paddingLeft: "1.25rem",
              }}
            >
              <p>Mobile: 010-9397-3908</p>
              <p>E-mail: jpsm0305@naver.com</p>
            </div>
          </div>
          {/* Right: 학력 + 활동 */}
          <div>
            <InfoList
              title="Education & Military"
              items={[
                {
                  period: "2021.03 ~",
                  desc: "조선대학교 컴퓨터 공학과 재학 중",
                },
                {
                  period: "2022.04.04 ~ 2023.10.03",
                  desc: "대한민국 육군 병장 만기 전역",
                },
              ]}
            />
            <div style={{ marginTop: "2.5rem" }}>
              <InfoList
                title="Activities"
                items={[
                  {
                    period: "2026.07 ~ 진행중",
                    desc: "파이썬·아두이노 강사",
                  },
                  {
                    period: "2026.07 ~ 진행중",
                    desc: "호남 ICT 이노베이션 ICT 빌드업 캠프 팀장",
                  },
                  {
                    period: "2025.09 ~ 2025.10",
                    desc: "GIST-MIT 공동 연구, 외부 참여 연구원 (Research Assistant)",
                  },
                  {
                    period: "2025.06 ~ 2025.11",
                    desc: "호남 ICT 이노베이션 개발자 소그룹 팀빌딩 6기 팀장",
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoList({
  title,
  items,
}: {
  title: string;
  items: { period: string; desc: string }[];
}) {
  return (
    <div className="reveal">
      <h3
        style={{
          fontFamily: "'JetBrains Mono',monospace",
          fontSize: "0.7rem",
          letterSpacing: "0.12em",
          color: "var(--gray-text)",
          marginBottom: "1rem",
          textTransform: "uppercase",
        }}
      >
        {title}
      </h3>
      {items.map((item, i) => (
        <div
          key={i}
          className={`award-card reveal reveal-delay-${i + 1}`}
          style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: "0.7rem",
              color: "var(--gray-text)",
              whiteSpace: "nowrap",
              minWidth: "110px",
              paddingTop: "0.15rem",
            }}
          >
            {item.period}
          </span>
          <span
            className="info-list-desc"
            style={{ fontSize: "0.88rem", lineHeight: 1.6 }}
          >
            {item.desc}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Skills ───────────────────────────────────────────────────────────────────

function SkillsSection() {
  return (
    <section
      id="skills"
      data-chapter
      style={{
        padding: "clamp(5rem,10vh,8rem) clamp(1.5rem,5vw,4rem)",
        background: "var(--cream-dark)",
        backgroundImage: `url(/images/skills-bg.webp)`,
        backgroundSize: "cover",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <SectionHeader num="02" label="CORE COMPETENCIES" />
        <h2
          className="reveal"
          style={{
            fontFamily: "'Noto Sans KR',sans-serif",
            fontWeight: 900,
            fontSize: "clamp(1.8rem,3.5vw,3rem)",
            lineHeight: 1.25,
            marginBottom: "2.5rem",
          }}
        >
          박성민의 <strong>핵심역량</strong>
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
            gap: "1.25rem",
          }}
        >
          {COMPETENCIES.map((c, i) => (
            <div
              key={c.num}
              className={`reveal reveal-delay-${i + 1}`}
              style={{
                padding: "1.75rem",
                border: "1px solid var(--gray-line)",
                background: "rgba(255,255,255,0.6)",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <h3
                style={{
                  fontFamily: "'Noto Sans KR',sans-serif",
                  fontWeight: 700,
                  fontSize: "1.05rem",
                }}
              >
                {c.num}. {c.title}
              </h3>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.45rem",
                  flex: 1,
                }}
              >
                {c.items.map(item => (
                  <li
                    key={item}
                    style={{
                      display: "flex",
                      gap: "0.6rem",
                      fontSize: "0.88rem",
                      lineHeight: 1.7,
                      color: "var(--charcoal-mid)",
                    }}
                  >
                    <span aria-hidden="true">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p
                style={{
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: "0.74rem",
                  color: "var(--charcoal)",
                  letterSpacing: "0.04em",
                  borderTop: "1px solid var(--gray-line)",
                  paddingTop: "0.9rem",
                }}
              >
                {c.keywords}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Projects ─────────────────────────────────────────────────────────────────

type Slide = { label: string; heading: string; content: ReactNode };

function buildSlides(project: Project): Slide[] {
  const slides: Slide[] = [
    {
      label: "개요",
      heading: "프로젝트 개요",
      content: <OverviewSlide project={project} />,
    },
  ];
  if (
    project.structureImages ||
    (project.flows && project.flows.length > 0) ||
    (project.owned && project.owned.length > 0)
  ) {
    slides.push({
      label: "구조",
      heading: "프로젝트 구조",
      content: <StructureSlide project={project} />,
    });
  }
  const ts = project.troubleshooting ?? [];
  ts.forEach((item, i) => {
    const n = ts.length > 1 ? ` ${i + 1}` : "";
    slides.push({
      label: `문제 해결${n}`,
      heading: `개발·운영 과정의 문제 해결${n}`,
      content: <TroubleshootingBlock item={item} />,
    });
  });
  if (project.outcomeNote || project.resultImages) {
    slides.push({
      label: "성과",
      heading: "성과",
      content: (
        <div>
          {project.outcomeNote && (
            <ProjectBlock label="" items={[project.outcomeNote]} />
          )}
          {project.resultImages && <FigureRow figs={project.resultImages} />}
        </div>
      ),
    });
  }
  return slides;
}

function OverviewSlide({ project }: { project: Project }) {
  const figs: Figure[] = (project.images ?? []).map(src => ({
    src,
    alt: `${project.title} 이미지`,
    caption: project.imageCaption,
    maxWidth: 520,
  }));
  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
          gap: "1.75rem 2.5rem",
        }}
      >
        <ProjectBlock
          label="프로젝트 목적 및 서비스 소개"
          items={project.purpose}
        />
        <ProjectBlock label="맡은 역할" items={project.roles} />
        {project.results.length > 0 && (
          <ProjectBlock label="주요 성과 및 결과" items={project.results} />
        )}
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.4rem",
          marginTop: "1.5rem",
        }}
      >
        {project.tags.map(tag => (
          <span key={tag} className="skill-tag">
            #{tag}
          </span>
        ))}
      </div>
      {figs.length > 0 && <FigureRow figs={figs} />}
      {project.note && (
        <p
          className="font-mono"
          style={{
            fontSize: "0.72rem",
            color: "var(--gray-text)",
            fontStyle: "italic",
            marginTop: "0.5rem",
          }}
        >
          * {project.note}
        </p>
      )}
    </div>
  );
}

function StructureSlide({ project }: { project: Project }) {
  return (
    <div>
      {project.structureImages && <FigureRow figs={project.structureImages} />}
      {!project.structureImages && project.flows && (
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}
        >
          {project.flows.map(flow => (
            <div key={flow.label}>
              <BlockLabel>{flow.label}</BlockLabel>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: "0.4rem",
                }}
              >
                {flow.steps.map((step, si) => (
                  <span
                    key={si}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.4rem",
                    }}
                  >
                    {si > 0 && (
                      <span
                        aria-hidden="true"
                        style={{ color: "var(--gray-text)" }}
                      >
                        →
                      </span>
                    )}
                    <span
                      style={{
                        fontSize: "0.85rem",
                        padding: "0.25rem 0.6rem",
                        border: "1px solid var(--gray-line)",
                        background: "rgba(255,255,255,0.6)",
                      }}
                    >
                      {step}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      {project.owned && project.owned.length > 0 && (
        <div style={{ marginTop: "1.5rem" }}>
          <ProjectBlock label="담당 영역" items={project.owned} />
        </div>
      )}
    </div>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  const links: { href: string; label: string; github?: boolean }[] = [];
  if (project.demo) links.push({ href: project.demo, label: "Live Demo ↗" });
  if (project.notion) links.push({ href: project.notion, label: "Notion" });
  if (project.press) links.push({ href: project.press, label: "보도자료" });
  links.push({ href: project.github, label: "GitHub", github: true });
  return (
    <div
      style={{
        display: "flex",
        gap: "0.5rem",
        flexWrap: "wrap",
        justifyContent: "flex-end",
      }}
    >
      {links.map(l => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          className="github-btn link-hover-accent"
          style={{ flexShrink: 0 }}
        >
          {l.github && (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
          )}
          {l.label}
        </a>
      ))}
    </div>
  );
}

function ProjectsSection() {
  const slideSets = PROJECTS.map(buildSlides);
  const [pi, setPi] = useState(0);
  const [si, setSi] = useState<number[]>(() => PROJECTS.map(() => 0));

  const isFirst = pi === 0 && si[pi] === 0;
  const isLast =
    pi === PROJECTS.length - 1 && si[pi] === slideSets[pi].length - 1;

  const setSlide = (p: number, s: number) =>
    setSi(prev => prev.map((v, i) => (i === p ? s : v)));

  const go = (delta: 1 | -1) => {
    const next = si[pi] + delta;
    if (next >= slideSets[pi].length) {
      if (pi < PROJECTS.length - 1) {
        setPi(pi + 1);
        setSlide(pi + 1, 0);
      }
    } else if (next < 0) {
      if (pi > 0) {
        setPi(pi - 1);
        setSlide(pi - 1, slideSets[pi - 1].length - 1);
      }
    } else {
      setSlide(pi, next);
    }
  };

  return (
    <section
      id="projects"
      data-chapter
      style={{ padding: "clamp(5rem,10vh,8rem) clamp(1.5rem,5vw,4rem)" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <SectionHeader num="03" label="PROJECT EXPERIENCE" />
        <div
          onKeyDown={e => {
            if (e.altKey || e.ctrlKey || e.metaKey) return;
            if (e.key === "ArrowRight") go(1);
            if (e.key === "ArrowLeft") go(-1);
          }}
        >
          <div
            role="tablist"
            aria-label="프로젝트 선택"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              marginBottom: "1.25rem",
            }}
          >
            {PROJECTS.map((project, i) => (
              <button
                key={project.id}
                type="button"
                role="tab"
                id={`proj-tab-${project.id}`}
                aria-selected={pi === i}
                aria-controls={`proj-panel-${project.id}`}
                className="pf-tab"
                onClick={() => setPi(i)}
              >
                {project.id} · {project.tab}
              </button>
            ))}
          </div>

          {PROJECTS.map((project, i) => {
            const slides = slideSets[i];
            const cur = si[i];
            return (
              <div
                key={project.id}
                role="tabpanel"
                id={`proj-panel-${project.id}`}
                aria-labelledby={`proj-tab-${project.id}`}
                hidden={pi !== i}
                className="project-card"
                style={{ padding: "clamp(1.5rem,3vw,2.5rem)" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    gap: "0.75rem 1.5rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  <div style={{ minWidth: 0, flex: "1 1 320px" }}>
                    <div
                      className="font-mono"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "0.5rem 0.75rem",
                        fontSize: "0.74rem",
                        color: "var(--gray-text)",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <span>{project.period}</span>
                      {project.periodNote && (
                        <span style={{ color: "var(--accent)" }}>
                          {project.periodNote}
                        </span>
                      )}
                      <span
                        style={{
                          border: "1px solid var(--gray-line)",
                          padding: "0.12rem 0.5rem",
                        }}
                      >
                        {project.role}
                      </span>
                    </div>
                    <h3
                      style={{
                        fontFamily: "'Noto Sans KR',sans-serif",
                        fontWeight: 700,
                        fontSize: "clamp(1.15rem,2.4vw,1.6rem)",
                        lineHeight: 1.35,
                        color: "var(--charcoal)",
                      }}
                    >
                      {project.title}
                    </h3>
                  </div>
                  <ProjectLinks project={project} />
                </div>

                {slides.length > 1 && (
                  <div
                    role="group"
                    aria-label="슬라이드 이동"
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.4rem",
                      marginBottom: "1.5rem",
                      paddingBottom: "1.25rem",
                      borderBottom: "1px solid var(--gray-line)",
                    }}
                  >
                    {slides.map((s, k) => (
                      <button
                        key={s.label}
                        type="button"
                        aria-current={cur === k ? "step" : undefined}
                        className="pf-step"
                        onClick={() => setSlide(i, k)}
                      >
                        <span aria-hidden="true">{k + 1}</span> {s.label}
                      </button>
                    ))}
                  </div>
                )}

                {slides.map((s, k) => (
                  <div key={s.label} hidden={cur !== k}>
                    <h4
                      style={{
                        fontFamily: "'Noto Sans KR',sans-serif",
                        fontWeight: 900,
                        fontSize: "clamp(1.3rem,2.6vw,1.8rem)",
                        marginBottom: "1.5rem",
                      }}
                    >
                      {s.heading}
                    </h4>
                    {s.content}
                  </div>
                ))}

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "1rem",
                    marginTop: "2rem",
                    paddingTop: "1.25rem",
                    borderTop: "1px solid var(--gray-line)",
                  }}
                >
                  <button
                    type="button"
                    className="pf-nav"
                    onClick={() => go(-1)}
                    disabled={isFirst}
                  >
                    ← 이전
                  </button>
                  <span
                    className="font-mono"
                    aria-live="polite"
                    style={{ fontSize: "0.78rem", color: "var(--gray-text)" }}
                  >
                    {cur + 1} / {slides.length}
                  </span>
                  <button
                    type="button"
                    className="pf-nav"
                    onClick={() => go(1)}
                    disabled={isLast}
                  >
                    다음 →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FigureRow({ figs }: { figs: Figure[] }) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "1rem",
        alignItems: "flex-start",
        margin: "0.9rem 0",
      }}
    >
      {figs.map(fig => (
        <figure
          key={fig.src}
          style={{
            margin: 0,
            flex: fig.maxWidth ? `0 1 ${fig.maxWidth}px` : "1 1 100%",
            maxWidth: "100%",
          }}
        >
          <img
            src={fig.src}
            alt={fig.alt}
            loading="lazy"
            decoding="async"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              border: "1px solid var(--gray-line)",
              background: "#fff",
            }}
          />
          {fig.caption && (
            <figcaption
              className="font-mono"
              style={{
                fontSize: "0.68rem",
                color: "var(--gray-text)",
                marginTop: "0.4rem",
                lineHeight: 1.6,
              }}
            >
              {fig.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}

function BlockLabel({ children }: { children: ReactNode }) {
  return (
    <p
      className="font-mono"
      style={{
        fontSize: "0.68rem",
        letterSpacing: "0.1em",
        color: "var(--gray-text)",
        marginBottom: "0.5rem",
      }}
    >
      {children}
    </p>
  );
}

function ProjectBlock({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      {label && <BlockLabel>{label}</BlockLabel>}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
        {items.map((text, i) => (
          <div
            key={i}
            style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start" }}
          >
            <span
              aria-hidden="true"
              style={{ color: "var(--gray-text)", fontSize: "0.84rem" }}
            >
              -
            </span>
            <span
              className="card-body"
              style={{
                fontSize: "0.95rem",
                lineHeight: 1.75,
                color: "var(--charcoal)",
              }}
            >
              {text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TroubleshootingBlock({ item }: { item: Troubleshooting }) {
  return (
    <div
      style={{
        marginBottom: "1.25rem",
        padding: "1.1rem 1.25rem",
        borderLeft: "2px solid var(--accent)",
        background: "rgba(255,255,255,0.55)",
      }}
    >
      <h4
        style={{
          fontFamily: "'Noto Sans KR',sans-serif",
          fontWeight: 700,
          fontSize: "0.95rem",
          lineHeight: 1.5,
          marginBottom: "0.75rem",
        }}
      >
        {item.title}
      </h4>
      {item.rows?.map(row => (
        <div
          key={row.tag}
          style={{ display: "flex", gap: "0.9rem", marginBottom: "0.5rem" }}
        >
          <span
            className="font-mono"
            style={{
              fontSize: "0.7rem",
              color: "var(--accent)",
              minWidth: "2.2rem",
              paddingTop: "0.15rem",
            }}
          >
            {row.tag}
          </span>
          <span style={{ fontSize: "0.86rem", lineHeight: 1.65 }}>
            {row.text}
            {row.sub && (
              <span
                style={{
                  display: "block",
                  fontSize: "0.76rem",
                  color: "var(--gray-text)",
                }}
              >
                {row.sub}
              </span>
            )}
          </span>
        </div>
      ))}
      {item.steps && <ProjectBlock label="" items={item.steps} />}
      {item.images && <FigureRow figs={item.images} />}
      {item.metrics && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: "0.75rem",
            marginTop: "0.75rem",
          }}
        >
          {item.metrics.map(m => (
            <div
              key={m.label}
              style={{
                padding: "0.8rem 1rem",
                border: "1px solid var(--gray-line)",
                background: "var(--white)",
              }}
            >
              <p
                className="font-mono"
                style={{ fontSize: "0.68rem", color: "var(--gray-text)" }}
              >
                {m.label}
              </p>
              <p
                style={{
                  fontFamily: "'Noto Sans KR',sans-serif",
                  fontWeight: 900,
                  fontSize: "1.3rem",
                  margin: "0.2rem 0",
                }}
              >
                {m.before && (
                  <span style={{ color: "var(--gray-text)" }}>
                    {m.before} →{" "}
                  </span>
                )}
                <span style={{ color: "var(--accent)" }}>{m.after}</span>
              </p>
              {m.note && (
                <p style={{ fontSize: "0.72rem", color: "var(--gray-text)" }}>
                  {m.note}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
      {item.footnote && (
        <p
          className="font-mono"
          style={{
            fontSize: "0.68rem",
            color: "var(--gray-text)",
            marginTop: "0.75rem",
            lineHeight: 1.6,
          }}
        >
          {item.footnote}
        </p>
      )}
    </div>
  );
}

// ─── Awards ───────────────────────────────────────────────────────────────────

function AwardsSection() {
  return (
    <section
      id="awards"
      data-chapter
      style={{
        padding: "clamp(5rem,10vh,8rem) clamp(1.5rem,5vw,4rem)",
        background: "var(--cream-dark)",
        color: "var(--charcoal)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <SectionHeader num="04" label="AWARDS" />
        <h2
          className="reveal"
          style={{
            fontFamily: "'Noto Sans KR',sans-serif",
            fontWeight: 900,
            fontSize: "clamp(2rem,4vw,3.5rem)",
            marginBottom: "2.5rem",
          }}
        >
          수상 내역
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
            gap: "1.25rem",
          }}
        >
          {AWARDS.map((award, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${i + 1}`}
              style={{
                padding: "1.75rem",
                border: "1px solid var(--gray-line)",
                background: "var(--white)",
              }}
            >
              <p
                style={{
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: "0.7rem",
                  color: "var(--gray-text)",
                  marginBottom: "0.6rem",
                  letterSpacing: "0.08em",
                }}
              >
                {award.date}
              </p>
              <h3
                style={{
                  fontFamily: "'Noto Sans KR',sans-serif",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  marginBottom: "0.4rem",
                  lineHeight: 1.45,
                }}
              >
                {award.title}
              </h3>
              <p
                style={{
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: "0.82rem",
                  color: "var(--accent)",
                  marginBottom: "0.35rem",
                }}
              >
                {award.result}
              </p>
              <p
                style={{
                  fontSize: "0.78rem",
                  color: "var(--gray-text)",
                  marginBottom: "1rem",
                }}
              >
                {award.org}
              </p>
              {"image" in award && award.image && (
                <div
                  style={{
                    overflow: "hidden",
                    border: "1px solid var(--gray-line)",
                    background: "#fff",
                  }}
                >
                  <img
                    src={award.image}
                    alt={award.title}
                    loading="lazy"
                    decoding="async"
                    style={{
                      width: "100%",
                      height: "280px",
                      display: "block",
                      objectFit: "contain",
                    }}
                  />
                </div>
              )}
              {"link" in award && award.link && (
                <a
                  href={award.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    fontFamily: "'JetBrains Mono',monospace",
                    fontSize: "0.72rem",
                    color: "var(--charcoal)",
                    textDecoration: "none",
                    borderBottom: "1px solid var(--charcoal)",
                    marginTop: "1rem",
                  }}
                >
                  View Presentation
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Links ────────────────────────────────────────────────────────────────────

const ARCHIVE_URL = "https://app.notion.com/p/3eeca50bf30d80679290cce41e54cd1b";

function LinksSection() {
  return (
    <section
      id="links"
      data-chapter
      style={{ padding: "clamp(5rem,10vh,8rem) clamp(1.5rem,5vw,4rem)" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <SectionHeader num="05" label="LINKS" />
        <div
          className="reveal"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "1.25rem",
          }}
        >
          <a href={ARCHIVE_URL} target="_blank" rel="noopener noreferrer">
            <img
              src="/images/links-qr.png"
              alt="Project Archive 접속 QR 코드"
              width={225}
              height={225}
              loading="lazy"
              decoding="async"
              style={{ display: "block", background: "#fff" }}
            />
          </a>
          <a
            href={ARCHIVE_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: "0.85rem",
              color: "var(--charcoal)",
              textDecoration: "none",
              borderBottom: "1px solid var(--charcoal)",
            }}
          >
            Project Archive ↗
          </a>
          <p
            style={{
              fontSize: "0.92rem",
              color: "var(--charcoal-mid)",
              lineHeight: 1.9,
            }}
          >
            앞서 다룬 프로젝트를 정리한 링크를 모아두었습니다.
            <br />
            QR코드로도 접속할 수 있습니다.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────

function ContactSection() {
  return (
    <section
      id="contact"
      data-chapter
      style={{ padding: "clamp(5rem,10vh,8rem) clamp(1.5rem,5vw,4rem)" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <SectionHeader num="06" label="CONTACT" />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
            gap: "clamp(2rem,5vw,6rem)",
            alignItems: "center",
          }}
        >
          <div>
            <h2
              className="reveal"
              style={{
                fontFamily: "'Noto Sans KR',sans-serif",
                fontWeight: 900,
                fontSize: "clamp(2rem,4vw,3.5rem)",
                lineHeight: 1.2,
                marginBottom: "1.25rem",
              }}
            >
              감사합니다.
              <br />
              THANK YOU
            </h2>
            <p
              className="reveal reveal-delay-1"
              style={{
                fontSize: "0.92rem",
                color: "var(--charcoal-mid)",
                lineHeight: 1.9,
              }}
            >
              기본기와 실행력을 바탕으로 성장하는 백엔드 개발자가 되겠습니다.
              <br />더 궁금한 점이 있다면 편하게 연락 주세요.
            </p>
          </div>
          <div
            className="reveal reveal-delay-2"
            style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
          >
            {[
              {
                href: "mailto:jpsm0305@naver.com",
                label: "jpsm0305@naver.com",
                icon: (
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                ),
              },
              {
                href: "tel:010-9397-3908",
                label: "010-9397-3908",
                icon: (
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.69h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.09a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 17.5l.19-.58z" />
                  </svg>
                ),
              },
              {
                href: "https://github.com/Terra0305",
                label: "github.com/Terra0305",
                target: "_blank",
                icon: (
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                ),
              },
            ].map((item, i) => (
              <a
                key={i}
                href={item.href}
                target={(item as any).target}
                rel={(item as any).target ? "noopener noreferrer" : undefined}
                className="contact-link"
                style={{ fontSize: "0.95rem" }}
              >
                {item.icon}
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer
      style={{
        padding: "1.75rem clamp(1.5rem,5vw,4rem)",
        borderTop: "1px solid var(--gray-line)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "0.75rem",
      }}
    >
      <span
        style={{
          fontFamily: "'JetBrains Mono',monospace",
          fontSize: "0.72rem",
          color: "var(--gray-text)",
        }}
      >
        © 2026 PARKSUNGMIN. Backend Developer.
      </span>
      <span
        style={{
          width: "1.2rem",
          height: "1.2rem",
          borderBottom: "1.5px solid var(--gray-line)",
          borderRight: "1.5px solid var(--gray-line)",
          display: "block",
        }}
      />
    </footer>
  );
}

// ─── Shared ───────────────────────────────────────────────────────────────────

function SectionHeader({ num, label }: { num: string; label: string }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        alignItems: "center",
        marginBottom: "clamp(2.5rem,5vh,4rem)",
      }}
    >
      <span className="section-number reveal">{num}</span>
      <div className="divider-line reveal" style={{ flex: 1 }} />
      <span
        className="reveal"
        style={{
          fontFamily: "'JetBrains Mono',monospace",
          fontSize: "0.72rem",
          color: "var(--gray-text)",
          letterSpacing: "0.1em",
        }}
      >
        {label}
      </span>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  useScrollReveal();
  return (
    <div style={{ background: "var(--cream)", minHeight: "100vh" }}>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <AwardsSection />
        <LinksSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
