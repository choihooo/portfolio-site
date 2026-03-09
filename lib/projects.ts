export interface Project {
  id: string;
  name: string;
  desc: string;
  longDesc: string;
  tags: string[];
  period: string;
  teamSize: string;
  role: string;
  features: string[];
  liveUrl?: string;
  githubUrl?: string;
}

const projects: Project[] = [
  {
    id: '001',
    name: 'Project Alpha',
    desc: '실시간 협업 플랫폼 — WebSocket 기반 팀 워크스페이스',
    longDesc: 'Project Alpha는 원격 팀을 위한 실시간 협업 플랫폼입니다. WebSocket을 사용하여 실시간으로 동기화되는 작업 공간을 제공하며, 문서 공동 작성, 화면 공유, 실시간 채팅 등의 기능을 포함합니다. 사용자 경험을 최우선으로 고려하여 직관적인 인터페이스를 설계했으며, 최적화된 상태 관리로 빠른 성능을 구현했습니다.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'WebSocket', 'Redis'],
    period: '2024.01 - 2024.06',
    teamSize: '4명',
    role: '프론트엔드 리드',
    features: [
      '실시간 문서 공동 작성 기능으로 원격 팀의 생산성 향상',
      '화면 공유 및 오디오/비디오 채팅 통합',
      'WebSocket을 활용한 초저지연성 실시간 동기화',
      '세분화된 권한 관리 시스템으로 보안 강화',
      '반응형 디자인으로 모든 디바이스에서 최적화된 경험 제공',
    ],
    liveUrl: 'https://example.com/project-alpha',
    githubUrl: 'https://github.com/username/project-alpha',
  },
  {
    id: '002',
    name: 'Data Flow',
    desc: '대시보드 분석 플랫폼 — 데이터 시각화 및 리포팅',
    longDesc: 'Data Flow는 대규모 데이터를 시각화하고 분석할 수 있는 대시보드 플랫폼입니다. 다양한 데이터 소스를 통합하고 실시간으로 분석 결과를 제공합니다. 인터랙티브한 차트와 그래프를 통해 데이터를 직관적으로 이해할 수 있으며, 자동화된 리포팅 기능으로 업무 효율성을 높였습니다.',
    tags: ['Python', 'TypeScript', 'Docker', 'Redis', 'PostgreSQL'],
    period: '2023.06 - 2023.12',
    teamSize: '3명',
    role: '풀스택 개발자',
    features: [
      '실시간 데이터 스트리밍 및 인터랙티브 시각화',
      '다양한 데이터 소스 통합 (REST API, Database)',
      '커스터마이징 가능한 대시보드 위젯 시스템',
      '자동화된 PDF/Excel 리포트 생성',
      '역할 기반 접근 제어로 데이터 보안 확보',
    ],
    liveUrl: 'https://example.com/data-flow',
    githubUrl: 'https://github.com/username/data-flow',
  },
  {
    id: '003',
    name: 'Open Source CLI',
    desc: '개발자 생산성 도구 — 터미널 워크플로우 자동화',
    longDesc: '개발자의 일상적인 작업을 자동화하는 CLI 도구입니다. 프로젝트 설정, 코드 생성, Git 작업 등 반복적인 작업을 자동화하여 개발 생산성을 높입니다. 오픈소스로 개발되어 전 세계 개발자들에게 다운로드되고 있으며, 활발한 커뮤니티 기여를 받고 있습니다.',
    tags: ['Node.js', 'TypeScript', 'CLI', 'Oclif', 'Jest'],
    period: '2023.01 - 진행중',
    teamSize: '1명',
    role: '솔로 개발자 & 메인테이너',
    features: [
      '인터랙티브한 CLI 인터페이스로 사용성 개선',
      '플러그인 시스템으로 확장 가능한 아키텍처',
      '프로젝트 템플릿 기능으로 빠른 시작 지원',
      'Git 워크플로우 자동화',
      '1,000+ 월간 다운로드 및 활발한 커뮤니티',
    ],
    githubUrl: 'https://github.com/username/open-source-cli',
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((project) => project.id === id);
}

export function getAllProjects(): Project[] {
  return projects;
}

export function getProjectIds(): string[] {
  return projects.map((project) => project.id);
}
