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
  { cmd: "projects", desc: "List all projects", output: projects.map(p => `> ${p.name} (${p.category})`).join("\n") },
  { cmd: "skills", desc: "Show technical skills", output: `Programming: Java, Python, SQL, JavaScript
Web/Backend: Flask, REST APIs, TypeScript, Vite
AI: Ollama, Local LLMs, llama.cpp, Gemini API
Automation: n8n, UiPath, Chrome Automation
Data/BI: Power BI, Google Sheets API
Desktop: Visual Basic 6, ADO, MS Access
Tools: Git, GitHub` },
  { cmd: "coding", desc: "Show coding profiles", output: `LeetCode: ${codingProfiles.leetcode.url}
HackerRank: ${codingProfiles.hackerrank.url}` },
  { cmd: "github", desc: "Open GitHub profile", output: `Opening ${profile.links.github}...` },
  { cmd: "contact", desc: "Show contact information", output: `Email: ${profile.email}
GitHub: ${profile.links.github}
LinkedIn: ${profile.links.linkedin}
LeetCode: ${profile.links.leetcode}
HackerRank: ${profile.links.hackerrank}` },
  { cmd: "help", desc: "Show available commands", output: "" },
  { cmd: "clear", desc: "Clear terminal", output: "" },
]

const commandMap = Object.fromEntries(commands.map(c => [c.cmd, c]))

export function DeveloperTerminal() {
  const [history, setHistory] = useState<Array<{ type: "input" | "output"; content: string; cmd?: string }>>([
    { type: "output", content: "Welcome to Dharshan's Developer Terminal v1.0" },
    { type: "output", content: "Type 'help' for available commands" },
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

    if (trimmed === "help") {
      const helpOutput = commands.map(c => `  ${c.cmd.padEnd(10)} ${c.desc}`).join("\n")
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

  const quickCommands = ["about", "projects", "skills", "coding", "github", "contact"]

  return (
    <section id="terminal" className={`${section} relative`}>
      <div className="absolute inset-0 grid-pattern noise-pattern opacity-50" aria-hidden="true" />
      
      <div className={containerCustom} style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className={sectionTitle}>Developer Terminal</h2>
          <p className={sectionSubtitle}>Interactive command interface — try typing commands below</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-4xl mx-auto"
        >
          <div className={`${card} overflow-hidden`}>
            <div className="flex items-center gap-2 px-4 py-3 bg-dark-800 border-b border-dark-700">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="flex-1 text-center text-xs text-dark-500 font-mono">dharshan@portfolio:~$</div>
            </div>

            <div className="p-6 font-mono text-sm text-dark-200 leading-relaxed min-h-[300px] max-h-[400px] overflow-y-auto">
              <div className="space-y-1">
                {history.map((entry, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={entry.type === "input" ? "text-primary-400" : "text-dark-300 whitespace-pre-wrap"}
                  >
                    {entry.content}
                  </motion.div>
                ))}
                <div className="flex items-center gap-2">
                  <span className="text-primary-400">dharshan@portfolio:~$</span>
                  <form onSubmit={handleSubmit} className="flex-1">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyDown={e => e.key === "Tab" && e.preventDefault()}
                      className="bg-transparent border-none outline-none text-white font-mono text-sm flex-1 caret-primary-500"
                      placeholder="Type a command..."
                      autoFocus
                    />
                    <span className={`${cursorVisible ? "opacity-100" : "opacity-0"} text-primary-500 ${shouldAnimateCursor ? "animate-pulse" : ""}`}>_</span>
                  </form>
                </div>
              </div>
            </div>

            <div className="px-4 py-3 bg-dark-800 border-t border-dark-700">
              <p className="text-xs text-dark-500 mb-2">Quick commands:</p>
              <div className="flex flex-wrap gap-2">
                {quickCommands.map((cmd) => (
                  <motion.button
                    key={cmd}
                    type="button"
                    onClick={() => executeCommand(cmd)}
                    className="px-3 py-1 text-xs font-mono text-dark-400 hover:text-primary-400 bg-dark-900 border border-dark-600 rounded hover:border-primary-500/50 transition-all"
                    whileTap={{ scale: 0.95 }}
                  >
                    {cmd}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}