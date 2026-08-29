# Dharshan Velumani — 3D Developer Portfolio

<div align="center">

![Portfolio Preview Banner](https://img.shields.io/badge/Dharshan_Velumani-Portfolio_3D-D6A63A?style=for-the-badge)
![React](https://img.shields.io/badge/React_18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)
![React Three Fiber](https://img.shields.io/badge/R3F-1683FF?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38BDF8?style=for-the-badge&logo=tailwind-css&logoColor=black)
![Vite](https://img.shields.io/badge/Vite_5-646CFF?style=for-the-badge&logo=vite&logoColor=white)

**A high-performance personal developer portfolio featuring a studio-photographed 3D developer workstation, quiet dark luxury aesthetic, and verified developer data.**

[Live Demo](https://github.com/dharshan060708/Portfolio) • [Report Issue](https://github.com/dharshan060708/Portfolio/issues) • [LinkedIn](https://www.linkedin.com/in/dharshan-v-121341369/)

</div>

---

## ✨ Features

- **Photorealistic 3D Developer Workstation**:
  - 27-inch 16:9 developer monitor with a physical **VS Code Dark IDE dynamic canvas texture** mapped directly onto the screen mesh (not a floating HTML div).
  - Studio HDRI environment (`preset="city"`, `intensity=0.32`) with soft key lighting, cool monitor bounce fill, and warm desk lamp.
  - Staggered mechanical keyboard with spacebar and modifier keys, ergonomic mouse, and desk mat.
  - Secondary space-gray aluminum laptop with a local AI node terminal texture.
  - High-resolution grounded contact shadows under all objects.
  - Natural perspective camera (`fov: 39°`) with subtle mouse parallax.
- **Quiet Dark Luxury Visual Design**:
  - Velvety dark background (`#050607`), card surfaces (`#0B0D0F`), refined gold branding (`#D6A63A`), and subtle tech-blue (`#1683FF`) highlights.
  - Spacious two-column Hero layout with status badge, headline, and action CTAs.
  - 4-segment continuous Stats strip (`50` DSA Solved, `5+` Projects Built, `15+` Technologies, `∞` Always Learning).
  - `— TECHNOLOGIES I WORK WITH —` horizontal pill strip.
  - 3-column Featured Projects grid with rich, tailored UI preview mockups.
  - Side-by-side DSA Journey (3D gold rising bars) & GitHub Activity (3D holographic globe).
- **Single Source of Truth & Data Authenticity**:
  - Centralized data layer in `src/data/` (`projects.ts`, `skills.ts`, `technologies.ts`, `profiles.ts`, `achievements.ts`).
  - Verified LeetCode stats (**50 Solved**: 41 Python3, 5 Java, 4 MySQL, Goal 300+).
  - Live GitHub API repository count fetching with 10-minute session caching and verified fallback.
  - Truthful direct mail client dispatch in the Contact section.
- **Production Performance**:
  - Viewport-aware WebGL rendering loop (pauses when scrolled off-screen).
  - Chunk splitting with Vite manual chunks for Three.js, Framer Motion, and React.
  - Comprehensive OpenGraph and Twitter Card social metadata in `index.html`.

---

## 🛠️ Tech Stack

- **Frontend Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 5](https://vitejs.dev/)
- **3D Graphics**: [Three.js](https://threejs.org/) + [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) + [@react-three/drei](https://github.com/pmndrs/drei)
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
├── public/                # Static public assets & favicons
├── src/
│   ├── components/        # React components
│   │   ├── 3D/            # Three.js 3D workstation, canvases & modals
│   │   │   ├── DeveloperDesk/   # 3D Developer Workstation with PBR textures
│   │   │   ├── Common/          # Canvas wrapper with WebGL fallbacks
│   │   │   └── Modal/           # Interactive Project Detail Modal
│   │   ├── Hero/          # Hero section with 3D workstation
│   │   ├── Navbar/        # Fixed navigation with gold active states
│   │   ├── Stats/         # 4-segment unified stats container
│   │   ├── Technologies/  # Horizontal tech badge strip
│   │   ├── Projects/      # 3-column featured projects grid & UI mockups
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
