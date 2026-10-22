// 강의 공통 정보와 PART 목록 — 사이트의 유일한 데이터 소스.
// 새 PART 추가: session_N.html 작성 → 아래 SESSIONS에 항목 추가.
// prompts 목록은 각 session 페이지의 <div class="prompt" id=".." data-label=".."> 와 일치해야 합니다.

const COURSE = {
  title: "생성형 AI 기반 방카슈랑스 영업관리 실무 혁신",
  subtitle: "금융 영업관리자를 위한 생성형 AI 실전 활용법",
  org: "삼성생명",
  date: "",
  orgs: "한국강사교육협회 · 삼성생명",
  instructor: "김진희 대표",
};

const SESSIONS = [
  {
    id: 1,
    tool: "AI 이해",
    title: "생성형 AI 이해와 업무 적용",
    desc: "검색이 아닌 ‘생성·협업’ 도구로서의 AI, 삼성의 AX 전환, 방카슈랑스 영업관리 업무에서 AI와 사람의 역할을 정리합니다.",
    href: "session_1.html",
    anchors: [
      { href: "#openchat", label: "실습 오픈채팅" },
      { href: "#what", label: "생성형 AI란" },
      { href: "#bancassurance", label: "영업관리와 AI" },
      { href: "#role", label: "AI vs 사람" },
      { href: "#cases", label: "활용 사례" },
      { href: "#compare", label: "AI 3대장 비교" },
    ],
    prompts: [],
  },
  {
    id: 2,
    tool: "Gemini · 메타프롬프트 · Canvas",
    title: "효과적인 프롬프트 설계",
    desc: "역할·목표·상황·결과 형식의 4요소, AI가 먼저 질문하게 만드는 메타프롬프트, Canvas 바이브코딩으로 ‘고객 유형별 화법 카드’ 웹앱까지 만듭니다.",
    href: "session_2.html",
    anchors: [
      { href: "#why", label: "왜 프롬프트인가" },
      { href: "#four", label: "좋은 프롬프트 4가지" },
      { href: "#meta", label: "메타프롬프트" },
      { href: "#canvas-app", label: "화법 카드 웹앱" },
      { href: "#meta-practice", label: "메타프롬프트 실습" },
      { href: "#apply", label: "업무에 적용하기" },
      { href: "#mywork", label: "내 업무 맡겨보기" },
    ],
    prompts: [
      { id: "p2-01", label: "단순 질문 — 연금보험 설명 (비교용)", example: true },
      { id: "p2-02", label: "업무지시형 질문 — 60대 고객 연금보험 설명" },
      { id: "p2-03", label: "좋은 프롬프트 4요소 예시 — 은행 직원 상품교육 자료" },
      { id: "p2-04", label: "가장 쉬운 메타프롬프트 — 기본형 (방카 BM 영업지원 전략 수립)" },
      { id: "p2-05", label: "Canvas 바이브코딩 1차 — 고객 유형별 화법 카드 웹앱" },
      { id: "p2-06", label: "업그레이드 ① 사용성 — 스와이프 넘기기" },
      { id: "p2-07", label: "업그레이드 ② 편의성 — 화법 복사 버튼" },
      { id: "p2-08", label: "업그레이드 ③ 가독성 — 카드 뒤집기" },
      { id: "p2-09", label: "업그레이드 ④ 실무 반영 — 고객 유형 추가 (자영업자)" },
      { id: "p2-10", label: "업그레이드 ⑤ 연습 — 롤플레이 연습 모드" },
      { id: "p2-11", label: "TIP — 되돌리기" },
      { id: "p2-12", label: "TIP — 고쳐 달라고 하기" },
      { id: "p2-13", label: "메타프롬프트 실습 — 영업점 직원용 상품교육 자료" },
      { id: "p2-14", label: "완성된 프롬프트 — 1장 요약 치트키 교육자료 (결과 예시)", example: true },
      { id: "p2-15", label: "메타프롬프트 객관식형 — 영업현황 분석" },
      { id: "p2-16", label: "메타프롬프트 객관식형 — 영업점 안내문 만들기" },
      { id: "p2-17", label: "내 업무 하나를 AI에게 맡겨보기" },
    ],
  },
  {
    id: 3,
    tool: "Gemini Canvas · Deep Research",
    title: "AI 기반 영업자료 분석 및 작성 실무",
    desc: "상품설명서를 업로드해 분석하고, Canvas로 1페이지 교육자료를 만들고, Deep Research로 경쟁사 연금상품을 비교 조사합니다.",
    href: "session_3.html",
    anchors: [
      { href: "#analysis", label: "영업자료 분석" },
      { href: "#canvas", label: "Canvas 교육자료" },
      { href: "#deep", label: "Deep Research" },
      { href: "#deep-practice", label: "경쟁사 비교 실습" },
    ],
    prompts: [
      { id: "p3-01", label: "영업자료 분석 — 상품설명서 핵심 정리" },
      { id: "p3-02", label: "Canvas — 은행 직원 교육용 1페이지 자료 (A4 프린트 버튼)" },
      { id: "p3-03", label: "Deep Research — 방카슈랑스 연금상품 경쟁사 비교" },
    ],
  },
  {
    id: 4,
    tool: "ChatGPT 프로젝트 · 이미지",
    title: "영업관리·커뮤니케이션 효율화",
    desc: "ChatGPT로 안내문·회의록·업무보고를 간소화하고, 업무별 프로젝트 비서와 교육용 인포그래픽·포스터를 만들며 보안·윤리 원칙을 정리합니다.",
    href: "session_4.html",
    anchors: [
      { href: "#chatgpt", label: "ChatGPT 설정·보안" },
      { href: "#comm", label: "관리·보고·소통" },
      { href: "#project", label: "프로젝트 비서" },
      { href: "#project-set", label: "프로젝트 지침 6종" },
      { href: "#image", label: "이미지 활용" },
      { href: "#security", label: "보안·윤리" },
    ],
    prompts: [
      { id: "p4-01", label: "영업점 안내문 작성 — 상품교육 안내 (모바일 250자)" },
      { id: "p4-02", label: "회의내용 및 후속조치 정리" },
      { id: "p4-03", label: "주간 업무보고 작성" },
      { id: "p4-04", label: "같은 내용, 목적에 따라 바꿔쓰기 (카톡·이메일·팀장보고·공지문)" },
      { id: "p4-05", label: "프로젝트 이름 — 상품교육 및 상담지원 비서" },
      { id: "p4-06", label: "프로젝트 지침 ① 상품교육·상담지원 비서" },
      { id: "p4-07", label: "프로젝트 질문하기 — 60대 은퇴 고객 상담 전 확인질문" },
      { id: "p4-08", label: "프로젝트 지침 ② 상담지원·FAQ 비서" },
      { id: "p4-09", label: "프로젝트 지침 ③ 영업실적 관리 비서" },
      { id: "p4-10", label: "프로젝트 지침 ④ 영업점 커뮤니케이션 비서" },
      { id: "p4-11", label: "프로젝트 지침 ⑤ 회의·보고 비서" },
      { id: "p4-12", label: "프로젝트 지침 ⑥ 상품 설명·비교 비서" },
      { id: "p4-13", label: "인포그래픽 (텍스트→이미지) — 연금상담 전 확인해야 할 5가지" },
      { id: "p4-14", label: "인포그래픽 (파일·이미지→이미지) — 상품 Quick Guide" },
      { id: "p4-15", label: "포스터·배너 — 방카슈랑스 연금상품 교육 포스터" },
      { id: "p4-16", label: "습관처럼 붙이는 한 줄 — 추측 금지·확인 필요 표시" },
    ],
  },
];

// 실습 파일 — 첫 화면 '실습 파일' 칸과 PART 3 영업자료 분석 아래에 함께 표시됩니다.
// 파일은 files/ 폴더에 두고, 받을 때는 name(한글 파일명)으로 저장됩니다.
const PRACTICE_FILES = {
  part: 3,
  anchor: "session_3.html#practice-files",
  sets: [
    { no: 1, title: "실습 · 영업자료 분석 → Canvas 교육자료", files: [
      { name: "삼성 행복플러스 연금보험(2601)(적립형, 무배당).pdf", href: "files/samsung_happyplus_annuity_2601.pdf", type: "상품 약관 · 246쪽 · 2.4MB" },
    ]},
  ],
};
