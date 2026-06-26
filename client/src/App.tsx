/*
 * Design: Japanese Minimalism meets Swiss Typography
 * Cream (#F7F5F0) base, Dark (#1A1A1A) text, Indigo (#3B5BDB) accent
 * Sections: Hero → About → Skills → Projects → Awards → Contact
 */

import { useEffect, useState } from 'react';
import './index.css';

// ─── Image Assets (User-provided, Public CDN) ─────────────────────────────────
const IMAGES = {
  profile: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663647760404/CrXowwJTPmTHjrEb.png',
  proj1_combined: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663647760404/fMTPWAJFUwSSBdqU.png',
  proj2_screenshot: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663647760404/aSVDeJjeWsztbsWm.png',
  proj3_photo: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663647760404/cgaGCpfyZnGsYHhF.png',
  proj4_doc: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663647760404/pCZgGlYBWfGrJiiX.png',
  award1: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663647760404/tmjPULSMalHIYAQC.png',
  award2: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663647760404/ESBrqkKZzUENUSNt.png',
  award3: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663647760404/QVKgOQacYJVNVieX.png',
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    id: '01',
    title: '교내 Codeforces 경진대회 운영 플랫폼',
    period: '2025.12 ~ 진행중',
    role: 'Student Operator & Infra',
    description: '조선대학교 SW중심대학사업단의 2026 교내 Codeforces 경진대회 시범 운영에 학생 운영진으로 참여했습니다. 교내 전용 플랫폼 Chosun Codeforces를 구축해 참가 신청, 대회 운영, 실시간 순위 확인을 지원하고, 단일 Azure VM 환경에서 프론트·백엔드 실행 환경을 분리했습니다.',
    tags: ['Docker', 'Azure VM', 'Nginx', 'Infra'],
    highlights: [
      '학생 운영진으로 문제 선정, 국문 번역 및 검수, 대회 운영 흐름에 참여',
      '교내 전용 플랫폼 구축으로 참가 신청, 운영 관리, 실시간 순위 확인 지원',
      '총 12개 팀 27명 참가, 참가자 만족도 평균 95.3% 기록',
      'Nginx 리버스 프록시로 파일 서빙과 API 라우팅을 단일 진입점으로 통합',
    ],
    github: 'https://github.com/Terra0305/Korean-codeforces.git',
    notion: 'https://hallowed-second-cae.notion.site/CSforces-33cca50bf30d80f78ee4cdb9070df8a6?source=copy_link',
    press: 'https://sw.chosun.ac.kr/main/menu?gc=934NPWN&do=view&bwrite_id=VMb3JyheK4Xq',
    images: [IMAGES.proj1_combined],
    imageCaption: '2026 교내 Codeforces 경진대회 시범 운영 현장',
  },
  {
    id: '02',
    title: '어린이 코딩 교육을 위한 알고리즘 시각화 플랫폼',
    period: '2025.06 ~ 2026.02',
    role: 'Backend',
    description: '초급자를 위한 알고리즘 흐름을 시각화해주는 교육용 웹 플랫폼. 다중 접속 환경의 서버 부하를 고려해 Spring Security + JWT 기반 Stateless 인증 구조를 설계했습니다.',
    tags: ['Java', 'SpringBoot', 'JWT', 'Swagger', 'PostgreSQL'],
    highlights: [
      '세션 관리가 필요 없는 확장 가능한 인증 아키텍처 구현',
      'Swagger 도입으로 실시간 API 명세서를 자동화해 프론트엔드 협업 비용 절감',
      '교내 지원금 200만 원 유치 및 고도화 진행 중',
    ],
    github: 'https://github.com/Terra0305/Capstone',
    images: [IMAGES.proj2_screenshot],
    imageCaption: '알고리즘 흐름을 단계별로 확인하는 코딩 시각화 화면',
  },
  {
    id: '03',
    title: '생성형 AI 기반 노인 맞춤형 기차 예매 서비스 "손에딱"',
    period: '2025.06 ~ 2025.11',
    role: 'Team Leader & Backend',
    description: '디지털 소외 계층을 위한 Google STT 및 Gemini LLM 기반 음성 예매 서비스. 비정형 음성 발화에서 예매 정보를 추출하고, 시스템이 처리 가능한 JSON 포맷으로 정규화하는 흐름을 설계했습니다.',
    tags: ['Java', 'SpringBoot', 'Google STT', 'Gemini API', 'PostgreSQL'],
    highlights: [
      'Google Gemini API 연동 AI 응답 처리 파이프라인 구축',
      'DataInitializer로 실행 시마다 일관된 기차표 더미 데이터를 생성하는 테스트베드 확보',
      '팀장으로서 300만 원 규모 정부 과제 수행, 사업화 가능성 검증',
    ],
    github: 'https://github.com/Terra0305/Teambuilding',
    notion: 'https://www.notion.so/6-268ca50bf30d8046a487e201dc991d6b?source=copy_link',
    images: [IMAGES.proj3_photo],
    imageCaption: '개발자 소그룹 팀빌딩 6기 프로젝트 발표 및 검증 자료',
  },
  {
    id: '04',
    title: 'GIST-MIT 공동연구: 새로운 모달리티와 계산 효율적인 대조학습',
    period: '2025.08 ~ 2025.10',
    role: 'Research Assistant',
    description: '멀티모달 AI 학습용 데이터 전처리. 수작업으로 진행되던 반복 자막 정제 과정을 Python 자동화 스크립트로 개선하고, 예외 처리와 로깅을 통해 대량 파일을 안정적으로 변환했습니다.',
    tags: ['Python', 'Regex', 'Data Processing', 'NLP'],
    highlights: [
      'Python 자동화 스크립트로 자막 정제 작업 속도 및 정확도 향상',
      '비정형 VTT 파일 처리를 위한 정규표현식 및 오타 교정 사전 구축',
      '수만 건의 데이터를 작업 중단 없이 안정적으로 변환 완료',
    ],
    github: 'https://github.com/Terra0305/vtt-data-preprocessor',
    notion: 'https://hallowed-second-cae.notion.site/GIST-MIT-273ca50bf30d8046b01ef222d90e9152',
    images: [IMAGES.proj4_doc],
    imageCaption: 'GIST-MIT 공동연구 외부 참여 연구원 확인 자료',
    note: '본 프로젝트의 세부 방법론 및 연구 성과는 보안서약(NDA) 체결로 인해 상세 기술이 제한됩니다.',
  },
];

const SKILLS = [
  { category: 'Languages', items: ['Java', 'Python'] },
  { category: 'Frameworks', items: ['SpringBoot', 'Spring Security'] },
  { category: 'Database', items: ['PostgreSQL'] },
  { category: 'Infra / DevOps', items: ['Docker', 'Nginx', 'Azure VM', 'Git'] },
  { category: 'Tools', items: ['Swagger', 'JWT', 'Gemini API', 'Google STT'] },
];

const AWARDS = [
  {
    title: '조선대학교 AI부트캠프 해커톤',
    result: '대상 (AquaGuard AI)',
    date: '2026.06.23',
    org: '조선대학교 AI부트캠프',
    description: '양식장 IoT 센서 데이터를 기반으로 펌프·수조 설비 이상을 실시간 감지하고, 관리자에게 AI 의심 분석 결과를 제공하는 모바일 웹 데모를 구현했습니다.',
    link: 'https://www.canva.com/design/DAHNQ6zTlEk/c4ndsNDftl_H7CTK8wJUSA/edit',
  },
  { title: '2025 프로그래밍 경시대회 ICPC', result: '교내 1위 (대상)', date: '2025.10.11', org: '조선대학교 SW중심대학사업단', image: IMAGES.award1 },
  { title: '2025 조선대학교 SW아이디어톤 경진대회', result: '3위 (우수상)', date: '2025.11.22', org: '조선대학교 SW중심대학사업단', image: IMAGES.award2 },
  { title: '2025 호남권 SW창업 아이디어 경진대회', result: '6위 (장려상)', date: '2025.09.30', org: '호남권 소프트웨어중심대학협의회', image: IMAGES.award3 },
];

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }); },
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal, .divider-line').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const nav = [['about', 'About'], ['skills', 'Skills'], ['projects', 'Projects'], ['awards', 'Awards'], ['contact', 'Contact']];
  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: 'rgba(247,245,240,0.94)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(204,204,204,0.4)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem clamp(1.5rem,5vw,4rem)' }}>
        <a href="#hero" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.85rem', fontWeight: 500, color: 'var(--charcoal)', textDecoration: 'none', letterSpacing: '0.05em' }}>PSM.dev</a>
        <div className="desktop-only" style={{ display: 'flex', gap: '2.5rem' }}>
          {nav.map(([s, l]) => <a key={s} href={`#${s}`} className="nav-link">{l}</a>)}
        </div>
        <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'none', flexDirection: 'column', gap: '5px', padding: '4px' }} aria-label="메뉴">
          {[0, 1, 2].map(i => <span key={i} style={{ display: 'block', width: '22px', height: '1.5px', background: 'var(--charcoal)' }} />)}
        </button>
      </div>
      {menuOpen && (
        <div style={{ padding: '1rem clamp(1.5rem,5vw,4rem) 1.5rem', borderTop: '1px solid rgba(204,204,204,0.4)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {nav.map(([s, l]) => <a key={s} href={`#${s}`} className="nav-link" onClick={() => setMenuOpen(false)}>{l}</a>)}
        </div>
      )}
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section id="hero" data-chapter style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(6rem,12vh,10rem) clamp(1.5rem,5vw,4rem) 4rem', backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663647760404/mXJ94MAuPRgRPyS2yxGEjU/hero-bg-juG8G2SGipz8xN37Hvy4di.webp)`, backgroundSize: 'cover', backgroundPosition: 'center right', position: 'relative', overflow: 'hidden' }}>
      <span style={{ position: 'absolute', top: '5rem', left: '1.5rem', width: '1.75rem', height: '1.75rem', borderTop: '2px solid var(--charcoal)', borderLeft: '2px solid var(--charcoal)' }} />
      <span style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem', width: '1.75rem', height: '1.75rem', borderBottom: '2px solid var(--charcoal)', borderRight: '2px solid var(--charcoal)' }} />
      <div style={{ maxWidth: '900px' }}>
        <p className="hero-animate hero-animate-1 font-mono" style={{ fontSize: '0.8rem', color: 'var(--gray-text)', marginBottom: '1.25rem', letterSpacing: '0.15em' }}>Backend Developer</p>
        <h1 className="hero-animate hero-animate-2" style={{ fontFamily: "'Noto Sans KR',sans-serif", fontWeight: 900, fontSize: 'clamp(2.8rem,7vw,6rem)', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '0.15rem' }}>개발자</h1>
        <h1 className="font-display hero-animate hero-animate-3" style={{ fontSize: 'clamp(3.2rem,9vw,8.5rem)', lineHeight: 1, letterSpacing: '0.02em', marginBottom: '2.5rem' }}>PARK SEONGMIN</h1>
        <div className="hero-divider" />
        <p className="hero-animate hero-animate-4" style={{ fontSize: 'clamp(0.9rem,1.5vw,1.05rem)', color: 'var(--charcoal-mid)', lineHeight: 1.9, maxWidth: '460px' }}>
          기본기가 튼튼한 개발자를 지향합니다.<br />꾸준한 알고리즘 학습으로 교내 경시대회 1위를 수상했고,<br />코드가 실제 서비스로 구현되는 전체 과정을 깊이 있게 배웠습니다.
        </p>
        <div className="hero-animate hero-animate-5" style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
          <a href="#projects" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.7rem 1.6rem', background: 'var(--charcoal)', color: 'var(--cream)', fontFamily: "'JetBrains Mono',monospace", fontSize: '0.8rem', letterSpacing: '0.08em', textDecoration: 'none' }}>View Projects →</a>
          <a href="mailto:jpsm0305@naver.com" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.7rem 1.6rem', border: '1px solid var(--charcoal)', color: 'var(--charcoal)', fontFamily: "'JetBrains Mono',monospace", fontSize: '0.8rem', letterSpacing: '0.08em', textDecoration: 'none', background: 'transparent' }}>Contact Me</a>
        </div>
      </div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────

function AboutSection() {
  return (
    <section id="about" data-chapter style={{ padding: 'clamp(5rem,10vh,8rem) clamp(1.5rem,5vw,4rem)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <SectionHeader num="01" label="ABOUT ME" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 'clamp(2rem,5vw,6rem)', alignItems: 'start' }}>
          {/* Left: 프로필 사진 + 연락처 */}
          <div>
            {/* 프로필 사진 */}
            <div className="reveal" style={{ width: '200px', overflow: 'hidden', border: '1px solid var(--gray-line)', marginBottom: '2rem' }}>
              <img src={IMAGES.profile} alt="박성민 프로필" style={{ width: '100%', display: 'block', objectFit: 'cover', objectPosition: 'center top' }} />
            </div>
            <h2 className="reveal reveal-delay-1" style={{ fontFamily: "'Noto Sans KR',sans-serif", fontWeight: 900, fontSize: 'clamp(1.8rem,3.5vw,3rem)', lineHeight: 1.25, marginBottom: '1.5rem' }}>
              기본기가 튼튼한<br /><span style={{ fontWeight: 300 }}>개발자를 지향하는</span><br />지원자 박성민입니다.
            </h2>
            <div className="reveal reveal-delay-2" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.8rem', color: 'var(--gray-text)', lineHeight: 2.2, borderLeft: '2px solid var(--gray-line)', paddingLeft: '1.25rem' }}>
              <p>Mobile: 010-9397-3908</p>
              <p>E-mail: jpsm0305@naver.com</p>
            </div>
          </div>
          {/* Right: 학력 + 활동 */}
          <div>
            <InfoList title="Education & Military" items={[
              { period: '2021.03 ~', desc: '조선대학교 컴퓨터 공학과 재학 중' },
              { period: '2022.04 ~ 2023.10', desc: '대한민국 육군 병장 만기 전역' },
            ]} />
            <div style={{ marginTop: '2.5rem' }}>
              <InfoList title="Activities" items={[
                { period: '2026.04', desc: '조선대학교 SW중심대학사업단 2026 교내 Codeforces 경진대회 학생 운영진' },
                { period: '2025.07 ~ 2025.11', desc: '호남 ICT 이노베이션 개발자 소그룹 팀빌딩 6기 팀장' },
                { period: '2025.08 ~ 2025.10', desc: 'GIST-MIT 공동 연구, 외부 참여 연구원 (Research Assistant)' },
              ]} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoList({ title, items }: { title: string; items: { period: string; desc: string }[] }) {
  return (
    <div className="reveal">
      <h3 style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.7rem', letterSpacing: '0.12em', color: 'var(--gray-text)', marginBottom: '1rem', textTransform: 'uppercase' }}>{title}</h3>
      {items.map((item, i) => (
        <div key={i} className={`award-card reveal reveal-delay-${i + 1}`} style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.7rem', color: 'var(--gray-text)', whiteSpace: 'nowrap', minWidth: '110px', paddingTop: '0.15rem' }}>{item.period}</span>
          <span style={{ fontSize: '0.88rem', lineHeight: 1.6 }}>{item.desc}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Skills ───────────────────────────────────────────────────────────────────

function SkillsSection() {
  return (
    <section id="skills" data-chapter style={{ padding: 'clamp(5rem,10vh,8rem) clamp(1.5rem,5vw,4rem)', background: 'var(--cream-dark)', backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663647760404/mXJ94MAuPRgRPyS2yxGEjU/skills-bg-Szx7En5suT9BoJEBm8v9ki.webp)`, backgroundSize: 'cover' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <SectionHeader num="02" label="CORE COMPETENCIES" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 'clamp(2rem,5vw,4rem)', alignItems: 'start' }}>
          <div>
            <h2 className="reveal" style={{ fontFamily: "'Noto Sans KR',sans-serif", fontWeight: 900, fontSize: 'clamp(1.8rem,3.5vw,3rem)', lineHeight: 1.25, marginBottom: '1.5rem' }}>박성민의<br /><strong>핵심역량</strong></h2>
            <p className="reveal reveal-delay-1" style={{ fontSize: '0.92rem', color: 'var(--charcoal-mid)', lineHeight: 1.9, maxWidth: '380px' }}>Java와 SpringBoot를 중심으로 인증, API, 데이터 처리, 배포 흐름을 경험했습니다. 알고리즘 학습으로 쌓은 문제 해결력을 바탕으로 <strong>코드가 실제 서비스로 운영되는 과정</strong>까지 넓혀가고 있습니다.</p>
          </div>
          <div>
            {SKILLS.map((group, gi) => (
              <div key={gi} className={`reveal reveal-delay-${gi + 1}`} style={{ marginBottom: '1.5rem' }}>
                <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.68rem', color: 'var(--gray-text)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{group.category}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {group.items.map(skill => <span key={skill} className="skill-tag">#{skill}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Projects ─────────────────────────────────────────────────────────────────

function ProjectsSection() {
  return (
    <section id="projects" style={{ padding: 'clamp(5rem,10vh,8rem) clamp(1.5rem,5vw,4rem)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <SectionHeader num="03" label="PROJECT EXPERIENCE" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {PROJECTS.map((project, i) => <ProjectCard key={project.id} project={project} delay={(i % 3) + 1} />)}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, delay }: { project: typeof PROJECTS[0]; delay: number }) {
  return (
    <div data-chapter className={`project-card reveal reveal-delay-${delay}`} style={{ padding: 'clamp(1.5rem,3vw,2.5rem)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
            <span className="font-mono card-period" style={{ fontSize: '0.72rem', color: 'var(--gray-text)' }}>{project.id}</span>
            <span className="font-mono card-period" style={{ fontSize: '0.72rem', color: 'var(--gray-text)' }}>{project.period}</span>
            <span className="font-mono card-period" style={{ fontSize: '0.68rem', color: 'var(--gray-text)', border: '1px solid var(--gray-line)', padding: '0.12rem 0.5rem' }}>{project.role}</span>
          </div>
          <h3 className="card-title" style={{ fontFamily: "'Noto Sans KR',sans-serif", fontWeight: 700, fontSize: 'clamp(1rem,2vw,1.3rem)', lineHeight: 1.35, color: 'var(--charcoal)' }}>{project.title}</h3>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          {'notion' in project && project.notion && (
            <a href={project.notion} target="_blank" rel="noopener noreferrer" className="github-btn link-hover-accent" onClick={e => e.stopPropagation()} style={{ flexShrink: 0 }}>
              Notion
            </a>
          )}
          {'press' in project && project.press && (
            <a href={project.press} target="_blank" rel="noopener noreferrer" className="github-btn link-hover-accent" onClick={e => e.stopPropagation()} style={{ flexShrink: 0 }}>
              보도자료
            </a>
          )}
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="github-btn link-hover-accent" onClick={e => e.stopPropagation()} style={{ flexShrink: 0 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" /></svg>
            GitHub
          </a>
        </div>
      </div>
      <p className="card-desc" style={{ fontSize: '0.88rem', color: 'var(--charcoal-mid)', lineHeight: 1.8, marginBottom: '1rem' }}>{project.description}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '1rem' }}>
        {project.highlights.map((h, hi) => (
          <div key={hi} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <span className="font-mono" style={{ fontSize: '0.68rem', color: 'var(--gray-text)', marginTop: '0.2rem', flexShrink: 0 }}>{String(hi + 1).padStart(2, '0')}</span>
            <span className="card-body" style={{ fontSize: '0.84rem', lineHeight: 1.7, color: 'var(--charcoal)' }}>{h}</span>
          </div>
        ))}
      </div>
      {(project as any).note && (
        <p className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--gray-text)', fontStyle: 'italic', marginBottom: '0.75rem' }}>* {(project as any).note}</p>
      )}
      {/* Project Images */}
      {project.images && project.images.length > 0 && (
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
          {project.images.map((src, idx) => (
            <div key={idx} style={{ flex: '1 1 200px', maxWidth: '480px', overflow: 'hidden', border: '1px solid var(--gray-line)' }}>
              <img src={src} alt={`${project.title} 증빙`} loading="lazy" style={{ width: '100%', maxHeight: '260px', objectFit: 'contain', objectPosition: 'center', display: 'block', background: '#fafafa' }} />
            </div>
          ))}
          {'imageCaption' in project && project.imageCaption && (
            <p className="font-mono" style={{ width: '100%', fontSize: '0.68rem', color: 'var(--gray-text)' }}>{project.imageCaption}</p>
          )}
        </div>
      )}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
        {project.tags.map(tag => (
          <span key={tag} className="card-tag" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.7rem', padding: '0.2rem 0.55rem', border: '1px solid var(--gray-line)', color: 'var(--gray-text)', background: 'transparent' }}>#{tag}</span>
        ))}
      </div>
    </div>
  );
}

// ─── Awards ───────────────────────────────────────────────────────────────────

function AwardsSection() {
  return (
    <section id="awards" data-chapter style={{ padding: 'clamp(5rem,10vh,8rem) clamp(1.5rem,5vw,4rem)', background: 'var(--cream-dark)', color: 'var(--charcoal)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <SectionHeader num="04" label="AWARDS" />
        <h2 className="reveal" style={{ fontFamily: "'Noto Sans KR',sans-serif", fontWeight: 900, fontSize: 'clamp(2rem,4vw,3.5rem)', marginBottom: '2.5rem' }}>수상 내역</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '1.25rem' }}>
          {AWARDS.map((award, i) => (
            <div key={i} className={`reveal reveal-delay-${i + 1}`} style={{ padding: '1.75rem', border: '1px solid var(--gray-line)', background: 'var(--white)' }}>
              <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.7rem', color: 'var(--gray-text)', marginBottom: '0.6rem', letterSpacing: '0.08em' }}>{award.date}</p>
              <h3 style={{ fontFamily: "'Noto Sans KR',sans-serif", fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.4rem', lineHeight: 1.45 }}>{award.title}</h3>
              <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.82rem', color: 'var(--accent)', marginBottom: '0.35rem' }}>{award.result}</p>
              <p style={{ fontSize: '0.78rem', color: 'var(--gray-text)', marginBottom: '1rem' }}>{award.org}</p>
              {'description' in award && award.description && (
                <p style={{ fontSize: '0.78rem', color: 'var(--charcoal-mid)', lineHeight: 1.7, marginBottom: '1rem' }}>{award.description}</p>
              )}
              {'link' in award && award.link && (
                <a href={award.link} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', fontFamily: "'JetBrains Mono',monospace", fontSize: '0.72rem', color: 'var(--charcoal)', textDecoration: 'none', borderBottom: '1px solid var(--charcoal)', marginBottom: '1rem' }}>
                  View Presentation
                </a>
              )}
              {'image' in award && award.image && (
                <div style={{ overflow: 'hidden', border: '1px solid var(--gray-line)', background: '#fff' }}>
                  <img src={award.image} alt={award.title} loading="lazy" style={{ width: '100%', display: 'block', objectFit: 'contain', maxHeight: '280px' }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────

function ContactSection() {
  return (
    <section id="contact" data-chapter style={{ padding: 'clamp(5rem,10vh,8rem) clamp(1.5rem,5vw,4rem)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <SectionHeader num="05" label="CONTACT" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 'clamp(2rem,5vw,6rem)', alignItems: 'center' }}>
          <div>
            <h2 className="reveal" style={{ fontFamily: "'Noto Sans KR',sans-serif", fontWeight: 900, fontSize: 'clamp(2rem,4vw,3.5rem)', lineHeight: 1.2, marginBottom: '1.25rem' }}>읽어주셔서<br />감사합니다.</h2>
            <p className="reveal reveal-delay-1" style={{ fontSize: '0.92rem', color: 'var(--charcoal-mid)', lineHeight: 1.9 }}>기본기와 실행력을 바탕으로 성장하는 백엔드 개발자가 되겠습니다.<br />더 궁금한 점이 있다면 편하게 연락 주세요.</p>
          </div>
          <div className="reveal reveal-delay-2" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {[
              { href: 'mailto:jpsm0305@naver.com', label: 'jpsm0305@naver.com', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg> },
              { href: 'tel:010-9397-3908', label: '010-9397-3908', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.69h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.09a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 17.5l.19-.58z" /></svg> },
              { href: 'https://github.com/Terra0305', label: 'github.com/Terra0305', target: '_blank', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" /></svg> },
            ].map((item, i) => (
              <a key={i} href={item.href} target={(item as any).target} rel={(item as any).target ? 'noopener noreferrer' : undefined} className="contact-link" style={{ fontSize: '0.95rem' }}>
                {item.icon}{item.label}
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
    <footer style={{ padding: '1.75rem clamp(1.5rem,5vw,4rem)', borderTop: '1px solid var(--gray-line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
      <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.72rem', color: 'var(--gray-text)' }}>© 2026 Park Seongmin. Backend Developer.</span>
      <span style={{ width: '1.2rem', height: '1.2rem', borderBottom: '1.5px solid var(--gray-line)', borderRight: '1.5px solid var(--gray-line)', display: 'block' }} />
    </footer>
  );
}

// ─── Shared ───────────────────────────────────────────────────────────────────

function SectionHeader({ num, label }: { num: string; label: string }) {
  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: 'clamp(2.5rem,5vh,4rem)' }}>
      <span className="section-number reveal">{num}</span>
      <div className="divider-line reveal" style={{ flex: 1 }} />
      <span className="reveal" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.72rem', color: 'var(--gray-text)', letterSpacing: '0.1em' }}>{label}</span>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  useScrollReveal();
  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <AwardsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
