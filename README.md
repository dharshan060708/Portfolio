# Dharshan Velumani — Developer Portfolio & Engineering Showcase

[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A recruiter-focused **Software Engineer Portfolio** built with React, TypeScript, and Tailwind CSS. Showcases core foundations in **Java, Python, SQL, Backend Development**, local LLM tooling (**llama.cpp / Ollama**), and workflow automation (**UiPath / n8n**).

---

## 📌 Project Overview

- **Candidate**: Dharshan Velumani
- **Role Target**: Aspiring Software Engineer | AI & Automation Developer
- **Degree**: Bachelor of Computer Applications (BCA), KG College of Arts and Science (2024–2027, CGPA: 8.0/10)
- **Live URL**: [dharshanvelumani.dev](https://dharshanvelumani.dev)

---

## ✨ Features & Architecture

### ⚡ Performance & Clean Architecture
- **Compositor Transitions**: Hardware-friendly CSS scroll-reveal and staggered entry animations.
- **Content Visibility**: Native `content-visibility: auto` on offscreen sections to optimize rendering.
- **Tree-Shaken Bundles**: Optimized module splitting with Vite and minimal production bundle footprint.

### 🔍 Project Case Studies & Exploration
- **Live Search & Filter**: Real-time keyword filtering across project titles, tags, and technologies.
- **Structured Case Study Modals**: Every project communicates `Problem → Architectural Solution → Technologies → Impact`.
- **System Architecture Visualizations**: Monospaced ASCII data pipeline flows for major projects.

### 💻 Developer CLI Terminal
- **Interactive Terminal**: An integrated command-line interface supporting `about`, `stack`, `projects`, `skills`, `experience`, `education`, `achievements`, `status`, `resume`, `github`, and `contact`.
- **Color Themes**: Real-time theme switching between `default`, `matrix` (CRT phosphor green), `amber` (retro amber), and `cyan` (cyberpunk) color modes.

### ⌨️ Command Palette (`Ctrl+K` / `Cmd+K`)
- Spotlight-style keyboard navigator for rapid section jumping and resume downloads.

### 📱 Recruiter-First Accessibility & SEO
- **Structured Data**: JSON-LD `Person` metadata for search engine indexing.
- **PWA Ready**: Web App Manifest (`manifest.json`) and responsive mobile viewport optimizations.
- **One-Click Contact & Copy**: Instant clipboard copying with feedback badges and direct contact submission with automatic email client fallback.

---

## 🛠️ Technical Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Lucide React
- **Animation**: Framer Motion 11, CSS Transitions
- **Tooling & Build**: Vite 5, PostCSS, Autoprefixer, TypeScript Compiler (`tsc`)
- **Deployment**: Vercel (`vercel.json` SPA configuration with caching & security headers)

---

## 📁 Project Structure

```text
Portfolio/
├── public/
│   ├── Dharshan_Velumani_SoftwareDeveloper_Resume.pdf
│   ├── apple-touch-icon.png
│   ├── favicon.svg
│   ├── manifest.json
│   ├── og-image.png
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/
│   │   ├── About.tsx             # Academic & engineering background
│   │   ├── Achievements.tsx      # Verified recognitions & awards
│   │   ├── Certifications.tsx    # NPTEL Google Cloud credentials
│   │   ├── CodingProfiles.tsx    # LeetCode, HackerRank, GitHub profiles
│   │   ├── Contact.tsx           # Asynchronous contact & copy actions
│   │   ├── Education.tsx         # BCA & HSC educational timeline
│   │   ├── Experience.tsx        # Power BI internship details
│   │   ├── Footer.tsx            # Recruiter-focused footer
│   │   ├── GitHub.tsx            # Open-source repository showcases
│   │   ├── Hero.tsx              # Primary positioning, CTAs & terminal preview
│   │   ├── Navbar.tsx            # Navigation, scroll progress, Command Palette
│   │   ├── Projects.tsx          # Featured & supporting project case studies
│   │   ├── Skills.tsx            # Prioritized skills matrix
│   │   ├── Terminal.tsx          # Interactive Developer CLI
│   │   └── WhatIBuild.tsx        # 4 core engineering domains
│   ├── data/
│   │   └── portfolio.ts          # Centralized, verified single source of truth
│   ├── hooks/
│   │   ├── useMediaQuery.ts      # Responsive breakpoint listener
│   │   └── useScrollAnimation.ts # High-performance intersection observer
│   ├── utils/
│   │   └── styles.ts             # Shared UI design tokens & class utility strings
│   ├── App.tsx                   # Root layout & section sequence
│   ├── index.css                 # Core design tokens, scroll-reveal classes
│   ├── main.tsx                  # Application entry point
│   └── vite-env.d.ts             # Vite client environment typing
├── index.html                    # SEO, Open Graph & JSON-LD schema
├── package.json                  # Dependencies & npm scripts
├── tailwind.config.js            # Tailwind theme tokens & color palette
├── tsconfig.json                 # TypeScript compiler configuration
├── vercel.json                   # Vercel deployment & security headers
└── vite.config.ts                # Vite build and path aliases
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### Installation
```bash
# Clone repository
git clone https://github.com/DharshanVelumani/Portfolio.git

# Navigate to project directory
cd Portfolio

# Install dependencies
npm install
```

### Environment Variables
Optionally create a `.env` file in the root directory:
```env
# Optional: Web3Forms access key for direct contact form submissions
VITE_WEB3FORMS_ACCESS_KEY=your_web3forms_key_here
```
*(If omitted or unconfigured, the contact form automatically falls back to direct mail client handling).*

### Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Type Check & Production Build
```bash
# Verify TypeScript typing
npm run typecheck

# Compile TypeScript & bundle production assets
npm run build

# Preview production build locally
npm run preview
```

---

## ☁️ Deployment

This project is configured for **Vercel** via [`vercel.json`](vercel.json):
1. Push code to your GitHub repository:
   ```bash
   git add .
   git commit -m "Deploy production portfolio"
   git push origin main
   ```
2. Link the repository on [Vercel](https://vercel.com).
3. Vercel will automatically detect Vite and run `npm run build` targeting `dist/`.

---

## 📄 License & Attribution

© 2026 Dharshan Velumani. Built with TypeScript, React, and Tailwind CSS.
