import { Navbar } from "./components/Navbar"
import { Hero } from "./components/Hero"
import { Footer } from "./components/Footer"
import { lazy, Suspense, useEffect, useState } from "react"

const About = lazy(() => import("./components/About").then(m => ({ default: m.About })))
const FocusAreas = lazy(() => import("./components/FocusAreas").then(m => ({ default: m.FocusAreas })))
const Projects = lazy(() => import("./components/Projects").then(m => ({ default: m.Projects })))
const Skills = lazy(() => import("./components/Skills").then(m => ({ default: m.Skills })))
const CodingProfiles = lazy(() => import("./components/CodingProfiles").then(m => ({ default: m.CodingProfiles })))
const DeveloperTerminal = lazy(() => import("./components/Terminal").then(m => ({ default: m.DeveloperTerminal })))
const Experience = lazy(() => import("./components/Experience").then(m => ({ default: m.Experience })))
const Education = lazy(() => import("./components/Education").then(m => ({ default: m.Education })))
const Achievements = lazy(() => import("./components/Achievements").then(m => ({ default: m.Achievements })))
const GitHub = lazy(() => import("./components/GitHub").then(m => ({ default: m.GitHub })))
const Contact = lazy(() => import("./components/Contact").then(m => ({ default: m.Contact })))

function SectionSkeleton({ height = 300 }: { height?: number }) {
  return (
    <div className="animate-pulse space-y-6" style={{ minHeight: height }}>
      <div className="h-8 bg-dark-800 rounded w-1/4 mx-auto" />
      <div className="h-4 bg-dark-800 rounded w-1/2 mx-auto" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-48 bg-dark-800 rounded-lg" />
        ))}
      </div>
    </div>
  )
}

export function App() {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      setShowContent(true)
    })
    return () => cancelAnimationFrame(timer)
  }, [])

  return (
    <div className="min-h-screen bg-dark-950 text-white relative">
      <div className="fixed inset-0 grid-pattern pointer-events-none opacity-40 z-0" aria-hidden="true" />
      <div className="relative z-10">
        <Navbar />
        <main id="main-content">
          <Hero />
          {showContent && (
            <Suspense fallback={<SectionSkeleton />}>
              <About />
              <FocusAreas />
              <Projects />
              <Skills />
              <CodingProfiles />
              <DeveloperTerminal />
              <Experience />
              <Education />
              <Achievements />
              <GitHub />
              <Contact />
            </Suspense>
          )}
        </main>
        <Footer />
      </div>
    </div>
  )
}