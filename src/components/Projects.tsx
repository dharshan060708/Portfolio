import { GitBranch, ExternalLink, ChevronRight, Star } from "lucide-react"
import { projects } from "@/data/portfolio"
import { containerCustom, section, sectionTitle, sectionSubtitle, card, badge, badgePrimary, btnGhost } from "@/utils/styles"
import { useState } from "react"
import { useScrollAnimation, useStaggeredScrollAnimation } from "@/hooks/useScrollAnimation"

const allTags = ["All", "AI", "Automation", "Web", "Desktop", "RPA"]

export function Projects() {
  const [activeFilter, setActiveFilter] = useState("All")

  const filteredProjects = activeFilter === "All"
    ? projects
    : projects.filter(p => p.tags.includes(activeFilter))

  const featuredProject = projects.find(p => p.featured)

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation<HTMLDivElement>()
  const { ref: featuredRef, isVisible: featuredVisible } = useScrollAnimation<HTMLDivElement>()
  const { containerRef, visibleItems } = useStaggeredScrollAnimation<HTMLDivElement>(
    filteredProjects.filter(p => !p.featured).length,
    100
  )

  return (
    <section id="projects" className={`${section} relative`}>
      <div className="absolute inset-0 grid-pattern noise-pattern opacity-50" aria-hidden="true" />
      
      <div className={containerCustom} style={{ position: 'relative', zIndex: 1 }}>
        <div
          ref={headerRef}
          className={`text-center max-w-3xl mx-auto mb-12 scroll-reveal ${headerVisible ? 'is-visible' : ''}`}
        >
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
            <div>
              <h2 className={sectionTitle}>Selected Projects</h2>
              <p className={sectionSubtitle}>Software built to solve practical problems</p>
            </div>
            
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Project categories">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveFilter(tag)}
                  role="tab"
                  aria-selected={activeFilter === tag}
                  className={`${badge} ${activeFilter === tag ? "bg-primary-500 text-dark-950 border-primary-500" : "bg-dark-800 border-dark-600 text-dark-300 hover:border-primary-500 hover:text-primary-400"} cursor-pointer transition-all duration-200`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {featuredProject && (
          <div
            ref={featuredRef}
            className={`mb-16 scroll-reveal ${featuredVisible ? 'is-visible' : ''}`}
          >
            <FeaturedProjectCard project={featuredProject} />
          </div>
        )}

        <div ref={containerRef} className="grid md:grid-cols-2 gap-6">
          {filteredProjects.filter(p => !p.featured).map((project, index) => (
            <div
              key={project.id}
              className={`scroll-reveal-stagger ${visibleItems.has(index) ? 'is-visible' : ''}`}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        <div
          className={`text-center mt-12 scroll-reveal ${visibleItems.size > 0 ? 'is-visible' : ''}`}
        >
          <a 
            href="https://github.com/DharshanVelumani" 
            target="_blank" 
            rel="noopener noreferrer"
            className={btnGhost}
          >
            <GitBranch className="h-5 w-5" />
            More Projects on GitHub
            <ChevronRight className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  )
}

function FeaturedProjectCard({ project }: { project: typeof projects[0] }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-dark-700 bg-dark-900/50 group">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-red-500/5" />
      
      <div className="relative p-8 lg:p-12 grid lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium">
            <Star className="h-3.5 w-3.5" />
            Flagship Project
          </div>

          <div className="space-y-3">
            <h3 className="text-3xl lg:text-4xl font-bold text-white">{project.name}</h3>
            <p className="text-lg text-dark-300">{project.category}</p>
          </div>

          <p className="text-dark-400 leading-relaxed text-lg">{project.description}</p>

          <div className="flex flex-wrap gap-2">
            {project.tech.slice(0, 6).map((t) => (
              <span key={t} className={`${badge} ${badgePrimary}`}>{t}</span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <a 
              href={project.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-dark-950 font-medium rounded-lg hover:bg-primary-400 transition-colors group"
            >
              View on GitHub
              <GitBranch className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="bg-dark-950 border border-dark-700 rounded-xl p-6 font-mono text-sm text-dark-300 overflow-x-auto">
            <pre className="whitespace-pre-wrap leading-relaxed">{project.architecture}</pre>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ project }: { project: typeof projects[0] }) {
  return (
    <div className={`${card} h-full flex flex-col group transition-transform duration-300 hover:-translate-y-2`}>
      <div className="flex items-start justify-between mb-4">
        <span className={`${badge} ${badgePrimary}`}>{project.category}</span>
        {project.achievement && (
          <span className="badge bg-amber-500/10 border-amber-500/20 text-amber-400 text-xs">
            {project.achievement}
          </span>
        )}
      </div>

      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
        {project.name}
      </h3>

      <p className="text-dark-400 mb-6 flex-1 leading-relaxed">{project.description}</p>

      <div className="flex flex-wrap gap-2 mb-6">
        {project.tech.slice(0, 5).map((t) => (
          <span key={t} className={badge}>{t}</span>
        ))}
        {project.tech.length > 5 && (
          <span className={badge}>+{project.tech.length - 5} more</span>
        )}
      </div>

      <div className="flex items-center gap-4 pt-4 border-t border-dark-800">
        <a 
          href={project.github} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex-1 text-center py-2 px-4 text-sm font-medium text-dark-300 hover:text-primary-400 transition-colors rounded-lg hover:bg-dark-800"
        >
          <GitBranch className="h-4 w-4 inline-block mr-1" />
          Code
        </a>
        {project.demo && (
          <a 
            href={project.demo} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1 text-center py-2 px-4 text-sm font-medium text-dark-300 hover:text-primary-400 transition-colors rounded-lg hover:bg-dark-800"
          >
            <ExternalLink className="h-4 w-4 inline-block mr-1" />
            Demo
          </a>
        )}
      </div>
    </div>
  )
}