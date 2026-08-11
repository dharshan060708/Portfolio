import { GitBranch, ExternalLink, ChevronRight, Star, X, Layers } from "lucide-react"
import { projects } from "@/data/portfolio"
import { containerCustom, section, sectionTitle, sectionSubtitle, card, badge, badgePrimary, btnGhost, btnPrimary } from "@/utils/styles"
import { useState, useEffect } from "react"
import { useScrollAnimation, useStaggeredScrollAnimation } from "@/hooks/useScrollAnimation"

const allTags = ["All", "AI", "Automation", "Web", "Desktop", "RPA"]

export function Projects() {
  const [activeFilter, setActiveFilter] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)

  const filteredProjects = projects.filter(p => {
    const matchesCategory = activeFilter === "All" || p.tags.includes(activeFilter)
    const matchesSearch = !searchQuery.trim() || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const featuredProject = !searchQuery.trim() && activeFilter === "All" 
    ? projects.find(p => p.featured) 
    : undefined

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation<HTMLDivElement>()
  const { ref: featuredRef, isVisible: featuredVisible } = useScrollAnimation<HTMLDivElement>()
  const { containerRef, visibleItems } = useStaggeredScrollAnimation<HTMLDivElement>()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null)
    }
    if (selectedProject) {
      window.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  }, [selectedProject])

  return (
    <section id="projects" className={`${section} relative section-contain`}>
      <div className={containerCustom} style={{ position: 'relative', zIndex: 1 }}>
        <div
          ref={headerRef}
          className={`text-center max-w-3xl mx-auto mb-12 scroll-reveal ${headerVisible ? 'is-visible' : ''}`}
        >
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
            <div className="text-left">
              <h2 className={sectionTitle}>Selected Projects</h2>
              <p className={sectionSubtitle}>Software built to solve practical problems</p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Search Bar */}
              <div className="relative flex-1 sm:w-64">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search tech, title, etc..."
                  className="w-full pl-9 pr-8 py-2 bg-dark-900 border border-dark-700 focus:border-primary-500 rounded-lg text-xs text-white placeholder-dark-500 outline-none transition-colors"
                />
                <span className="absolute left-3 top-2.5 text-dark-500">
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                </span>
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-2.5 text-dark-500 hover:text-white"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              {/* Categories */}
              <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Project categories">
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
        </div>

        {featuredProject && (
          <div
            ref={featuredRef}
            className={`mb-16 scroll-reveal ${featuredVisible ? 'is-visible' : ''}`}
          >
            <FeaturedProjectCard 
              project={featuredProject} 
              onOpenDetails={() => setSelectedProject(featuredProject)} 
            />
          </div>
        )}

        <div ref={containerRef} className="grid md:grid-cols-2 gap-6">
          {filteredProjects.filter(p => !p.featured).map((project, index) => (
            <div
              key={project.id}
              className={`scroll-reveal-stagger ${visibleItems.has(index) ? 'is-visible' : ''}`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <ProjectCard 
                project={project} 
                onOpenDetails={() => setSelectedProject(project)} 
              />
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

      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedProject(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
        >
          <div 
            className="relative w-full max-w-2xl bg-dark-900 border border-dark-700 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 text-dark-400 hover:text-white rounded-lg hover:bg-dark-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className={`${badge} ${badgePrimary}`}>{selectedProject.category}</span>
              {selectedProject.achievement && (
                <span className="badge bg-amber-500/10 border-amber-500/20 text-amber-400 text-xs">
                  {selectedProject.achievement}
                </span>
              )}
            </div>

            <h3 id="modal-project-title" className="text-2xl font-bold text-white mb-3">
              {selectedProject.name}
            </h3>

            <p className="text-dark-300 leading-relaxed mb-6">
              {selectedProject.description}
            </p>

            {selectedProject.architecture && (
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-dark-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Layers className="h-4 w-4 text-primary-400" />
                  System Architecture & Data Flow
                </h4>
                <div className="bg-dark-950 border border-dark-800 rounded-xl p-4 font-mono text-xs text-primary-300 overflow-x-auto leading-relaxed">
                  <pre className="whitespace-pre-wrap">{selectedProject.architecture}</pre>
                </div>
              </div>
            )}

            <div className="mb-6">
              <h4 className="text-sm font-semibold text-dark-400 uppercase tracking-wider mb-2">
                Tech Stack & Libraries
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tech.map(t => (
                  <span key={t} className={badge}>{t}</span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-4 border-t border-dark-800">
              {selectedProject.github && (
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={btnPrimary}
                >
                  <GitBranch className="h-4 w-4" />
                  View GitHub Source
                </a>
              )}
              {selectedProject.demo && (
                <a
                  href={selectedProject.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={btnGhost}
                >
                  <ExternalLink className="h-4 w-4" />
                  Live Preview
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

function FeaturedProjectCard({ project, onOpenDetails }: { project: typeof projects[0]; onOpenDetails: () => void }) {
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
            <button
              onClick={onOpenDetails}
              className={btnGhost}
            >
              <Layers className="h-4 w-4" />
              Architecture Details
            </button>
          </div>
        </div>

        <div className="relative cursor-pointer" onClick={onOpenDetails}>
          <div className="bg-dark-950 border border-dark-700 hover:border-primary-500/40 transition-colors rounded-xl p-6 font-mono text-sm text-dark-300 overflow-x-auto">
            <div className="text-xs text-primary-400 font-sans font-medium mb-2 flex items-center justify-between">
              <span>SYSTEM DATA FLOW</span>
              <span className="text-dark-500">Click to expand</span>
            </div>
            <pre className="whitespace-pre-wrap leading-relaxed">{project.architecture}</pre>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ project, onOpenDetails }: { project: typeof projects[0]; onOpenDetails: () => void }) {
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

      <h3 
        onClick={onOpenDetails}
        className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors cursor-pointer"
      >
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
        <button
          type="button"
          onClick={onOpenDetails}
          className="flex-1 text-center py-2 px-4 text-sm font-medium text-dark-300 hover:text-primary-400 transition-colors rounded-lg hover:bg-dark-800 cursor-pointer"
        >
          <Layers className="h-4 w-4 inline-block mr-1" />
          Details
        </button>
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