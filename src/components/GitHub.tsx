import { motion } from "framer-motion"
import { GitBranch, Star, Code2, ExternalLink, ChevronRight } from "lucide-react"
import { profile, projects } from "@/data/portfolio"
import { containerCustom, section, sectionTitle, sectionSubtitle, card, badge, badgePrimary, btnGhost } from "@/utils/styles"

export function GitHub() {
  const githubProjects = projects.filter(p => p.github).slice(0, 6)

  return (
    <section id="github" className={`${section} relative`}>
      <div className="absolute inset-0 grid-pattern noise-pattern opacity-50" aria-hidden="true" />
      
      <div className={containerCustom} style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="text-center lg:text-left">
              <h2 className={sectionTitle}>Open Source & GitHub</h2>
              <p className={sectionSubtitle}>Explore my projects, experiments, and developer tools</p>
            </div>
            
            <a 
              href={profile.links.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className={btnGhost}
            >
              <GitBranch className="h-5 w-5" />
              View GitHub Profile
              <ChevronRight className="h-5 w-5" />
            </a>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {githubProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${card} hover:border-primary-500/50 transition-colors`}
            >
              <div className="flex items-start justify-between mb-3">
                <span className={`${badge} ${badgePrimary}`}>{project.category}</span>
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-dark-500 hover:text-primary-400 transition-colors"
                  aria-label={`View ${project.name} on GitHub`}
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>

              <h3 className="text-lg font-bold text-white mb-2">{project.name}</h3>
              <p className="text-dark-400 text-sm mb-4 leading-relaxed">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.slice(0, 4).map((t) => (
                  <span key={t} className={badge}>{t}</span>
                ))}
              </div>

              <div className="flex items-center gap-4 text-sm text-dark-500 border-t border-dark-800 pt-4">
                <span className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5" />
                  0
                </span>
                <span className="flex items-center gap-1">
                  <Code2 className="h-3.5 w-3.5" />
                  {project.tech[0]}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <a 
            href={profile.links.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary-500 text-dark-950 font-semibold rounded-xl hover:bg-primary-400 transition-colors"
          >
            <GitBranch className="h-6 w-6" />
            Explore All Repositories
            <ChevronRight className="h-6 w-6" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}