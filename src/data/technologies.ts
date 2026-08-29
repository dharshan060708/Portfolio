export interface TechnologyItem {
  name: string;
  category: 'languages' | 'frontend' | 'backend' | 'ai' | 'automation' | 'tools';
  color: string;
}

export const technologies: TechnologyItem[] = [
  { name: 'Python', category: 'languages', color: '#3776AB' },
  { name: 'JavaScript', category: 'languages', color: '#F7DF1E' },
  { name: 'TypeScript', category: 'languages', color: '#3178C6' },
  { name: 'SQL', category: 'languages', color: '#00758F' },
  { name: 'React', category: 'frontend', color: '#61DAFB' },
  { name: 'Next.js', category: 'frontend', color: '#FFFFFF' },
  { name: 'Tailwind CSS', category: 'frontend', color: '#38BDF8' },
  { name: 'Three.js', category: 'frontend', color: '#F2C45E' },
  { name: 'FastAPI', category: 'backend', color: '#009688' },
  { name: 'Node.js', category: 'backend', color: '#539E43' },
  { name: 'PostgreSQL', category: 'backend', color: '#336791' },
  { name: 'MongoDB', category: 'backend', color: '#47A248' },
  { name: 'RAG Architecture', category: 'ai', color: '#1683FF' },
  { name: 'Ollama', category: 'ai', color: '#1683FF' },
  { name: 'llama.cpp', category: 'ai', color: '#F2C45E' },
  { name: 'ChromaDB', category: 'ai', color: '#7C3AED' },
  { name: 'n8n', category: 'automation', color: '#D6A63A' },
  { name: 'UiPath', category: 'automation', color: '#FA4616' },
  { name: 'Webhooks', category: 'automation', color: '#27C93F' },
  { name: 'Git & GitHub', category: 'tools', color: '#F05032' },
  { name: 'Docker', category: 'tools', color: '#2496ED' },
  { name: 'Power BI', category: 'tools', color: '#F2C811' },
];
