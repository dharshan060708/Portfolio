import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { profile, projects, experience, education, achievements } from "@/data/portfolio"
import { containerCustom, section, sectionTitle, sectionSubtitle, card } from "@/utils/styles"

const commands = [
  { 
    cmd: "about", 
    desc: "Display profile, education, and technical positioning", 
    output: `Name: ${profile.name}
Role: ${profile.headline} | ${profile.subtitle}
Location: ${profile.location}
Degree: ${profile.education.degree} (${profile.education.college})
Graduation: ${profile.education.graduation} | Academic Score: ${profile.education.cgpa}
Core Focus: Software Engineering, Backend Development, AI & Automation` 
  },
  { 
    cmd: "stack", 
    desc: "Show full software engineering technical stack", 
    output: `[Programming]
  • Java, Python, SQL, JavaScript, TypeScript
[Software Engineering]
  • OOP, Data Structures & Algorithms, REST APIs, Database Design, Git
[Backend]
  • Flask, REST APIs, SQL Query Optimization, Database Operations
[AI & Automation]
  • Ollama, llama.cpp, Local LLMs (GGUF), n8n Workflows, UiPath RPA
[Frontend & Tools]
  • HTML5, CSS3, Vite, Tailwind CSS, Git, GitHub, Power BI` 
  },
  { 
    cmd: "projects", 
    desc: "List verified engineering projects & architecture", 
    output: projects.map(p => `• ${p.name} [${p.category}]\n  ${p.summary}\n  Tech: ${p.tech.join(", ")}`).join("\n\n") 
  },
  { 
    cmd: "skills", 
    desc: "Show primary technical competencies", 
    output: `Primary Languages: Java, Python, SQL
Backend: Flask, REST APIs, Relational DBs
AI Automation: n8n, Ollama, llama.cpp, UiPath Studio
Engineering: OOP, DSA, Git Version Control` 
  },
  { 
    cmd: "experience", 
    desc: "Show industry internship details", 
    output: experience.map(e => `${e.title} — ${e.company} (${e.period})\nLocation: ${e.location}\n${e.details.map(d => `  - ${d}`).join("\n")}`).join("\n\n") 
  },
  { 
    cmd: "education", 
    desc: "Show academic background", 
    output: education.map(edu => `${edu.degree}\n${edu.college} (${edu.period}) | ${edu.grade}\nCoursework: ${edu.description}`).join("\n\n") 
  },
  { 
    cmd: "achievements", 
    desc: "Show verified recognitions and awards", 
    output: achievements.map(a => `★ ${a.title} — ${a.event} (${a.year})\n  Project: ${a.project}\n  ${a.description}`).join("\n\n") 
  },
  { 
    cmd: "status", 
    desc: "Display current availability and job search status", 
    output: `● Status: ${profile.status}\nTarget Roles: Software Engineer (Internship / Entry-Level), Backend Developer, AI Automation Engineer\nRelocation: Open to relocation & remote roles` 
  },
  { 
    cmd: "resume", 
    desc: "Open and download resume PDF", 
    output: "Opening resume in new tab..." 
  },
  { 
    cmd: "github", 
    desc: "Open GitHub profile in new tab", 
    output: `Opening ${profile.links.github}...` 
  },
  { 
    cmd: "contact", 
    desc: "Show verified contact channels", 
    output: `Email: ${profile.email}\nGitHub: ${profile.links.github}\nLinkedIn: ${profile.links.linkedin}\nLeetCode: ${profile.links.leetcode}\nHackerRank: ${profile.links.hackerrank}` 
  },
  { 
    cmd: "help", 
    desc: "List all supported terminal commands", 
    output: "" 
  },
  { 
    cmd: "clear", 
    desc: "Clear terminal history", 
    output: "" 
  },
]

const commandMap = Object.fromEntries(commands.map(c => [c.cmd, c]))

export function DeveloperTerminal() {
  const [theme, setTheme] = useState<"default" | "matrix" | "amber" | "cyan">("default")
  const [history, setHistory] = useState<Array<{ type: "input" | "output"; content: string; cmd?: string }>>([
    { type: "output", content: "Dharshan Velumani — Interactive Developer Terminal [Version 2.0]" },
    { type: "output", content: "Type 'help' to see available commands or try 'projects', 'stack', 'status'" },
  ])
  const [input, setInput] = useState("")
  const [cursorVisible, setCursorVisible] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const isMobile = useMediaQuery('(max-width: 768px)')
  const shouldAnimateCursor = !prefersReducedMotion && !isMobile

  useEffect(() => {
    if (!shouldAnimateCursor) {
      setCursorVisible(true)
      return
    }
    const interval = setInterval(() => setCursorVisible((c: boolean) => !c), 530)
    return () => clearInterval(interval)
  }, [shouldAnimateCursor])

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase()
    if (!trimmed) return

    setHistory(prev => [...prev, { type: "input", content: `dharshan@dev:~$ ${cmd}`, cmd }])

    if (trimmed === "clear") {
      setHistory([
        { type: "output", content: "Dharshan Velumani — Interactive Developer Terminal [Version 2.0]" },
        { type: "output", content: "Type 'help' for available commands" }
      ])
      return
    }

    if (trimmed.startsWith("theme ")) {
      const selectedTheme = trimmed.replace("theme ", "").trim()
      if (["default", "matrix", "amber", "cyan"].includes(selectedTheme)) {
        setTheme(selectedTheme as "default" | "matrix" | "amber" | "cyan")
        setHistory(prev => [...prev, { type: "output", content: `Terminal theme switched to [${selectedTheme}] mode.` }])
      } else {
        setHistory(prev => [...prev, { type: "output", content: `Available themes: default, matrix, amber, cyan. (Usage: 'theme matrix')` }])
      }
      return
    }

    if (trimmed === "help") {
      const helpOutput = commands.map(c => `  ${c.cmd.padEnd(14)} ${c.desc}`).join("\n") + "\n  theme <name>   Switch color theme (default, matrix, amber, cyan)"
      setHistory(prev => [...prev, { type: "output", content: helpOutput }])
      return
    }

    const command = commandMap[trimmed]
    if (command) {
      if (command.output) {
        setHistory(prev => [...prev, { type: "output", content: command.output }])
      }
      if (trimmed === "github") {
        window.open(profile.links.github, "_blank", "noopener,noreferrer")
      }
      if (trimmed === "resume") {
        window.open("/Dharshan_Velumani_SoftwareDeveloper_Resume.pdf", "_blank")
      }
    } else {
      setHistory(prev => [...prev, { type: "output", content: `Command not found: '${cmd}'. Type 'help' to view available commands.` }])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    executeCommand(input)
    setInput("")
    inputRef.current?.focus()
  }

  const quickCommands = ["about", "stack", "projects", "skills", "experience", "education", "achievements", "status", "resume", "github", "contact"]

  // Theme styling tokens (Obsidian Black x Champagne Gold default)
  const themeStyles = {
    default: {
      card: "bg-black-950/95 border-black-600 shadow-gold-subtle",
      header: "bg-black-900 border-black-600 text-gray-400",
      prompt: "text-gold-500 font-bold",
      input: "text-white",
      output: "text-gray-400",
      caret: "text-gold-500 caret-gold-500",
    },
    matrix: {
      card: "bg-[#031508]/95 border-[#00ff66]/30 shadow-[0_0_30px_rgba(0,255,102,0.15)]",
      header: "bg-[#05220d] border-[#00ff66]/30 text-[#00ff66]",
      prompt: "text-[#00ff66] font-bold",
      input: "text-[#00ff66]",
      output: "text-[#80ffaa]",
      caret: "text-[#00ff66] caret-[#00ff66]",
    },
    amber: {
      card: "bg-[#140f03]/95 border-[#D4AF37]/30 shadow-[0_0_30px_rgba(212,175,55,0.15)]",
      header: "bg-[#211805] border-[#D4AF37]/30 text-[#D4AF37]",
      prompt: "text-[#D4AF37] font-bold",
      input: "text-[#D4AF37]",
      output: "text-[#F5D76E]",
      caret: "text-[#D4AF37] caret-[#D4AF37]",
    },
    cyan: {
      card: "bg-[#09101d]/95 border-[#00f0ff]/30 shadow-[0_0_30px_rgba(0,240,255,0.15)]",
      header: "bg-[#0e1b30] border-[#00f0ff]/30 text-[#00f0ff]",
      prompt: "text-[#00f0ff] font-bold",
      input: "text-[#00f0ff]",
      output: "text-[#80f8ff]",
      caret: "text-[#00f0ff] caret-[#00f0ff]",
    },
  }[theme]

  return (
    <section id="terminal" className={`${section} relative section-contain`}>
      <div className={containerCustom} style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className={sectionTitle}>Developer CLI Terminal</h2>
          <p className={sectionSubtitle}>Interactive command line interface for recruiters and engineers</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-4xl mx-auto"
        >
          <div className={`${card} ${themeStyles.card} overflow-hidden transition-all duration-300`}>
            <div className={`flex items-center justify-between px-4 py-3 border-b ${themeStyles.header}`}>
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-status-error/80" />
                  <div className="w-3 h-3 rounded-full bg-gold-500/80" />
                  <div className="w-3 h-3 rounded-full bg-status-success/80" />
                </div>
                <span className="text-xs font-mono ml-2">dharshan@dev:~$</span>
              </div>

              {/* Theme selector */}
              <div className="flex items-center gap-1.5 text-xs font-mono">
                <span className="text-gray-500 text-[11px] hidden sm:inline mr-1">theme:</span>
                {(["default", "matrix", "amber", "cyan"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTheme(t)}
                    className={`px-2 py-0.5 rounded text-[11px] uppercase transition-colors cursor-pointer ${
                      theme === t 
                        ? "bg-gold-500 text-black-950 font-bold" 
                        : "bg-black-900 text-gray-400 hover:text-white"
                    }`}
                    aria-label={`Switch to ${t} terminal theme`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div 
              className="p-5 sm:p-6 font-mono text-xs sm:text-sm leading-relaxed min-h-[300px] max-h-[420px] overflow-y-auto"
              aria-live="polite"
            >
              <div className="space-y-1.5">
                {history.map((entry, index) => (
                  <div
                    key={index}
                    className={entry.type === "input" ? themeStyles.prompt : `${themeStyles.output} whitespace-pre-wrap`}
                  >
                    {entry.content}
                  </div>
                ))}
                <div className="flex items-center gap-2 pt-1">
                  <span className={themeStyles.prompt}>dharshan@dev:~$</span>
                  <form onSubmit={handleSubmit} className="flex-1">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyDown={e => e.key === "Tab" && e.preventDefault()}
                      className={`bg-transparent border-none outline-none font-mono text-xs sm:text-sm flex-1 w-full ${themeStyles.input} ${themeStyles.caret}`}
                      placeholder="Type a command (e.g. 'stack', 'projects', 'experience')..."
                      aria-label="Terminal command input"
                    />
                    <span className={`${cursorVisible ? "opacity-100" : "opacity-0"} ${themeStyles.caret} ${shouldAnimateCursor ? "animate-pulse" : ""}`}>_</span>
                  </form>
                </div>
              </div>
            </div>

            <div className="px-4 py-3 bg-black-900/90 border-t border-black-600/80">
              <p className="text-xs text-gray-400 mb-2 font-mono">Quick commands:</p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {quickCommands.map((cmd) => (
                  <button
                    key={cmd}
                    type="button"
                    onClick={() => executeCommand(cmd)}
                    className="px-2.5 py-1 text-xs font-mono text-gray-400 hover:text-gold-400 bg-black-950 border border-black-600 rounded hover:border-gold-500/50 transition-all cursor-pointer"
                  >
                    {cmd}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}