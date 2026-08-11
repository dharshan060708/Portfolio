export const profile = {
  name: "Dharshan Velumani",
  title: "Software Engineer | AI & Automation Developer",
  description: "Final-year BCA student building practical software, AI-powered automation systems, local AI tools, and backend applications with a focus on solving real-world problems.",
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
    graduation: "2027",
    cgpa: "8.0/10",
  },
  status: "OPEN TO SOFTWARE ENGINEERING OPPORTUNITIES",
  heroTech: ["Java", "Python", "SQL", "Flask", "n8n", "UiPath", "Ollama", "llama.cpp"],
}

export const about = {
  heading: "Building Software With Purpose",
  description: [
    "I'm Dharshan, a final-year BCA student interested in software engineering, backend development, AI automation, local LLMs, RPA, and practical application development. I enjoy taking an idea, understanding the problem behind it, and turning it into a working software solution.",
    "My projects range from AI-powered workflow automation and local LLM tools to desktop applications, browser automation, and data visualization. Alongside project development, I continuously improve my programming and problem-solving skills through coding platforms.",
  ],
  profileInfo: [
    { label: "Education", value: "BCA" },
    { label: "College", value: "KG College of Arts and Science" },
    { label: "Graduation", value: "2027" },
    { label: "CGPA", value: "8.0 / 10" },
    { label: "Focus", value: "Software Engineering, AI & Automation, Backend Development" },
  ],
}

export const focusAreas = [
  {
    title: "Software Engineering",
    description: "Building practical applications with structured code and reusable components.",
    icon: "Code",
  },
  {
    title: "AI & Local LLMs",
    description: "Exploring local AI inference, Ollama, llama.cpp, and AI-powered applications.",
    icon: "Brain",
  },
  {
    title: "Workflow Automation",
    description: "Designing automated business workflows using n8n and APIs.",
    icon: "Workflow",
  },
  {
    title: "Backend Development",
    description: "Working with Python, Flask, REST APIs, SQL, and application logic.",
    icon: "Server",
  },
  {
    title: "RPA",
    description: "Automating browser and repetitive workflows using UiPath.",
    icon: "Bot",
  },
  {
    title: "Problem Solving",
    description: "Practicing algorithms and programming challenges through coding platforms.",
    icon: "Puzzle",
  },
]

export const projects = [
  {
    id: "devil-in-ai",
    name: "Devil-In AI",
    category: "Local AI / Developer Tool",
    description: "A portable, zero-dependency local LLM launcher for Windows using llama.cpp, allowing users to run GGUF models completely offline without requiring Python or Docker.",
    longDescription: "Devil-In AI is a portable launcher that brings local LLM inference to any Windows machine. Built on llama.cpp, it eliminates the need for Python, Docker, or complex environment setup. Simply download, run, and start chatting with AI models offline.",
    tech: ["llama.cpp", "Batch Scripting", "HTML", "CSS", "JavaScript", "Local LLM Inference"],
    features: [
      "Offline local LLM inference",
      "No Python requirement",
      "No Docker requirement",
      "Portable execution",
      "USB-drive support",
      "Automated installation pipeline",
      "Downloads required llama.cpp components",
      "LAN-shareable chat interface",
      "Custom developer-focused UI",
    ],
    architecture: `User
 ↓
Portable Launcher
 ↓
llama.cpp
 ↓
llama-server
 ↓
GGUF Model
 ↓
Local Chat Interface`,
    github: "https://github.com/DharshanVelumani/Devil-In-AI",
    demo: null,
    featured: true,
    tags: ["AI", "Desktop"],
  },
  {
    id: "ai-lead-management",
    name: "AI Lead Management System Pro",
    category: "AI Automation / Workflow Automation",
    description: "An end-to-end AI-powered lead intake and CRM automation pipeline that captures leads through a webhook, classifies and scores them using a local LLM, and automatically routes the information to connected services.",
    longDescription: "A comprehensive n8n workflow that demonstrates the power of combining local AI with business automation. Leads are captured, validated, classified by a local Llama 3 model via Ollama, scored, and then routed to Google Sheets, email, and Trello automatically.",
    tech: ["n8n", "Ollama", "Llama 3", "Webhooks", "Google Sheets", "Gmail", "Trello", "HTML", "CSS", "JavaScript"],
    features: [
      "Lead capture via webhook",
      "Input validation",
      "AI classification using local LLM",
      "AI lead scoring",
      "Google Sheets logging",
      "Email notifications",
      "Trello card creation",
      "Automated routing",
      "AI fallback logic",
      "Multi-step workflow",
    ],
    architecture: `Lead Form
   ↓
Webhook
   ↓
Validation
   ↓
AI Classification
   ↓
Lead Scoring
   ↓
Google Sheets
   ↓
Email Notification
   ↓
Trello`,
    github: "https://github.com/DharshanVelumani/AI-Lead-Management-System-Pro",
    demo: null,
    featured: false,
    tags: ["AI", "Automation", "Web"],
  },
  {
    id: "pharmacy-management",
    name: "Inventory Pharmacy Management System",
    category: "Desktop Application",
    description: "A desktop pharmacy inventory and billing application developed using Visual Basic 6 with an Access database backend.",
    longDescription: "A full-featured pharmacy management system built with Visual Basic 6 and Microsoft Access. Handles inventory tracking, stock management, billing, and reporting through dedicated operation forms with a database-backed workflow.",
    tech: ["Visual Basic 6", "ADO", "Microsoft Access", "MSCOMCT2", "RichTextBox"],
    features: [
      "Inventory management",
      "Stock tracking",
      "Billing system",
      "Reporting",
      "Dedicated operation forms",
      "Database-backed application workflow",
    ],
    architecture: `VB6 Frontend
   ↓
ADO Connection
   ↓
MS Access Database`,
    github: "https://github.com/DharshanVelumani/Inventory-Pharmacy-Management-System",
    demo: null,
    featured: false,
    tags: ["Desktop"],
  },
  {
    id: "vihaalaya",
    name: "Vihaalaya",
    category: "AI Application",
    description: "An AI-powered application prototyped using Google AI Studio with Gemini API integration and a TypeScript + Vite frontend.",
    longDescription: "An experimental AI application showcasing Gemini API integration with a modern TypeScript/Vite frontend. Demonstrates practical AI application development workflows.",
    tech: ["TypeScript", "Vite", "Gemini API"],
    features: [
      "AI-powered application development",
      "Gemini API integration",
      "Modern frontend architecture",
    ],
    architecture: `Frontend (TypeScript/Vite)
   ↓
Gemini API
   ↓
AI Response`,
    github: "https://github.com/DharshanVelumani/Vihaalaya",
    demo: null,
    featured: false,
    tags: ["AI", "Web"],
  },
  {
    id: "web-form-automation",
    name: "Web Form Automation System",
    category: "RPA / Browser Automation",
    description: "An automated browser-based form filling system built using UiPath and paired with a Flask dashboard for monitoring and triggering automation runs.",
    longDescription: "A complete RPA solution combining UiPath browser automation with a Flask-based monitoring dashboard. Achieved 2nd Runner Up in a college-level project competition.",
    tech: ["UiPath Studio", "Flask", "Chrome Automation"],
    features: [
      "Automated browser form filling",
      "Flask monitoring dashboard",
      "Chrome automation via UiPath",
      "Run tracking and logging",
    ],
    architecture: `Flask Dashboard
   ↓
Trigger Automation
   ↓
UiPath Robot
   ↓
Chrome Browser
   ↓
Form Submission`,
    github: "https://github.com/DharshanVelumani/Web-Form-Automation-System",
    demo: null,
    featured: false,
    tags: ["RPA", "Automation", "Web"],
    achievement: "🏆 2nd Runner Up — College-Level Project Competition, 2024",
  },
]

export const skills = {
  programming: ["Java", "Python", "SQL", "JavaScript"],
  coreJava: ["Object-Oriented Programming", "Exception Handling"],
  webBackend: ["HTML5", "CSS3", "Flask", "REST APIs", "Vite", "TypeScript"],
  ai: ["Ollama", "Local LLMs", "llama.cpp", "Gemini API"],
  automation: ["n8n", "UiPath Studio", "Chrome Automation", "Webhooks"],
  dataBI: ["Power BI", "Google Sheets API"],
  desktopLegacy: ["Visual Basic 6", "ADO", "Microsoft Access"],
  tools: ["Git", "GitHub"],
}

export const experience = [
  {
    title: "Power BI Intern",
    company: "NoviTech R&D Private Limited",
    location: "Coimbatore",
    period: "May 11 – June 1, 2026",
    duration: "21 days",
    details: [
      "Completed a 21-day hands-on internship",
      "Power BI dashboard development",
      "Data visualization",
      "Data modeling",
      "DAX calculations",
      "Visual design best practices",
      "Worked with real datasets",
    ],
  },
]

export const education = [
  {
    degree: "Bachelor of Computer Applications",
    college: "KG College of Arts and Science",
    period: "Expected 2027",
    grade: "CGPA: 8.0/10",
  },
  {
    degree: "Higher Secondary Certificate",
    college: "Vijayalakshmi Matric Hr. Sec. School",
    period: "2023",
    grade: "539/600",
  },
]

export const certifications = [
  {
    issuer: "NPTEL",
    name: "Google Cloud Computing Foundations",
    grade: "Elite — Score 61",
    period: "August 2024 – October 2024",
  },
]

export const achievements = [
  {
    title: "2nd Runner Up",
    event: "College-Level Project Competition",
    year: "2024",
    project: "Web Form Automation System",
    icon: "Trophy",
  },
]

export const currentMission = [
  "Complete Final Year Project",
  "Improve DSA/problem solving",
  "Build production-grade AI agents",
  "Contribute to open source",
  "Improve backend engineering and system design",
]

export const codingProfiles = {
  leetcode: {
    url: "https://leetcode.com/u/efImqpWfmd/",
    title: "LeetCode",
    description: "Practicing data structures, algorithms, and programming problem solving through coding challenges.",
    topics: ["Arrays", "Strings", "Linked Lists", "Stacks", "Queues", "Trees", "Hash Maps"],
  },
  hackerrank: {
    url: "https://www.hackerrank.com/profile/dharshanvelumani",
    title: "HackerRank",
    description: "Building programming fundamentals and technical problem-solving skills through structured coding challenges.",
  },
}