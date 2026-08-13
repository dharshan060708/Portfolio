import { Navbar } from "./components/Navbar"
import { Hero } from "./components/Hero"
import { About } from "./components/About"
import { WhatIBuild } from "./components/WhatIBuild"
import { Projects } from "./components/Projects"
import { Skills } from "./components/Skills"
import { Experience } from "./components/Experience"
import { Education } from "./components/Education"
import { Certifications } from "./components/Certifications"
import { Achievements } from "./components/Achievements"
import { CodingProfiles } from "./components/CodingProfiles"
import { GitHub } from "./components/GitHub"
import { Contact } from "./components/Contact"
import { Footer } from "./components/Footer"
import { lazy, Suspense } from "react"

const DeveloperTerminal = lazy(() => import("./components/Terminal").then(m => ({ default: m.DeveloperTerminal })))

function TerminalSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12" aria-hidden="true">
      <div className="h-64 bg-black-900/60 border border-black-600 rounded-xl animate-pulse flex items-center justify-center text-gray-500 font-mono text-xs">
        Loading Developer Terminal...
      </div>
    </div>
  )
}

export function App() {
  return (
    <div className="min-h-screen bg-black-950 text-white relative font-sans selection:bg-gold-500/25 selection:text-white">
      <div className="fixed inset-0 grid-pattern pointer-events-none opacity-20 z-0" aria-hidden="true" />
      <div className="relative z-10">
        <Navbar />
        <main id="main-content">
          <Hero />
          <About />
          <WhatIBuild />
          <Projects />
          <Skills />
          <Experience />
          <Education />
          <Certifications />
          <Achievements />
          <CodingProfiles />
          <GitHub />
          <Suspense fallback={<TerminalSkeleton />}>
            <DeveloperTerminal />
          </Suspense>
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  )
}