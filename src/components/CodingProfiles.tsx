import { motion } from "framer-motion"
import { Code, Trophy, ChevronRight } from "lucide-react"
import { codingProfiles } from "@/data/portfolio"
import { containerCustom, section, sectionTitle, sectionSubtitle, card, badge, badgePrimary } from "@/utils/styles"

export function CodingProfiles() {
  return (
    <section id="coding" className={`${section} relative`}>
      <div className="absolute inset-0 grid-pattern noise-pattern opacity-50" aria-hidden="true" />
      
      <div className={containerCustom} style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className={sectionTitle}>Problem Solving Beyond Projects</h2>
          <p className={sectionSubtitle}>
            Continuously practicing algorithms, data structures, and technical problem solving
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`${card} h-full relative overflow-hidden group`}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-yellow-500/10 to-transparent rounded-full blur-2xl" />
            
            <div className="relative p-6 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-yellow-500/10">
                  <Code className="h-7 w-7 text-yellow-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{codingProfiles.leetcode.title}</h3>
                  <p className="text-sm text-dark-500">Problem Solving</p>
                </div>
              </div>

              <p className="text-dark-400 leading-relaxed">{codingProfiles.leetcode.description}</p>

              <div className="flex flex-wrap gap-2">
                {codingProfiles.leetcode.topics.map((topic) => (
                  <span key={topic} className={`${badge} ${badgePrimary}`}>{topic}</span>
                ))}
              </div>

              <a 
                href={codingProfiles.leetcode.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 font-medium transition-colors group mt-4 block"
              >
                View LeetCode Profile
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`${card} h-full relative overflow-hidden group`}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-green-500/10 to-transparent rounded-full blur-2xl" />
            
            <div className="relative p-6 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-green-500/10">
                  <Trophy className="h-7 w-7 text-green-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{codingProfiles.hackerrank.title}</h3>
                  <p className="text-sm text-dark-500">Programming Practice</p>
                </div>
              </div>

              <p className="text-dark-400 leading-relaxed">{codingProfiles.hackerrank.description}</p>

              <div className="flex flex-wrap gap-2">
                <span className={badge}>Badges</span>
                <span className={badge}>Certifications</span>
                <span className={badge}>Skills</span>
                <span className={badge}>Problem Solving</span>
              </div>

              <a 
                href={codingProfiles.hackerrank.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 font-medium transition-colors group mt-4 block"
              >
                View HackerRank Profile
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}