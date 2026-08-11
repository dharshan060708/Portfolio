import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { profile, projects, codingProfiles } from "@/data/portfolio"
import { containerCustom, section, sectionTitle, sectionSubtitle, card } from "@/utils/styles"

const commands = [
  { cmd: "about", desc: "Show profile information", output: `Name: ${profile.name}
Role: ${profile.title}
Location: ${profile.location}
Education: ${profile.education.degree}
College: ${profile.education.college}
Graduation: ${profile.education.graduation}
CGPA: ${profile.education.cgpa}
Focus: Software Engineering, AI & Automation, Backend Development` },
  { cmd: "whoami", desc: "Display current user and bio", output: `${profile.name} — Final-year BCA student building practical software, AI automation systems, and local LLM tools.` },
  { cmd: "projects", desc: "List all projects", output: projects.map(p => `> ${p.name} [${p.category}] - ${p.description}`).join("\n") },
  { cmd: "skills", desc: "Show technical skills", output: `Programming: Java, Python, SQL, JavaScript, TypeScript
Web/Backend: Flask, REST APIs, HTML5, CSS3, Vite
AI: Ollama, Local LLMs, llama.cpp, Gemini API
Automation: n8n, UiPath Studio, Chrome Automation, Webhooks
Data/BI: Power BI, Google Sheets API
Desktop: Visual Basic 6, ADO, MS Access
Tools: Git, GitHub, Postman, Linux/CLI` },
  { cmd: "experience", desc: "Show experience and internships", output: `1. Python Developer Intern — CodSoft (Coimbatore)
   • Built custom desktop and CLI tools with Python
   • Designed modular application logic and exception handling
   • Managed Git version control and collaborative workflows` },
  { cmd: "education", desc: "Show academic background", output: `Bachelor of Computer Applications (BCA)
KG College of Arts and Science (2024 - 2027)
CGPA: 8.0 / 10 | Focus: Core Java, DBMS, Systems, Data Structures` },
  { cmd: "achievements", desc: "Show recognitions & hackathons", output: `★ 1st Prize — National Level Tech Fest (KG College)
   Project: AI-Powered Multi-Platform Automation System` },
  { cmd: "resume", desc: "Download / view resume PDF", output: "Opening resume..." },
  { cmd: "coding", desc: "Show coding profiles", output: `LeetCode: ${codingProfiles.leetcode.url}
HackerRank: ${codingProfiles.hackerrank.url}` },
  { cmd: "github", desc: "Open GitHub profile", output: `Opening ${profile.links.github}...` },
  { cmd: "contact", desc: "Show contact information", output: `Email: ${profile.email}
GitHub: ${profile.links.github}
LinkedIn: ${profile.links.linkedin}
LeetCode: ${profile.links.leetcode}
HackerRank: ${profile.links.hackerrank}` },
  { cmd: "sudo", desc: "Run superuser command", output: "Permission denied: You are a guest visitor, but you have full privileges to explore!" },
  { cmd: "help", desc: "Show available commands", output: "" },
  { cmd: "clear", desc: "Clear terminal", output: "" },
]

const commandMap = Object.fromEntries(commands.map(c => [c.cmd, c]))

export function DeveloperTerminal() {
  const [theme, setTheme] = useState<"default" | "matrix" | "amber" | "cyan">("default")
  const [history, setHistory] = useState<Array<{ type: "input" | "output"; content: string; cmd?: string }>>([
    { type: "output", content: "Welcome to Dharshan's Developer Terminal v1.0" },
    { type: "output", content: "Type 'help' or try 'theme matrix' / 'theme amber'" },
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

    setHistory(prev => [...prev, { type: "input", content: `dharshan@portfolio:~$ ${cmd}`, cmd }])

    if (trimmed === "clear") {
      setHistory([{ type: "output", content: "Welcome to Dharshan's Developer Terminal v1.0" }, { type: "output", content: "Type 'help' for available commands" }])
      return
    }

    if (trimmed.startsWith("theme ")) {
      const selectedTheme = trimmed.replace("theme ", "").trim()
      if (["default", "matrix", "amber", "cyan"].includes(selectedTheme)) {
        setTheme(selectedTheme as "default" | "matrix" | "amber" | "cyan")
        setHistory(prev => [...prev, { type: "output", content: `Terminal theme switched to [${selectedTheme}] mode!` }])
      } else {
        setHistory(prev => [...prev, { type: "output", content: `Available themes: default, matrix, amber, cyan. (Example: 'theme matrix')` }])
      }
      return
    }

    if (trimmed === "help") {
      const helpOutput = commands.map(c => `  ${c.cmd.padEnd(12)} ${c.desc}`).join("\n") + "\n  theme <name> Switch terminal theme (default, matrix, amber, cyan)"
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
      setHistory(prev => [...prev, { type: "output", content: `Command not found: ${cmd}. Type 'help' for available commands.` }])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    executeCommand(input)
    setInput("")
    inputRef.current?.focus()
  }

  const quickCommands = ["about", "projects", "skills", "experience", "education", "resume", "github", "contact"]

  // Theme styling tokens
  const themeStyles = {
    default: {
      card: "bg-dark-900/90 border-dark-700 shadow-2xl",
      header: "bg-dark-800 border-dark-700 text-dark-400",
      prompt: "text-primary-400",
      input: "text-white",
      output: "text-dark-200",
      caret: "text-primary-500 caret-primary-500",
      glow: "from-primary-500/10 via-transparent to-red-500/10",
    },
    matrix: {
      card: "bg-[#031508]/95 border-[#00ff66]/30 shadow-[0_0_30px_rgba(0,255,102,0.15)]",
      header: "bg-[#05220d] border-[#00ff66]/30 text-[#00ff66]",
      prompt: "text-[#00ff66] font-bold",
      input: "text-[#00ff66]",
      output: "text-[#80ffaa]",
      caret: "text-[#00ff66] caret-[#00ff66]",
      glow: "from-[#00ff66]/20 via-transparent to-[#00ff66]/10",
    },
    amber: {
      card: "bg-[#180e00]/95 border-[#ffb000]/30 shadow-[0_0_30px_rgba(255,176,0,0.15)]",
      header: "bg-[#281800] border-[#ffb000]/30 text-[#ffb000]",
      prompt: "text-[#ffb000] font-bold",
      input: "text-[#ffb000]",
      output: "text-[#ffd480]",
      caret: "text-[#ffb000] caret-[#ffb000]",
      glow: "from-[#ffb000]/20 via-transparent to-[#ffb000]/10",
    },
    cyan: {
      card: "bg-[#09101d]/95 border-[#00f0ff]/30 shadow-[0_0_30px_rgba(0,240,255,0.15)]",
      header: "bg-[#0e1b30] border-[#00f0ff]/30 text-[#00f0ff]",
      prompt: "text-[#00f0ff] font-bold",
      input: "text-[#00f0ff]",
      output: "text-[#80f8ff]",
      caret: "text-[#00f0ff] caret-[#00f0ff]",
      glow: "from-[#00f0ff]/20 via-transparent to-[#ff007f]/10",
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
          <h2 className={sectionTitle}>Developer Terminal</h2>
          <p className={sectionSubtitle}>Interactive command interface — try typing commands or changing themes below</p>
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
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-xs font-mono ml-2">dharshan@portfolio:~$</span>
              </div>

              {/* Quick Theme Selector */}
              <div className="flex items-center gap-1.5 text-xs font-mono">
                <span className="text-dark-500 text-[11px] hidden sm:inline mr-1">theme:</span>
                {(["default", "matrix", "amber", "cyan"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={`px-2 py-0.5 rounded text-[11px] uppercase transition-colors ${
                      theme === t 
                        ? "bg-primary-500 text-dark-950 font-bold" 
                        : "bg-dark-800/80 text-dark-400 hover:text-white"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 font-mono text-sm leading-relaxed min-h-[300px] max-h-[400px] overflow-y-auto">
              <div className="space-y-1">
                {history.map((entry, index) => (
                  <div
                    key={index}
                    className={entry.type === "input" ? themeStyles.prompt : `${themeStyles.output} whitespace-pre-wrap`}
                  >
                    {entry.content}
                  </div>
                ))}
                <div className="flex items-center gap-2 pt-1">
                  <span className={themeStyles.prompt}>dharshan@portfolio:~$</span>
                  <form onSubmit={handleSubmit} className="flex-1">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyDown={e => e.key === "Tab" && e.preventDefault()}
                      className={`bg-transparent border-none outline-none font-mono text-sm flex-1 w-full ${themeStyles.input} ${themeStyles.caret}`}
                      placeholder="Type a command (e.g. 'skills', 'projects', 'theme matrix')..."
                      autoFocus
                    />
                    <span className={`${cursorVisible ? "opacity-100" : "opacity-0"} ${themeStyles.caret} ${shouldAnimateCursor ? "animate-pulse" : ""}`}>_</span>
                  </form>
                </div>
              </div>
            </div>

            <div className="px-4 py-3 bg-dark-800/60 border-t border-dark-700/60">
              <p className="text-xs text-dark-500 mb-2 font-mono">Quick commands:</p>
              <div className="flex flex-wrap gap-2">
                {quickCommands.map((cmd) => (
                  <button
                    key={cmd}
                    type="button"
                    onClick={() => executeCommand(cmd)}
                    className="px-3 py-1 text-xs font-mono text-dark-300 hover:text-primary-400 bg-dark-900 border border-dark-700 rounded hover:border-primary-500/50 transition-all cursor-pointer"
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