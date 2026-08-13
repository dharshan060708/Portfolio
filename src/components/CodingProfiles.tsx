import { motion } from "framer-motion"
import { Code2, Trophy, GitBranch, ExternalLink } from "lucide-react"
import { codingProfiles, profile } from "@/data/portfolio"
import { containerCustom, section, sectionTitle, sectionSubtitle, card } from "@/utils/styles"

export function CodingProfiles() {
  const profilesList = [
    {
      title: "LeetCode",
      category: "Data Structures & Algorithms",
      icon: Code2,
      description: codingProfiles.leetcode.description,
      topics: codingProfiles.leetcode.topics,
      url: codingProfiles.leetcode.url,
      actionText: "View LeetCode Profile",
    },
    {
      title: "HackerRank",
      category: "Programming & Problem Solving",
      icon: Trophy,
      description: codingProfiles.hackerrank.description,
      topics: ["Java", "Python", "SQL", "Problem Solving"],
      url: codingProfiles.hackerrank.url,
      actionText: "View HackerRank Profile",
    },
    {
      title: "GitHub",
      category: "Version Control & Open Source",
      icon: GitBranch,
      description: "Hosting source code repositories for local LLM tools, RPA browser bots, and backend applications.",
      topics: ["Devil-In-AI", "AI-Lead-Management", "Web-Form-Automation", "Pharmacy-System"],
      url: profile.links.github,
      actionText: "View GitHub Repositories",
    },
  ]

  return (
    <section id="coding" className={`${section} relative section-contain`}>
      <div className={containerCustom} style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className={sectionTitle}>Coding & Engineering Profiles</h2>
          <p className={sectionSubtitle}>
            Continuous practice in algorithmic thinking, data structures, and collaborative software development
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {profilesList.map((p, index) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`${card} p-6 flex flex-col justify-between hover:border-gold-500/40 transition-all group`}
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl border border-gold-500/20 bg-gold-500/10 text-gold-500">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-gold-400 transition-colors">
                        {p.title}
                      </h3>
                      <p className="text-xs font-mono text-gray-500">{p.category}</p>
                    </div>
                  </div>

                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                    {p.description}
                  </p>

                  <div>
                    <p className="text-[11px] font-mono uppercase text-gray-500 mb-2">Focus Areas</p>
                    <div className="flex flex-wrap gap-1.5">
                      {p.topics.map((t) => (
                        <span key={t} className="px-2 py-0.5 text-xs font-mono bg-black-900 border border-black-600 text-gray-400 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-5 mt-5 border-t border-black-600">
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between w-full py-2 px-3 rounded-lg text-xs font-semibold text-gold-500 bg-gold-500/5 hover:bg-gold-500/15 border border-gold-500/20 transition-colors"
                  >
                    <span>{p.actionText}</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  )
}