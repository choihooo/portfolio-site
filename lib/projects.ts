export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  tags: string[];
  period?: string;
  teamSize?: string;
  role?: string;
  liveUrl?: string;
  githubUrl?: string;
  order?: number;
  mdxFile?: string;
}

const projects: Project[] = [
  {
    id: '001',
    slug: 'project-alpha',
    title: 'Project Alpha',
    description: '실시간 협업 플랫폼 — WebSocket 기반 팀 워크스페이스',
    tags: ['React', 'Node.js', 'PostgreSQL', 'WebSocket'],
    period: '2024.01 - 2024.06',
    teamSize: '4명',
    role: '프론트엔드 리드',
    liveUrl: 'https://example.com/project-alpha',
    githubUrl: 'https://github.com/username/project-alpha',
    order: 1,
    mdxFile: 'project-alpha.mdx',
  },
  {
    id: '002',
    slug: 'data-flow',
    title: 'Data Flow',
    description: '대시보드 분석 플랫폼 — 데이터 시각화 및 리포팅',
    tags: ['Python', 'TypeScript', 'Docker', 'Redis'],
    period: '2023.06 - 2023.12',
    teamSize: '3명',
    role: '풀스택 개발자',
    liveUrl: 'https://example.com/data-flow',
    githubUrl: 'https://github.com/username/data-flow',
    order: 2,
  },
  {
    id: '003',
    slug: 'open-source-cli',
    title: 'Open Source CLI',
    description: '개발자 생산성 도구 — 터미널 워크플로우 자동화',
    tags: ['Node.js', 'CLI', 'Open Source'],
    period: '2023.01 - 진행중',
    teamSize: '1명',
    role: '솔로 개발자 & 메인테이너',
    githubUrl: 'https://github.com/username/open-source-cli',
    order: 3,
  },
];

export function getProjects(): Project[] {
  return projects.sort((a, b) => (a.order || 0) - (b.order || 0));
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
