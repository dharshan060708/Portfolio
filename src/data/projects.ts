export interface Project {
  id: string;
  number: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  problem: string;
  solution: string;
  architecture: string;
  keyFeatures: string[];
  techStack: string[];
  challenges: string[];
  githubUrl: string;
  liveUrl?: string;
  category: 'ai' | 'automation' | 'fullstack' | 'desktop' | 'local-ai';
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: 'meridian',
    number: '01',
    name: 'MERIDIAN',
    tagline: 'AI Healthcare Platform with RAG',
    description: 'Enterprise-style AI healthcare assistant using RAG, PubMed clinical citations, symptom-based triage risk scoring, and specialist recommendations.',
    longDescription: 'Meridian is a production-grade AI healthcare platform combining Retrieval-Augmented Generation with clinical document knowledge bases to provide verifiable medical guidance. It features an automated triage engine that analyzes symptoms and outputs risk assessments (Low/Moderate/High) alongside recommended specialist domains.',
    problem: 'Generic AI models frequently hallucinate medical guidance without verifiable clinical citations or transparent risk triage, posing patient safety risks.',
    solution: 'Engineered a specialized RAG pipeline querying indexed PubMed clinical literature with ChromaDB and Llama 3, generating citation-backed responses and automated triage assessments.',
    architecture: 'FastAPI async backend • ChromaDB vector database • Llama 3 local LLM runtime • Next.js 14 responsive web frontend • Redis caching layer • Docker containerization.',
    keyFeatures: [
      'Clinical RAG pipeline with PubMed source grounding',
      'Automated symptom extraction and multi-level risk scoring',
      'Specialist recommendation and referral routing',
      'PDF clinical summary report generation',
      'JWT token authentication with rate-limiting middleware',
      'Comprehensive test suite across backend and frontend',
    ],
    techStack: ['FastAPI', 'Next.js 14', 'Python 3.11', 'TypeScript', 'ChromaDB', 'Docker', 'PostgreSQL', 'Tailwind CSS'],
    challenges: [
      'Eliminating LLM hallucinations by enforcing strict similarity distance thresholds on vector retrieval.',
      'Achieving sub-second triage scoring on local CPU inference using quantized GGUF weights.',
    ],
    githubUrl: 'https://github.com/dharshan060708',
    category: 'ai',
    featured: true,
  },
  {
    id: 'devil-in',
    number: '02',
    name: 'DEVIL-IN AI',
    tagline: 'Portable Local LLM Launcher',
    description: 'Zero-dependency Windows runtime for running quantized GGUF language models completely offline with an integrated cyber web interface.',
    longDescription: 'Devil-In AI is a portable, plug-and-run local AI launcher for Windows. It bundles an optimized llama.cpp inference engine, an integrated web server, and an interactive chat UI into a self-contained USB package requiring zero Python installations or Docker daemons.',
    problem: 'Running local AI typically requires complex Python virtual environments, CUDA toolkits, or Docker setups that are difficult to deploy on standard consumer or air-gapped machines.',
    solution: 'Packaged compiled C++ inference binaries with automated batch initialization, hardware AVX2 auto-detection, and a lightweight web interface for instant offline model loading.',
    architecture: 'llama.cpp C++ inference engine • Custom Windows batch bootstrapper • Standalone HTTP server on port 8080 • Responsive local web chat interface.',
    keyFeatures: [
      'Zero Python, CUDA, or Docker dependencies required',
      'Plug-and-play USB deployment across any drive letter',
      'Auto-detects any .gguf model placed in the models directory',
      'Custom dark luxury red & gold web interface',
      'Optional local network (LAN) sharing for multi-device access',
      'CPU AVX2 and optional GPU acceleration modes',
    ],
    techStack: ['llama.cpp', 'GGUF', 'C++', 'Windows Batch', 'HTML5/JS', 'Offline AI'],
    challenges: [
      'Ensuring reliable path resolution and memory mapping across dynamic Windows USB drive letters.',
      'Optimizing 4-bit and 5-bit GGUF quantization parameters for high tokens/sec on standard CPUs.',
    ],
    githubUrl: 'https://github.com/dharshan060708/Devil-In-AI',
    category: 'local-ai',
    featured: true,
  },
  {
    id: 'ai-lead-mgmt',
    number: '03',
    name: 'AI LEAD MANAGEMENT SYSTEM',
    tagline: 'Automated Webhook & Triage Pipeline',
    description: 'An automated lead intake and CRM workflow that captures webhooks, validates payloads, uses a local LLM for intent classification, and triggers multi-channel routing.',
    longDescription: 'An end-to-end automation architecture connecting web form webhooks to local AI models via n8n. The system parses inbound lead queries, determines qualification score and urgency using Ollama, and automatically updates CRM boards, Google Sheets databases, and sends instant admin Telegram alerts.',
    problem: 'Inbound inquiries often sit unclassified for hours, leading to slow response times and manual data entry errors between forms and CRMs.',
    solution: 'Built an event-driven n8n workflow pipeline with local LLM classification that triages incoming leads in seconds with zero manual intervention.',
    architecture: 'n8n workflow orchestrator • Webhook ingestion endpoints • Ollama Llama 3 classification node • PostgreSQL database • Telegram API alerts • Trello CRM integration.',
    keyFeatures: [
      'Sub-second webhook ingestion and schema validation',
      'Local LLM intent and budget qualification scoring',
      'Automated multi-channel dispatch (Email, CRM, Sheets)',
      'Instant admin Telegram and push notifications',
      'Zero-cost local inference with zero third-party API dependencies',
    ],
    techStack: ['n8n', 'Ollama', 'Python', 'Webhooks', 'PostgreSQL', 'Trello API', 'Docker'],
    challenges: [
      'Designing robust error fallback logic when incoming payload schemas are incomplete or malformed.',
      'Constructing structured JSON-only prompt constraints for reliable deterministic LLM output parsing.',
    ],
    githubUrl: 'https://github.com/dharshan060708',
    category: 'automation',
    featured: true,
  },
  {
    id: 'stocksync',
    number: '04',
    name: 'STOCKSYNC',
    tagline: 'Real-Time Inventory Management',
    description: 'High-performance inventory and supply chain tracking system with live stock counters, reorder threshold alerts, and audit logging.',
    longDescription: 'StockSync is a full-stack inventory management application engineered for retail and warehouse operations. It tracks real-time SKU movements, logs inventory adjustments, generates low-stock warning triggers, and exports analytics reports.',
    problem: 'Manual inventory bookkeeping leads to discrepancy errors, stock-outs, and delayed purchase orders.',
    solution: 'Developed an automated inventory tracking platform with relational PostgreSQL schema, atomic stock update transactions, and real-time dashboard visualization.',
    architecture: 'Node.js & Express REST API • PostgreSQL database with indexing • Next.js dashboard UI • Redis session cache.',
    keyFeatures: [
      'Real-time SKU catalog and stock level monitoring',
      'Automated low-stock threshold triggers and reorder suggestions',
      'Transaction-safe inventory movement logging',
      'CSV / PDF report generation for audit compliance',
    ],
    techStack: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Tailwind CSS'],
    challenges: [
      'Handling concurrent inventory updates safely using database row locking and atomic operations.',
    ],
    githubUrl: 'https://github.com/dharshan060708',
    category: 'fullstack',
    featured: true,
  },
  {
    id: 'devconnect',
    number: '05',
    name: 'DEVCONNECT',
    tagline: 'Developer Community Platform',
    description: 'A developer social network for sharing code snippets, discussing technical architectures, and collaborating on open-source projects.',
    longDescription: 'DevConnect provides a dedicated space for software developers to publish syntax-highlighted code snippets, ask architectural questions, discover trending repositories, and build developer profiles.',
    problem: 'Developers often lack focused community platforms that combine code sharing, structured technical feedback, and portfolio attribution in one place.',
    solution: 'Built a responsive full-stack platform featuring syntax highlighting, markdown discussions, profile badges, and tag-based discovery.',
    architecture: 'React frontend • Node.js / Express backend • MongoDB database • JWT authentication.',
    keyFeatures: [
      'Syntax-highlighted code snippet publishing and sharing',
      'Technical discussion threads with nested commenting',
      'Developer profile showcases with verified repository links',
      'Tag-based technology filtering and search indexing',
    ],
    techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS'],
    challenges: [
      'Building performant client-side syntax highlighting for 20+ programming languages without layout shifts.',
    ],
    githubUrl: 'https://github.com/dharshan060708',
    category: 'fullstack',
    featured: true,
  },
  {
    id: 'portfolio-3d',
    number: '06',
    name: 'PORTFOLIO 3D',
    tagline: 'Realistic WebGL Developer Portfolio',
    description: 'Photorealistic 3D developer portfolio featuring physical PBR workstation, studio lighting, and smooth responsive design.',
    longDescription: 'A high-performance personal developer portfolio combining realistic 3D WebGL scenes rendered with React Three Fiber, physically based materials, studio lighting, and fluid responsive design across all viewports.',
    problem: 'Most 3D developer portfolios rely on excessive neon, starfields, or slow framerates that distract from engineering credibility and drain device battery.',
    solution: 'Engineered a restrained, dark luxury 3D workstation with viewport-aware render loops, PBR materials, and 60 FPS performance.',
    architecture: 'React 18 • Three.js • React Three Fiber • Tailwind CSS • Framer Motion • Vite.',
    keyFeatures: [
      'Realistic 3D developer workstation with PBR materials and studio lighting',
      'Viewport-aware frameloop pausing when scrolled offscreen',
      'Fluid typography (clamp) and safe-area notch support',
      'Verified LeetCode, GitHub, and HackerRank integration',
    ],
    techStack: ['React', 'Three.js', 'React Three Fiber', 'TypeScript', 'Tailwind CSS', 'Vite'],
    challenges: [
      'Achieving physical realism and grounded contact shadows without sacrificing 60 FPS mobile performance.',
    ],
    githubUrl: 'https://github.com/dharshan060708/Portfolio',
    category: 'fullstack',
    featured: true,
  },
];