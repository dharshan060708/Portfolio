import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Menu, X, GitBranch, Terminal as TerminalIcon } from "lucide-react"
import { profile } from "@/data/portfolio"
import { containerCustom, btnGhost } from "@/utils/styles"

const navItems = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#coding", label: "Coding" },
  { href: "#experience", label: "Experience" },
  { href: "#achievements", label: "Achievements" },
  { href: "#contact", label: "Contact" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-dark-950/90 backdrop-blur-md border-b border-dark-800" : "bg-transparent"
      }`}
    >
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

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-dark-300 hover:text-white transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:w-0 after:bg-primary-500 hover:after:w-full after:transition-all"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                {item.label}
              </motion.a>
            ))}
            <motion.a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className={btnGhost}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <GitBranch className="h-4 w-4" />
              GitHub
            </motion.a>
          </div>

          <div className="flex md:hidden items-center gap-4">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-dark-300 hover:text-white hover:bg-dark-800 transition-colors"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              whileTap={{ scale: 0.9 }}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={isOpen ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
          className="md:hidden py-4 border-t border-dark-800"
        >
          <div className="flex flex-col gap-2">
            {navItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="px-4 py-3 text-dark-300 hover:text-white hover:bg-dark-800 rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * index }}
              >
                {item.label}
              </motion.a>
            ))}
            <motion.a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 text-center text-primary-500 hover:text-primary-400 font-medium"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <GitBranch className="h-5 w-5 inline-block mr-2" /> GitHub
            </motion.a>
          </div>
        </motion.div>
      </nav>
    </motion.header>
  )
}