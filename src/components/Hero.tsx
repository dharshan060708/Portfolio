import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { ArrowRight, GitBranch, Download, Linkedin } from "lucide-react"
import { profile } from "@/data/portfolio"
import { btnPrimary, btnGhost, containerCustom } from "@/utils/styles"

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-12 lg:py-0">
      <div className="relative z-10 w-full">
        <motion.div 
          className={containerCustom}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/[0.08] border border-gold-500/[0.22] text-gold-500 text-xs sm:text-sm font-medium tracking-wide"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-500"></span>
                </span>
                {profile.status}
              </motion.div>

              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  <p className="text-gray-500 font-mono text-sm uppercase tracking-wider mb-2">Hello, I'm</p>
                  <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
                    <span className="gradient-text-hero">{profile.name}</span>
                  </h1>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  className="space-y-1"
                >
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white">
                    {profile.headline}
                  </h2>
                  <p className="text-xl sm:text-2xl font-medium text-gold-500">
                    {profile.subtitle}
                  </p>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  className="text-base sm:text-lg text-gray-400 max-w-2xl leading-relaxed font-normal"
                >
                  {profile.description}
                </motion.p>
              </div>

              {/* Primary CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="flex flex-wrap items-center gap-3 sm:gap-4"
              >
                <a href="#projects" className={btnPrimary} aria-label="View Projects">
                  View Projects
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a 
                  href="/Dharshan_Velumani_SoftwareDeveloper_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium text-sm transition-all duration-200 bg-transparent text-white border border-black-500 hover:border-gold-500 hover:text-gold-400 hover:bg-gold-500/5 cursor-pointer shadow-sm"
                  aria-label="Download Resume"
                >
                  <Download className="h-4 w-4 text-gold-500" />
                  Resume PDF
                </a>
                <a 
                  href={profile.links.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={btnGhost}
                  aria-label="View GitHub Profile"
                >
                  <GitBranch className="h-4 w-4" />
                  GitHub
                </a>
                <a 
                  href={profile.links.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={btnGhost}
                  aria-label="View LinkedIn Profile"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              </motion.div>

              {/* Priority Core Foundations */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.4 }}
                className="pt-2 border-t border-black-600"
              >
                <p className="text-xs font-mono uppercase tracking-wider text-gray-500 mb-3">Core Technical Focus</p>
                <div className="flex flex-wrap items-center gap-2">
                  {profile.heroTech.map((tech, index) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 + index * 0.05 }}
                      className="px-3 py-1 rounded-md text-xs font-mono font-medium bg-black-900 border border-black-600 text-white hover:border-gold-500/50 hover:text-gold-400 transition-colors"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Terminal Column */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="lg:col-span-5 relative"
            >
              <TerminalVisual />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="hidden lg:block absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce"
        >
          <a
            href="#about"
            className="text-gray-500 hover:text-gold-400 transition-colors"
            aria-label="Scroll to About"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
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
    "> Dharshan Velumani",
    "> Aspiring Software Engineer",
    "",
    "dharshan@dev:~$ cat stack.json",
    "{",
    '  "languages": ["Java", "Python", "SQL"],',
    '  "backend": ["Flask", "REST APIs", "DBMS"],',
    '  "ai_automation": ["llama.cpp", "Ollama", "n8n", "UiPath"],',
    '  "education": "BCA (CGPA: 8.0/10)"',
    "}",
    "",
    "dharshan@dev:~$ ready --for-internships",
    "> Status: Available for Software Engineering Roles",
  ]

  useEffect(() => {
    if (!shouldAnimate) {
      setTypedText(lines.join("\n"))
      return
    }

    let isMounted = true
    let timeoutId: ReturnType<typeof setTimeout>
    let lineIndex = 0
    let charIndex = 0
    let currentLine = ""
    let fullText = ""

    const typeLine = () => {
      if (!isMounted) return
      if (lineIndex < lines.length) {
        const line = lines[lineIndex]
        if (charIndex <= line.length) {
          currentLine = line.slice(0, charIndex)
          fullText = lines.slice(0, lineIndex).join("\n") + (lineIndex > 0 ? "\n" : "") + currentLine
          setTypedText(fullText)
          charIndex++
          timeoutId = setTimeout(typeLine, lineIndex === lines.length - 1 && charIndex === line.length ? 100 : 25)
        } else {
          lineIndex++
          charIndex = 0
          timeoutId = setTimeout(typeLine, lineIndex === lines.length - 1 ? 3000 : 70)
        }
      } else {
        timeoutId = setTimeout(() => {
          if (!isMounted) return
          lineIndex = 0
          charIndex = 0
          typeLine()
        }, 4000)
      }
    }

    const cursorInterval = setInterval(() => {
      setCursorVisible((prev: boolean) => !prev)
    }, 530)

    typeLine()

    return () => {
      isMounted = false
      clearTimeout(timeoutId)
      clearInterval(cursorInterval)
    }
  }, [shouldAnimate])

  return (
    <div className="relative">
      <div className="absolute -inset-2 bg-gradient-to-r from-gold-500/10 via-transparent to-gold-400/5 rounded-2xl blur-xl pointer-events-none" aria-hidden="true" />
      
      <div className="relative bg-black-900/95 border border-black-600 rounded-xl overflow-hidden shadow-gold-card">
        <div className="flex items-center justify-between px-4 py-3 bg-black-900 border-b border-black-600">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-status-error/80" />
            <div className="w-3 h-3 rounded-full bg-gold-500/80" />
            <div className="w-3 h-3 rounded-full bg-status-success/80" />
          </div>
          <div className="text-xs text-gray-500 font-mono">engineer@dharshan:~/profile</div>
          <div className="w-10" />
        </div>
        
        <div className="p-5 font-mono text-xs sm:text-sm text-gray-400 leading-relaxed min-h-[300px] max-h-[380px] overflow-y-auto">
          <pre className="whitespace-pre-wrap font-mono">
            {typedText}
            <span className={`${cursorVisible ? "opacity-100" : "opacity-0"} text-gold-500`}>_</span>
          </pre>
        </div>
      </div>
    </div>
  )
}