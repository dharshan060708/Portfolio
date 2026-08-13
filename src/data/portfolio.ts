export const profile = {
  name: "Dharshan Velumani",
  headline: "Aspiring Software Engineer",
  subtitle: "AI & Automation Developer",
  title: "Aspiring Software Engineer | AI & Automation Developer",
  description: "I build practical software, backend applications, AI-powered automation systems, and developer tools using Java, Python, SQL, and modern automation technologies.",
  location: "Coimbatore, India",
  email: "dharshanvelumani@gmail.com",
  links: {
    github: "https://github.com/DharshanVelumani",
    linkedin: "https://linkedin.com/in/Dharshan-V",
    leetcode: "https://leetcode.com/u/efImqpWfmd/",
    hackerrank: "https://www.hackerrank.com/profile/dharshanvelumani",
  },
  education: {
    degree: "Bachelor of Computer Applications (BCA)",
    college: "KG College of Arts and Science",
    graduation: "Expected 2027",
    cgpa: "8.0 / 10",
  },
  status: "OPEN TO SOFTWARE ENGINEERING OPPORTUNITIES",
  heroTech: ["Java", "Python", "SQL", "Backend Development", "AI Automation"],
}

export const about = {
  heading: "Engineering Practical Software",
  description: [
    "I am Dharshan Velumani, a final-year Bachelor of Computer Applications (BCA) student at KG College of Arts and Science. I focus on core software engineering principles, building dependable backend logic, and designing intelligent automation workflows.",
    "My foundation is built on Java, Python, SQL, Object-Oriented Programming, and Data Structures. Alongside core software development, I build local LLM tooling, AI-assisted business pipelines, and workflow automation systems that solve real, tangible problems.",
  ],
  highlights: [
    { title: "Core Fundamentals", desc: "Solid grounding in Java, Python, SQL, OOP, and data structures." },
    { title: "AI & Local LLMs", desc: "Hands-on experience running offline GGUF inference and building local AI workflows." },
    { title: "Workflow Automation", desc: "Practical experience designing multi-service automation pipelines with n8n and UiPath." },
    { title: "Project-Driven", desc: "Focused on end-to-end execution from architecture design to functional deployment." },
  ],
  profileInfo: [
    { label: "Degree", value: "BCA (Computer Applications)" },
    { label: "Institution", value: "KG College of Arts and Science" },
    { label: "Graduation", value: "Expected 2027" },
    { label: "Academic Record", value: "CGPA: 8.0 / 10" },
    { label: "Primary Focus", value: "Software Engineering, Backend Development, AI & Automation" },
  ],
}

export const whatIBuild = [
  {
    id: "backend",
    title: "Backend Applications",
    description: "Developing structured server-side logic, RESTful APIs, and database-driven solutions with Python, Flask, and relational SQL databases.",
    tech: ["Python", "Flask", "REST APIs", "SQL", "Database Design"],
    icon: "Server",
  },
  {
    id: "ai-automation",
    title: "AI Automation",
    description: "Designing end-to-end intelligent pipelines using n8n, Ollama, and local LLMs to automate classification, data enrichment, and multi-app routing.",
    tech: ["n8n", "Ollama", "Local LLMs", "Webhooks", "API Integration"],
    icon: "Brain",
  },
  {
    id: "developer-tools",
    title: "Developer Tools",
    description: "Building lightweight, portable utilities and local AI launchers with llama.cpp and CLI tooling to optimize developer workflows.",
    tech: ["llama.cpp", "GGUF Models", "CLI Tools", "Shell / Batch", "Local AI"],
    icon: "Code",
  },
  {
    id: "business-automation",
    title: "Business Automation",
    description: "Creating robotic process automation (RPA) workflows and browser bots with UiPath to eliminate repetitive manual operations and data entry.",
    tech: ["UiPath Studio", "Browser Automation", "Form Processing", "RPA"],
    icon: "Workflow",
  },
]

export interface ProjectItem {
  id: string
  name: string
  tagline: string
  category: string
  summary: string
  problem: string
  solution: string
  impact: string
  tech: string[]
  features: string[]
  architecture: string
  links: {
    github?: string
    demo?: string
    video?: string
  }
  featured: boolean
  tags: string[]
  achievement?: string
  caseStudy?: {
    overview: string
    techDecisions: string
    challenges: string
    results: string
    futureRoadmap: string
  }
}

export const projects: ProjectItem[] = [
  {
    id: "devil-in-ai",
    name: "Devil-In AI",
    tagline: "Portable Local LLM Platform for Windows",
    category: "Developer Tool / Local AI",
    summary: "A portable, self-contained local LLM launcher for Windows using llama.cpp that enables running GGUF models completely offline without requiring an external Python or Docker runtime.",
    problem: "Running local LLM models on Windows typically requires complex Python virtual environments, heavy Docker installations, or dependency conflicts that create significant barriers for developers.",
    solution: "Architected a self-contained, portable Windows launcher built on top of llama.cpp binaries that boots an offline HTTP inference server and serves a local web UI without external runtime requirements.",
    impact: "Provides portable offline AI execution directly from any directory or USB drive, making private LLM inference accessible with minimal setup overhead.",
    tech: ["llama.cpp", "GGUF Models", "Local AI Inference", "Batch Scripting", "JavaScript", "HTML5", "CSS3"],
    features: [
      "Offline execution without external Python or Docker runtimes",
      "Native Windows portable binary orchestration using llama.cpp",
      "Automated binary fetching and model environment initialization",
      "LAN-shareable web UI for local and network model interaction",
      "Support for standardized quantization levels (GGUF Q4/Q8/etc.)",
      "Resource-conscious memory management for local CPU/GPU inference",
    ],
    architecture: `[User Interaction]
       ↓ (HTTP / Web Browser)
[Local Web Interface (HTML/JS)]
       ↓ (REST Endpoints)
[llama-server Binary (llama.cpp)]
       ↓ (Quantized Tensor Computation)
[GGUF Model Weights (Local Disk)]
       ↓ (Offline Token Generation)
[Streamed Local Response]`,
    links: {
      github: "https://github.com/DharshanVelumani/Devil-In-AI",
    },
    featured: true,
    tags: ["AI", "Developer Tools", "Local AI"],
    caseStudy: {
      overview: "Devil-In AI is a developer utility designed to make running local LLMs on Windows as simple as double-clicking an executable script, eliminating standard friction with Python package conflicts and container daemons.",
      techDecisions: "Selected llama.cpp as the core inference engine for its C/C++ execution efficiency and multi-threaded CPU support. Built a lightweight local web dashboard for responsive interaction without heavy desktop GUI runtimes.",
      challenges: "Handling path resolution across portable environments, managing background process lifecycles on Windows without native daemons, and ensuring graceful process termination.",
      results: "Achieved a standalone local AI launcher functioning reliably across standard Windows 10/11 environments for offline LLM interaction.",
      futureRoadmap: "Multi-model switching from the web UI, automated GGUF quantization toolchain integration, and local document RAG.",
    },
  },
  {
    id: "ai-lead-management",
    name: "AI Lead Management System Pro",
    tagline: "End-to-End Autonomous AI Lead Intake & Routing Pipeline",
    category: "AI Automation / Backend",
    summary: "An automated lead intake pipeline that validates incoming webhook submissions, classifies intent and scores lead quality using a local Llama 3 LLM via Ollama, and automatically synchronizes records across CRM systems.",
    problem: "Manual lead processing causes intake delays, inconsistent scoring criteria, and tedious multi-platform data entry across sales sheets, email notifications, and task boards.",
    solution: "Engineered an automated n8n workflow pipeline that ingests webhook payloads, triggers local Llama 3 models via Ollama for zero-cloud-cost classification and scoring, and broadcasts structured data to Google Sheets, Gmail, and Trello.",
    impact: "Eliminates manual lead qualification lag, automates multi-service routing, and structures lead intake across connected business platforms.",
    tech: ["n8n", "Ollama", "Llama 3", "Webhooks", "Google Sheets API", "Gmail API", "Trello API", "JSON"],
    features: [
      "Instant webhook data ingestion and schema validation",
      "Local AI classification and intent extraction via Ollama",
      "Dynamic lead scoring evaluation based on business criteria",
      "Automated multi-destination routing (Google Sheets, Gmail, Trello)",
      "Built-in fallback handling for schema mismatches or offline states",
    ],
    architecture: `[Inbound Lead Webhook]
          ↓
[Payload Validation & Schema Check]
          ↓
[Local Ollama Server (Llama 3 Inference)]
          ↓
[JSON Parsing & Score Computation]
          ↓
  ┌───────┼────────┐
  ↓       ↓        ↓
[Sheets] [Gmail] [Trello]`,
    links: {
      github: "https://github.com/DharshanVelumani/AI-Lead-Management-System-Pro",
    },
    featured: false,
    tags: ["Automation", "AI", "Backend"],
  },
  {
    id: "web-form-automation",
    name: "Web Form Automation System",
    tagline: "RPA Browser Robot with Flask Monitoring Dashboard",
    category: "Business Automation / RPA",
    summary: "An automated browser-based form filling and data migration robot built with UiPath Studio, controlled and monitored via a custom Flask web dashboard.",
    problem: "Repetitive manual data entry across web forms and portal inputs consumes critical business hours and frequently introduces transcription errors.",
    solution: "Constructed an RPA workflow in UiPath to automate browser interactions, validate form fields, and paired it with a Flask management dashboard to trigger runs and view execution audit logs.",
    impact: "Awarded 2nd Runner Up at College-Level Project Competition 2024 for practical business automation and error-resilient execution.",
    tech: ["UiPath Studio", "Python", "Flask", "Chrome Automation", "RPA", "HTML/CSS"],
    features: [
      "Automated multi-field browser form navigation and submission",
      "Flask web dashboard for initiating automated jobs and viewing run status",
      "Dynamic selector configuration ensuring robust UI element identification",
      "Execution logging and error-recovery retry logic",
    ],
    architecture: `[Flask Management Dashboard]
          ↓ (Trigger Run / Parameters)
[UiPath Robotic Process Automation Engine]
          ↓ (DOM Selectors / Action Triggers)
[Target Chrome Web Application]
          ↓
[Verification & Run Audit Logs]`,
    links: {
      github: "https://github.com/DharshanVelumani/Web-Form-Automation-System",
    },
    featured: false,
    tags: ["Automation", "RPA", "Backend"],
    achievement: "🏆 2nd Runner Up — College-Level Project Competition, 2024",
  },
  {
    id: "pharmacy-management",
    name: "Inventory Pharmacy Management System",
    tagline: "Database-Driven Desktop Inventory & Billing Application",
    category: "Desktop Application / Database",
    summary: "A desktop pharmacy inventory management and billing system built using Visual Basic 6 with a relational Microsoft Access database backend via ADO.",
    problem: "Small-scale pharmacies require reliable offline stock tracking, transaction processing, expiry monitoring, and bill generation without cloud subscription dependencies.",
    solution: "Designed and built a modular desktop application handling stock intake, point-of-sale billing, supplier logs, and inventory updates through structured SQL queries and ADO database connections.",
    impact: "Delivers offline record management, calculation of bill totals, and automated inventory depletion upon checkout.",
    tech: ["Visual Basic 6", "ADO Data Access", "Microsoft Access", "SQL", "Desktop GUI"],
    features: [
      "Medicine stock tracking and low-inventory status indicators",
      "Point-of-sale customer billing system with auto-calculating totals",
      "Dedicated operational forms for supplier management and stock entries",
      "Structured relational schema with referential integrity constraints",
    ],
    architecture: `[VB6 Operational Forms & UI]
          ↓
[ADO Data Control & Query Engine]
          ↓ (SQL CRUD Operations)
[MS Access Relational Database (.mdb)]`,
    links: {
      github: "https://github.com/DharshanVelumani/Inventory-Pharmacy-Management-System",
    },
    featured: false,
    tags: ["Desktop", "SQL", "Database"],
  },
  {
    id: "vihaalaya",
    name: "Vihaalaya",
    tagline: "Generative AI Interface Prototype with Google Gemini API",
    category: "AI Application / Frontend",
    summary: "A modern, reactive generative AI interface built with TypeScript and Vite that integrates the Google Gemini API for fast, contextual user query processing.",
    problem: "Creating responsive web applications that interact with modern LLM APIs while providing clear state feedback and clean streaming UI layouts.",
    solution: "Implemented a TypeScript web frontend leveraging Vite for fast bundling, connecting to Google Gemini REST endpoints with structured prompt handling.",
    impact: "Demonstrated practical multi-turn AI chat interfaces and clean API integration workflows in modern TypeScript.",
    tech: ["TypeScript", "Vite", "Gemini API", "Tailwind CSS", "REST APIs"],
    features: [
      "Direct Google Gemini API integration for intelligent responses",
      "Type-safe component architecture with TypeScript",
      "Modern dark-mode UI with Tailwind CSS and responsive design",
    ],
    architecture: `[TypeScript / Vite Frontend]
          ↓ (Async Fetch / API Key)
[Google Gemini API]
          ↓ (Generated Response Stream)
[Reactive UI Display]`,
    links: {
      github: "https://github.com/DharshanVelumani/Vihaalaya",
    },
    featured: false,
    tags: ["AI", "Web", "Frontend"],
  },
]

export const skills = {
  programming: [
    { name: "Java", level: "Core", priority: true },
    { name: "Python", level: "Core", priority: true },
    { name: "SQL", level: "Core", priority: true },
    { name: "JavaScript", level: "Proficient", priority: false },
    { name: "TypeScript", level: "Proficient", priority: false },
  ],
  softwareEngineering: [
    { name: "Object-Oriented Programming (OOP)", priority: true },
    { name: "Data Structures & Algorithms", priority: true },
    { name: "REST API Design", priority: true },
    { name: "Relational Database Design", priority: true },
    { name: "Git & Version Control", priority: true },
    { name: "Problem Solving & Debugging", priority: false },
  ],
  backend: [
    { name: "Flask", priority: true },
    { name: "RESTful APIs", priority: true },
    { name: "SQL Query Optimization", priority: true },
    { name: "Database Schema Design", priority: false },
  ],
  aiAutomation: [
    { name: "n8n Workflow Automation", priority: true },
    { name: "Ollama & Local LLMs", priority: true },
    { name: "llama.cpp & GGUF Inference", priority: true },
    { name: "UiPath Studio (RPA)", priority: true },
    { name: "LLM Pipelines & Webhooks", priority: false },
  ],
  frontend: [
    { name: "HTML5 & Semantic Web", priority: false },
    { name: "CSS3 & Modern Layouts", priority: false },
    { name: "TypeScript / JavaScript", priority: false },
    { name: "Vite & React Ecosystem", priority: false },
    { name: "Tailwind CSS", priority: false },
  ],
  dataSecondary: [
    { name: "Power BI & DAX", priority: false },
    { name: "Data Modeling", priority: false },
    { name: "Visual Basic 6", priority: false },
    { name: "Microsoft Access (ADO)", priority: false },
  ],
}

export const experience = [
  {
    title: "Power BI Intern",
    company: "NoviTech R&D Private Limited",
    location: "Coimbatore, India",
    period: "May 11 – June 1, 2024",
    duration: "21 Days Hands-on Internship",
    details: [
      "Developed interactive Power BI business intelligence dashboards translating raw data into actionable visual insights.",
      "Designed and implemented relational data models with table relationships, star schema concepts, and data transformations.",
      "Constructed DAX calculations and custom measures to analyze business metrics and summarize multi-dimensional trends.",
      "Applied data visualization principles to produce clean, executive-ready reports from real-world enterprise datasets.",
    ],
    skillsLearned: ["Power BI", "DAX", "Data Modeling", "Data Transformation", "Visual Analytics"],
  },
]

export const education = [
  {
    degree: "Bachelor of Computer Applications (BCA)",
    college: "KG College of Arts and Science",
    location: "Coimbatore, India",
    period: "2024 – Expected 2027",
    grade: "CGPA: 8.0 / 10",
    description: "Core coursework in Object-Oriented Programming with Java, Database Management Systems (DBMS), Data Structures, Computer Networks, and Software Engineering.",
  },
  {
    degree: "Higher Secondary Certificate (HSC)",
    college: "Vijayalakshmi Matriculation Higher Secondary School",
    location: "Coimbatore, India",
    period: "2023",
    grade: "Score: 539 / 600",
    description: "Foundational studies in Computer Science and Mathematics.",
  },
]

export const certifications = [
  {
    name: "Google Cloud Computing Foundations",
    issuer: "NPTEL (IIT Kharagpur / Google Cloud)",
    grade: "Elite — Score 61",
    period: "August 2024 – October 2024",
    description: "Comprehensive certification covering cloud infrastructure, storage, virtual machines, IAM security, BigQuery, and scalable cloud architectures.",
  },
]

export const achievements = [
  {
    title: "2nd Runner Up",
    event: "College-Level Project Competition",
    year: "2024",
    project: "Web Form Automation System",
    description: "Recognized for designing a robotic process automation (RPA) workflow integrating UiPath browser automation with a Python/Flask management dashboard.",
    icon: "Trophy",
  },
]

export const codingProfiles = {
  leetcode: {
    url: "https://leetcode.com/u/efImqpWfmd/",
    title: "LeetCode",
    description: "Practicing data structures, algorithmic problem solving, and computational thinking.",
    topics: ["Arrays", "Strings", "Linked Lists", "Stacks", "Queues", "Trees", "Hash Maps"],
  },
  hackerrank: {
    url: "https://www.hackerrank.com/profile/dharshanvelumani",
    title: "HackerRank",
    description: "Building strong foundational coding accuracy in Java, Python, and SQL problem solving.",
  },
}