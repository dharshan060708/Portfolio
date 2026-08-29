export interface SkillGroup {
  id: string;
  category: string;
  description: string;
  color: string;
  skills: string[];
}

export const skillCategories: SkillGroup[] = [
  {
    id: 'languages',
    category: 'Languages',
    description: 'Core programming and query languages',
    color: '#D6A63A',
    skills: ['Python', 'JavaScript', 'TypeScript', 'SQL'],
  },
  {
    id: 'frontend',
    category: 'Frontend',
    description: 'Modern component-driven web frameworks and UI',
    color: '#61DAFB',
    skills: ['React', 'Next.js 14', 'Tailwind CSS', 'Three.js / R3F', 'HTML5', 'CSS3'],
  },
  {
    id: 'backend',
    category: 'Backend & Databases',
    description: 'High-performance APIs, servers, and data persistence',
    color: '#009688',
    skills: ['FastAPI', 'Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Redis'],
  },
  {
    id: 'ai',
    category: 'AI & Local LLMs',
    description: 'RAG systems, sovereign models, and vector stores',
    color: '#1683FF',
    skills: ['RAG Architecture', 'Ollama', 'llama.cpp (GGUF)', 'ChromaDB', 'Prompt Engineering'],
  },
  {
    id: 'automation',
    category: 'Automation & RPA',
    description: 'Event-driven workflows, webhooks, and process automation',
    color: '#F2C45E',
    skills: ['n8n Workflows', 'Webhooks', 'UiPath RPA', 'Task Automation', 'Browser Automation'],
  },
  {
    id: 'tools',
    category: 'Tools & DevOps',
    description: 'Development environment, version control, and analytics',
    color: '#A7A7A7',
    skills: ['Git & GitHub', 'Docker', 'Power BI', 'Linux & Bash', 'Postman', 'VS Code'],
  },
];