import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { ArrowRight, GitBranch, Download } from "lucide-react"
import { profile } from "@/data/portfolio"
import { btnPrimary, btnSecondary, btnGhost, containerCustom } from "@/utils/styles"

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 grid-pattern noise-pattern" aria-hidden="true" />
      
      <div className="relative z-10 w-full">
        <motion.div 
          className={containerCustom}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                </span>
                {profile.status}
              </motion.div>

              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1]"
                >
                  <span className="gradient-text">{profile.name}</span>
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="text-2xl lg:text-3xl font-medium text-dark-300"
                >
                  Software Engineer
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="text-xl lg:text-2xl font-medium text-primary-400"
                >
                  AI & Automation Developer
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="text-lg lg:text-xl text-dark-400 max-w-xl leading-relaxed"
                >
                  {profile.description}
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="flex flex-wrap items-center gap-4"
              >
                <a href="#projects" className={btnPrimary} aria-label="View Projects">
                  View Projects
                  <ArrowRight className="h-5 w-5" />
                </a>
                <a 
                  href={profile.links.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={btnSecondary}
                  aria-label="View GitHub Profile"
                >
                  <GitBranch className="h-5 w-5" />
                  GitHub
                </a>
                <a 
                  href="/Dharshan_Velumani_SoftwareDeveloper_Resume.pdf"
                  download
                  className={btnGhost}
                  aria-label="Download Resume"
                >
                  <Download className="h-5 w-5" />
                  Resume
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="flex flex-wrap items-center gap-3"
              >
                {profile.heroTech.map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.05 }}
                    className="badge badgePrimary"
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="relative"
            >
              <TerminalVisual />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
        >
          <motion.a
            href="#about"
            className="text-dark-500 hover:text-dark-300 transition-colors"
            aria-label="Scroll to About"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

function TerminalVisual() {
  const [typedText, setTypedText] = useState("")
  const [cursorVisible, setCursorVisible] = useState(true)
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const isMobile = useMediaQuery('(max-width: 768px)')
  const shouldAnimate = !prefersReducedMotion && !isMobile

  const lines = [
    "dharshan@dev:~$ whoami",
    "",
    "Software Engineer in progress.",
    "",
    "> AI Automation",
    "> Backend Development",
    "> Local AI",
    "> RPA",
    "> Problem Solving",
    "",
    "dharshan@dev:~$ _",
  ]

  useEffect(() => {
    if (!shouldAnimate) {
      setTypedText(lines.join("\n"))
      return
    }

    let lineIndex = 0
    let charIndex = 0
    let currentLine = ""
    let fullText = ""

    const typeLine = () => {
      if (lineIndex < lines.length) {
        const line = lines[lineIndex]
        if (charIndex <= line.length) {
          currentLine = line.slice(0, charIndex)
          fullText = lines.slice(0, lineIndex).join("\n") + (lineIndex > 0 ? "\n" : "") + currentLine
          setTypedText(fullText)
          charIndex++
          setTimeout(typeLine, lineIndex === lines.length - 1 && charIndex === line.length ? 100 : 30)
        } else {
          lineIndex++
          charIndex = 0
          setTimeout(typeLine, lineIndex === lines.length - 1 ? 2000 : 100)
        }
      } else {
        setTimeout(() => {
          lineIndex = 0
          charIndex = 0
          typeLine()
        }, 3000)
      }
    }

    const cursorInterval = setInterval(() => {
      setCursorVisible((prev: boolean) => !prev)
    }, 530)

    typeLine()

    return () => clearInterval(cursorInterval)
  }, [shouldAnimate])

  return (
    <div className="relative">
      <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/10 via-transparent to-red-500/10 rounded-2xl blur-2xl" aria-hidden="true" />
      
      <div className="relative bg-dark-900/80 border border-dark-700 rounded-xl overflow-hidden shadow-2xl backdrop-blur-sm">
        <div className="flex items-center gap-2 px-4 py-3 bg-dark-800 border-b border-dark-700">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="flex-1 text-center text-xs text-dark-500 font-mono">dharshan@dev:~$</div>
        </div>
        
        <div className="p-6 font-mono text-sm text-dark-200 leading-relaxed min-h-[300px] max-h-[400px] overflow-y-auto">
          <pre className="whitespace-pre-wrap">
            {typedText}
            <span className={`${cursorVisible ? "opacity-100" : "opacity-0"} animate-blink`}>_</span>
          </pre>
        </div>
      </div>

      <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary-500/5 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute -top-6 -left-6 w-48 h-48 bg-red-500/5 rounded-full blur-3xl" aria-hidden="true" />
    </div>
  )
}