import { motion } from "framer-motion"
import { Terminal, Mail, GitBranch, Link2, Code, Award, Heart } from "lucide-react"
import { profile } from "@/data/portfolio"
import { containerCustom } from "@/utils/styles"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-dark-800">
      <div className="absolute inset-0 grid-pattern noise-pattern opacity-50" aria-hidden="true" />
      
      <div className={containerCustom} style={{ position: 'relative', zIndex: 1 }}>
        <div className="py-12 lg:py-16">
          <div className="grid lg:grid-cols-4 gap-12 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-6"
            >
              <div className="flex items-center gap-2">
                <Terminal className="h-8 w-8 text-primary-500" />
                <span className="font-bold text-xl text-white">DV</span>
              </div>
              <p className="text-dark-400 max-w-md leading-relaxed">
                {profile.name} — {profile.title}
              </p>
              <p className="text-dark-500 text-sm">
                Final-year BCA student building practical software, AI-powered automation systems, local AI tools, and backend applications.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-dark-400 hover:text-primary-400 transition-colors">
                  <GitBranch className="h-5 w-5" />
                  GitHub
                </a>
                <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-dark-400 hover:text-blue-400 transition-colors">
                  <Link2 className="h-5 w-5" />
                  LinkedIn
                </a>
                <a href={profile.links.leetcode} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-dark-400 hover:text-orange-400 transition-colors">
                  <Code className="h-5 w-5" />
                  LeetCode
                </a>
                <a href={profile.links.hackerrank} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-dark-400 hover:text-green-400 transition-colors">
                  <Award className="h-5 w-5" />
                  HackerRank
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              <h4 className="font-semibold text-white">Connect</h4>
              <div className="space-y-3">
                <a href={`mailto:${profile.email}`} className="flex items-center gap-3 text-dark-400 hover:text-primary-400 transition-colors group">
                  <Mail className="h-5 w-5" />
                  <span>{profile.email}</span>
                </a>
                <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-dark-400 hover:text-white transition-colors group">
                  <GitBranch className="h-5 w-5" />
                  <span>GitHub Profile</span>
                </a>
                <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-dark-400 hover:text-blue-400 transition-colors group">
                  <Link2 className="h-5 w-5" />
                  <span>LinkedIn Profile</span>
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <h4 className="font-semibold text-white">Quick Links</h4>
              <nav className="space-y-3">
                <a href="#projects" className="text-dark-400 hover:text-primary-400 transition-colors">Projects</a>
                <a href="#skills" className="text-dark-400 hover:text-primary-400 transition-colors">Tech Stack</a>
                <a href="#coding" className="text-dark-400 hover:text-primary-400 transition-colors">Coding Profiles</a>
                <a href="#experience" className="text-dark-400 hover:text-primary-400 transition-colors">Experience</a>
                <a href="#contact" className="text-dark-400 hover:text-primary-400 transition-colors">Contact</a>
              </nav>
            </motion.div>
          </div>

          <div className="pt-8 border-t border-dark-800">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-dark-500 text-sm"
              >
                © {currentYear} {profile.name}. All rights reserved.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-dark-500 text-sm flex items-center gap-2"
              >
                Built with curiosity, code, and automation.
                <Heart className="h-4 w-4 text-red-500" />
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}