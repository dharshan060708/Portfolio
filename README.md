# Dharshan Velumani — Professional Developer Portfolio

<div align="center">

![Portfolio Banner](https://img.shields.io/badge/Dharshan_Velumani-Portfolio-D6A63A?style=for-the-badge)
![React](https://img.shields.io/badge/React_18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38BDF8?style=for-the-badge&logo=tailwind-css&logoColor=black)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue)
![Vite](https://img.shields.io/badge/Vite_5-646CFF?style=for-the-badge&logo=vite&logoColor=white)

**A high-performance personal developer portfolio with quiet dark luxury aesthetic, interactive code showcase, authentic projects, and verified developer metrics.**

[Live Demo](https://github.com/dharshan060708/Portfolio) • [Report Issue](https://github.com/dharshan060708/Portfolio/issues) • [LinkedIn](https://www.linkedin.com/in/dharshan-v-121341369/)

</div>

---

## ✨ Features

- **Interactive IDE Architecture Showcase**:
  - Interactive terminal & code editor switcher showcasing real production snippets (`meridian_rag.py`, `devil_in_launcher.bat`, `lead_automation.ts`).
  - Live execution diagnostics badges, copy-to-clipboard, and clean syntax highlighting.
- **Quiet Dark Luxury Visual Design**:
  - Velvety dark background (`#050607`), elevated card surfaces (`#0B0D0F`), refined gold branding (`#D6A63A`), and subtle tech-blue (`#1683FF`) accents.
  - Spacious two-column Hero layout with status badge, headline, and action CTAs.
  - 4-segment continuous Stats strip (`50` DSA Solved, `5+` Projects Built, `15+` Technologies, `∞` Always Learning).
  - Horizontal technology badge pill strip.
  - 3-column Featured Projects grid with rich, tailored UI preview mockups.
  - Side-by-side DSA Journey (verified language distribution) & GitHub Activity (live repository stats).
- **Single Source of Truth & Data Authenticity**:
  - Centralized data layer in `src/data/` (`projects.ts`, `skills.ts`, `technologies.ts`, `profiles.ts`, `achievements.ts`).
  - Verified LeetCode stats (**50 Solved**: 41 Python3, 5 Java, 4 MySQL, Goal 300+).
  - Live GitHub API repository count fetching with 10-minute session caching and verified fallback.
  - Truthful direct mail client dispatch in the Contact section.
- **Production Performance**:
  - Ultra-lightweight bundle (<66 kB gzipped total JS), instant load times, 100/100 Lighthouse performance.
  - Zero heavy GPU dependencies.
  - Comprehensive OpenGraph and Twitter Card social metadata in `index.html`.

---

## 🛠️ Tech Stack

- **Frontend Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 5](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/dharshan060708/Portfolio.git
cd Portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for production
```bash
npm run build
```

### 5. Preview production build
```bash
npm run preview
```

---

## 📂 Project Structure

```text
├── public/                # Static public assets, favicons, robots.txt, sitemap.xml
├── src/
│   ├── components/        # React UI components
│   │   ├── Hero/          # Hero section with interactive IDE showcase
│   │   ├── Navbar/        # Fixed navigation with gold active states
│   │   ├── Stats/         # 4-segment unified stats container
│   │   ├── Technologies/  # Horizontal tech badge strip
│   │   ├── Projects/      # 3-column featured projects grid & UI mockups
│   │   ├── Modal/         # Interactive Project Detail Modal
│   │   ├── DSAGitHub/     # Side-by-side LeetCode & GitHub cards
│   │   ├── About/         # Professional background & verified developer spec
│   │   ├── Skills/        # 6 categorical technical skill cards
│   │   ├── Contact/       # Let's Build Something CTA & mail dispatch
│   │   ├── Footer.tsx     # Minimal footer with verified profile links
│   │   ├── LoadingScreen.tsx # Elegant initial loading screen
│   │   └── CustomCursor.tsx  # Smooth fine-pointer custom cursor
│   ├── data/              # Single source of truth data layer
│   │   ├── projects.ts    # Verified projects with architecture descriptions
│   │   ├── skills.ts      # Categorical skills without arbitrary percentages
│   │   ├── technologies.ts # Normalized technology stack list
│   │   ├── profiles.ts    # Verified social and coding profiles
│   │   ├── achievements.ts # Verified education and awards
│   │   └── index.ts       # Central data exports
│   ├── hooks/             # Custom React hooks (device, GitHub stats, etc.)
│   ├── utils/             # Helper utilities (cn, styling)
│   ├── App.tsx            # Main application entry
│   ├── index.css          # Tailwind CSS design system tokens
│   └── main.tsx           # React DOM root
├── index.html             # SEO, OpenGraph metadata, and fonts
├── package.json           # Scripts and dependencies
├── tailwind.config.js     # Custom color palette & radius tokens
├── tsconfig.json          # TypeScript compiler configuration
├── vercel.json            # Vercel deployment configuration
└── vite.config.ts         # Vite build configuration & chunk splitting
```

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub.
2. Go to [Vercel](https://vercel.com/) and click **New Project**.
3. Import your `Portfolio` repository.
4. Framework Preset: **Vite**
5. Root Directory: `./`
6. Click **Deploy**. The included `vercel.json` ensures all routes and assets work automatically.

### Deploy to Netlify

1. Connect your GitHub repository to [Netlify](https://www.netlify.com/).
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Click **Deploy Site**.

---

## 👨‍💻 Author

**Dharshan Velumani**
- **GitHub**: [@dharshan060708](https://github.com/dharshan060708)
- **LeetCode**: [efImqpWfmd](https://leetcode.com/u/efImqpWfmd/)
- **HackerRank**: [@dharshanvelumani](https://www.hackerrank.com/profile/dharshanvelumani)
- **LinkedIn**: [Dharshan Velumani](https://www.linkedin.com/in/dharshan-v-121341369/)
- **Email**: [dharshanvelumani06@gmail.com](mailto:dharshanvelumani06@gmail.com)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
