import { Mail, GitBranch, Link2, Code, Award } from "lucide-react"
import { profile } from "@/data/portfolio"
import { containerCustom } from "@/utils/styles"

export function Footer() {
  const currentYear = 2026

  return (
    <footer className="relative border-t border-black-600 bg-black-950 section-contain">
      <div className={containerCustom} style={{ position: 'relative', zIndex: 1 }}>
        <div className="py-12 lg:py-16">
          <div className="grid md:grid-cols-12 gap-8 mb-10">
            {/* Column 1: Bio */}
            <div className="md:col-span-6 space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg overflow-hidden border border-gold-500/30 flex items-center justify-center bg-black-950">
                  <img src="/logo.png" alt="DV Logo" className="h-full w-full p-1 object-contain" />
                </div>
                <span className="font-bold text-lg text-white font-mono">{profile.name}</span>
              </div>
              <p className="text-gold-500 font-medium text-sm">
                {profile.headline} | {profile.subtitle}
              </p>
              <p className="text-gray-400 text-xs sm:text-sm max-w-md leading-relaxed">
                {profile.description}
              </p>
            </div>

            {/* Column 2: Navigation */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-gray-500 font-semibold">Navigation</h4>
              <nav className="flex flex-col space-y-2 text-xs sm:text-sm">
                <a href="#home" className="text-gray-400 hover:text-gold-500 transition-colors">Home</a>
                <a href="#about" className="text-gray-400 hover:text-gold-500 transition-colors">About</a>
                <a href="#focus" className="text-gray-400 hover:text-gold-500 transition-colors">What I Build</a>
                <a href="#projects" className="text-gray-400 hover:text-gold-500 transition-colors">Projects</a>
                <a href="#skills" className="text-gray-400 hover:text-gold-500 transition-colors">Skills</a>
                <a href="#experience" className="text-gray-400 hover:text-gold-500 transition-colors">Experience</a>
                <a href="#contact" className="text-gray-400 hover:text-gold-500 transition-colors">Contact</a>
              </nav>
            </div>

            {/* Column 3: Profiles & Verified Links */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-gray-500 font-semibold">Verified Links</h4>
              <div className="flex flex-col space-y-2 text-xs sm:text-sm">
                <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-gold-500 transition-colors">
                  <GitBranch className="h-4 w-4" />
                  GitHub
                </a>
                <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-gold-500 transition-colors">
                  <Link2 className="h-4 w-4" />
                  LinkedIn
                </a>
                <a href={profile.links.leetcode} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-gold-500 transition-colors">
                  <Code className="h-4 w-4" />
                  LeetCode
                </a>
                <a href={profile.links.hackerrank} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-gold-500 transition-colors">
                  <Award className="h-4 w-4" />
                  HackerRank
                </a>
                <a href={`mailto:${profile.email}`} className="flex items-center gap-2 text-gray-400 hover:text-gold-500 transition-colors">
                  <Mail className="h-4 w-4" />
                  Email
                </a>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-black-600/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500">
            <p>© {currentYear} {profile.name}. All verified rights reserved.</p>
            <p>Targeting Software Engineering & AI Automation Roles.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}