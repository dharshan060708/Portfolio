import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Menu, X, GitBranch, Terminal as TerminalIcon, Search, FileText, ExternalLink, ArrowRight } from "lucide-react"
import { profile } from "@/data/portfolio"
import { containerCustom } from "@/utils/styles"

const navItems = [
  { href: "#home", label: "Home", shortcut: "H" },
  { href: "#about", label: "About", shortcut: "A" },
  { href: "#focus", label: "Focus", shortcut: "F" },
  { href: "#projects", label: "Projects", shortcut: "P" },
  { href: "#skills", label: "Skills", shortcut: "S" },
  { href: "#coding", label: "Coding", shortcut: "C" },
  { href: "#experience", label: "Experience", shortcut: "E" },
  { href: "#achievements", label: "Achievements", shortcut: "T" },
  { href: "#contact", label: "Contact", shortcut: "M" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20)
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight
          if (totalHeight > 0) {
            setScrollProgress((window.scrollY / totalHeight) * 100)
          }
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        setPaletteOpen(prev => !prev)
      }
      if (e.key === "Escape") {
        setPaletteOpen(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const filteredCommands = navItems.filter(item => 
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-dark-950/90 backdrop-blur-md border-b border-dark-800 shadow-lg" : "bg-transparent"
        }`}
      >
        {/* Top Scroll Progress Indicator */}
        <div 
          className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-amber-500 via-primary-500 to-red-500 transition-all duration-150 z-50"
          style={{ width: `${scrollProgress}%` }}
        />

        <nav className={containerCustom} aria-label="Main navigation">
          <div className="flex h-16 items-center justify-between">
            <motion.a
              href="#home"
              className="flex items-center gap-2 font-bold text-xl text-white"
              aria-label="Dharshan Velumani - Home"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <TerminalIcon className="h-6 w-6 text-primary-500" />
              <span>DV</span>
            </motion.a>

            <div className="hidden lg:flex items-center gap-6">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-dark-300 hover:text-white transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:w-0 after:bg-primary-500 hover:after:w-full after:transition-all"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index }}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {/* Command Palette Trigger */}
              <button
                onClick={() => setPaletteOpen(true)}
                className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono text-dark-400 bg-dark-900/80 hover:bg-dark-800 border border-dark-700 hover:border-primary-500/40 rounded-lg transition-colors"
                aria-label="Open command palette"
              >
                <Search className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Search</span>
                <kbd className="px-1.5 py-0.5 text-[10px] bg-dark-800 rounded border border-dark-600 text-dark-300">
                  Ctrl K
                </kbd>
              </button>

              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-dark-300 hover:text-white bg-dark-800/80 hover:bg-dark-700 border border-dark-700 rounded-lg transition-colors"
              >
                <GitBranch className="h-3.5 w-3.5" />
                GitHub
              </a>

              <div className="flex lg:hidden items-center">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-2 rounded-lg text-dark-300 hover:text-white hover:bg-dark-800 transition-colors"
                  aria-label={isOpen ? "Close menu" : "Open menu"}
                  aria-expanded={isOpen}
                >
                  {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="lg:hidden py-4 border-t border-dark-800 animate-fade-in">
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="px-4 py-2.5 text-dark-300 hover:text-white hover:bg-dark-800 rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 text-center text-primary-400 hover:text-primary-300 font-medium bg-dark-900 border border-dark-700 rounded-lg mt-2"
                >
                  <GitBranch className="h-4 w-4 inline mr-2" /> GitHub
                </a>
              </div>
            </div>
          )}
        </nav>
      </motion.header>

      {/* Command Palette Modal */}
      {paletteOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-dark-950/80 backdrop-blur-sm animate-fade-in"
          onClick={() => setPaletteOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div 
            className="w-full max-w-xl bg-dark-900 border border-dark-700 rounded-2xl shadow-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-dark-700 bg-dark-850">
              <Search className="h-5 w-5 text-dark-400" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Jump to section or action..."
                className="w-full bg-transparent border-none outline-none text-white text-sm placeholder-dark-500 font-sans"
              />
              <button 
                onClick={() => setPaletteOpen(false)} 
                className="p-1 text-dark-400 hover:text-white rounded"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-2 max-h-80 overflow-y-auto space-y-1">
              <div className="px-3 py-1.5 text-xs font-semibold text-dark-500 uppercase tracking-wider">
                Navigation
              </div>
              {filteredCommands.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setPaletteOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-dark-200 hover:text-white hover:bg-dark-800 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-primary-400" />
                    {item.label}
                  </span>
                  <kbd className="px-1.5 py-0.5 text-[10px] bg-dark-950 border border-dark-700 rounded text-dark-400">
                    {item.shortcut}
                  </kbd>
                </a>
              ))}

              <div className="px-3 py-1.5 text-xs font-semibold text-dark-500 uppercase tracking-wider mt-2">
                Quick Actions
              </div>
              <a
                href="/Dharshan_Velumani_SoftwareDeveloper_Resume.pdf"
                download
                onClick={() => setPaletteOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-dark-200 hover:text-white hover:bg-dark-800 transition-colors"
              >
                <FileText className="h-4 w-4 text-amber-400" />
                Download Resume PDF
              </a>
              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setPaletteOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-dark-200 hover:text-white hover:bg-dark-800 transition-colors"
              >
                <GitBranch className="h-4 w-4 text-blue-400" />
                Open GitHub Profile
                <ExternalLink className="h-3.5 w-3.5 ml-auto text-dark-500" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}