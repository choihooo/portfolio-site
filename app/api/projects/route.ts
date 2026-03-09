import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const contentDir = path.join(process.cwd(), 'content/projects');
    const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.mdx'));

    const projects = files.map((fileName) => {
      const filePath = path.join(contentDir, fileName);
      const content = fs.readFileSync(filePath, 'utf-8');

      // Parse frontmatter
      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
      const frontmatter: any = {};

      if (frontmatterMatch) {
        const lines = frontmatterMatch[1].split('\n');
        lines.forEach((line) => {
          const match = line.match(/^(\w+):\s*(.+)$/);
          if (match) {
            const [, key, value] = match;
            // Remove quotes from value
            const cleanValue = value.replace(/^["']|["']$/g, '');

            if (key === 'tags') {
              // Split by comma and trim each tag
              frontmatter[key] = cleanValue.split(',').map((t: string) => t.trim());
            } else {
              frontmatter[key] = cleanValue;
            }
          }
        });
      }

      return {
        slug: fileName.replace('.mdx', ''),
        frontmatter,
      };
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error loading projects:', error);
    return NextResponse.json({ error: 'Failed to load projects' }, { status: 500 });
  }
}
