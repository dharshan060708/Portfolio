import { motion } from "framer-motion"
import { GitBranch, ExternalLink, Code2, FolderGit2 } from "lucide-react"
import { projects, profile } from "@/data/portfolio"
import { containerCustom, section, sectionTitle, sectionSubtitle, card, btnPrimary } from "@/utils/styles"

export function GitHub() {
  return (
    <section id="github" className={`${section} relative section-contain`}>
      <div className={containerCustom} style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className={sectionTitle}>Project Repositories & Open Source</h2>
          <p className={sectionSubtitle}>Direct source code, architecture scripts, and implementation files</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${card} p-6 flex flex-col justify-between hover:border-gold-500/40 transition-all group`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FolderGit2 className="h-4 w-4 text-gold-500" />
                    <span className="text-xs font-mono text-gray-400">Public Repository</span>
                  </div>
                  {project.links.github && (
                    <a 
                      href={project.links.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-1 text-gray-400 hover:text-gold-400 transition-colors"
                      aria-label={`View ${project.name} repository on GitHub`}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-gold-400 transition-colors">
                  {project.name}
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed line-clamp-3">
                  {project.summary}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tech.slice(0, 3).map((t) => (
                    <span key={t} className="px-2 py-0.5 text-[11px] font-mono bg-black-900 border border-black-600 text-gray-400 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-400 border-t border-black-600 pt-4 mt-4 font-mono">
                <span className="flex items-center gap-1.5 text-gold-500">
                  <Code2 className="h-3.5 w-3.5" />
                  {project.tech[0]}
                </span>
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gold-400 transition-colors"
                  >
                    View Code →
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className={btnPrimary}
          >
            <GitBranch className="h-5 w-5" />
            Visit @DharshanVelumani on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  )
}