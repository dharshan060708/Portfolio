import { GitBranch, ExternalLink, ChevronRight, Star, X, Layers, CheckCircle2, AlertCircle, Terminal } from "lucide-react"
import { projects, ProjectItem } from "@/data/portfolio"
import { containerCustom, section, sectionTitle, sectionSubtitle, card, badge, badgePrimary, btnGhost, btnPrimary } from "@/utils/styles"
import { useState, useEffect, useRef } from "react"
import { useScrollAnimation, useStaggeredScrollAnimation } from "@/hooks/useScrollAnimation"

const allTags = ["All", "AI", "Automation", "Developer Tools", "Backend", "Desktop", "RPA"]

export function Projects() {
  const [activeFilter, setActiveFilter] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null)
  const lastActiveElementRef = useRef<HTMLElement | null>(null)
  const modalRef = useRef<HTMLDivElement | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)

  const filteredProjects = projects.filter(p => {
    const matchesCategory = activeFilter === "All" || p.tags.some(t => t.toLowerCase() === activeFilter.toLowerCase())
    const matchesSearch = !searchQuery.trim() || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const featuredProject = !searchQuery.trim() && activeFilter === "All" 
    ? projects.find(p => p.featured) 
    : undefined

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation<HTMLDivElement>()
  const { ref: featuredRef, isVisible: featuredVisible } = useScrollAnimation<HTMLDivElement>()
  const { containerRef, visibleItems } = useStaggeredScrollAnimation<HTMLDivElement>()

  const handleOpenModal = (project: ProjectItem) => {
    lastActiveElementRef.current = document.activeElement as HTMLElement
    setSelectedProject(project)
  }

  const handleCloseModal = () => {
    setSelectedProject(null)
    if (lastActiveElementRef.current) {
      lastActiveElementRef.current.focus()
    }
  }

  // Modal accessibility: Focus Trap & Escape Key Handler
  useEffect(() => {
    if (!selectedProject) {
      document.body.style.overflow = "unset"
      return
    }

    document.body.style.overflow = "hidden"
    closeButtonRef.current?.focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleCloseModal()
        return
      }

      // Focus trap
      if (e.key === "Tab" && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        if (focusableElements.length === 0) return

        const firstElement = focusableElements[0]
        const lastElement = focusableElements[focusableElements.length - 1]

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault()
            lastElement.focus()
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault()
            firstElement.focus()
          }
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
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
              <h2 className={sectionTitle}>Featured Engineering Projects</h2>
              <p className={sectionSubtitle}>Real-world software, AI automation pipelines, and developer tooling built from the ground up</p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Search Bar */}
              <div className="relative flex-1 sm:w-64">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Filter by tech (e.g. Python, SQL)..."
                  className="w-full pl-9 pr-8 py-2 bg-black-900 border border-black-600 focus:border-gold-500 rounded-lg text-xs text-white placeholder-gray-500 outline-none transition-colors"
                />
                <span className="absolute left-3 top-2.5 text-gray-400">
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                </span>
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-2.5 text-gray-400 hover:text-white cursor-pointer"
                    aria-label="Clear project search query"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              {/* Category Filter Badges */}
              <div className="flex flex-wrap gap-1.5" aria-label="Project categories">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setActiveFilter(tag)}
                    aria-pressed={activeFilter === tag}
                    className={`${badge} ${activeFilter === tag ? "bg-gold-500 text-black-950 border-gold-500 font-semibold" : "bg-black-800 border-black-600 text-gray-400 hover:border-gold-500 hover:text-gold-400"} cursor-pointer transition-all duration-200`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Flagship Project Card */}
        {featuredProject && (
          <div
            ref={featuredRef}
            className={`mb-12 scroll-reveal ${featuredVisible ? 'is-visible' : ''}`}
          >
            <FeaturedProjectCard 
              project={featuredProject} 
              onOpenDetails={() => handleOpenModal(featuredProject)} 
            />
          </div>
        )}

        {/* Supporting Projects Grid */}
        <div ref={containerRef} className="grid md:grid-cols-2 gap-6">
          {filteredProjects.filter(p => !p.featured).map((project, index) => (
            <div
              key={project.id}
              className={`scroll-reveal-stagger ${visibleItems.has(index) ? 'is-visible' : ''}`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <ProjectCard 
                project={project} 
                onOpenDetails={() => handleOpenModal(project)} 
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
            Explore All Open Source Repositories on GitHub
            <ChevronRight className="h-5 w-5" />
          </a>
        </div>
      </div>

      {/* Accessible Case Study & Architecture Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black-950/85 backdrop-blur-md animate-fade-in"
          onClick={handleCloseModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
        >
          <div 
            ref={modalRef}
            className="relative w-full max-w-3xl bg-black-700 border border-black-600 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]"
            onClick={e => e.stopPropagation()}
          >
            <button
              ref={closeButtonRef}
              onClick={handleCloseModal}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-lg hover:bg-black-900 transition-colors cursor-pointer"
              aria-label="Close project modal"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className={`${badge} ${badgePrimary}`}>{selectedProject.category}</span>
              {selectedProject.featured && (
                <span className="badge bg-gold-500/10 border-gold-500/30 text-gold-500 text-xs font-semibold">
                  ★ Flagship Project
                </span>
              )}
              {selectedProject.achievement && (
                <span className="badge bg-gold-500/10 border-gold-500/30 text-gold-500 text-xs font-medium">
                  {selectedProject.achievement}
                </span>
              )}
            </div>

            <h3 id="modal-project-title" className="text-2xl sm:text-3xl font-bold text-white mb-1">
              {selectedProject.name}
            </h3>
            <p className="text-sm font-medium text-gold-500 mb-6">{selectedProject.tagline}</p>

            {/* Problem & Solution Hierarchy */}
            <div className="space-y-4 mb-6">
              <div className="p-4 rounded-xl bg-black-950/80 border border-status-error/20">
                <div className="flex items-center gap-2 text-status-error text-xs font-mono uppercase tracking-wider mb-1.5 font-bold">
                  <AlertCircle className="h-4 w-4" /> The Problem
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{selectedProject.problem}</p>
              </div>

              <div className="p-4 rounded-xl bg-black-950/80 border border-gold-500/20">
                <div className="flex items-center gap-2 text-gold-500 text-xs font-mono uppercase tracking-wider mb-1.5 font-bold">
                  <CheckCircle2 className="h-4 w-4" /> The Architectural Solution
                </div>
                <p className="text-white text-sm leading-relaxed">{selectedProject.solution}</p>
              </div>
            </div>

            {/* Architecture Diagram */}
            {selectedProject.architecture && (
              <div className="mb-6">
                <h4 className="text-xs font-mono uppercase text-gray-400 tracking-wider mb-2 flex items-center gap-2">
                  <Layers className="h-4 w-4 text-gold-500" />
                  System Architecture & Data Pipeline
                </h4>
                <div className="bg-black-950 border border-black-600 rounded-xl p-4 font-mono text-xs text-gold-400 overflow-x-auto leading-relaxed shadow-inner">
                  <pre className="whitespace-pre-wrap">{selectedProject.architecture}</pre>
                </div>
              </div>
            )}

            {/* Key Features */}
            {selectedProject.features && (
              <div className="mb-6">
                <h4 className="text-xs font-mono uppercase text-gray-400 tracking-wider mb-3">
                  Key Technical Features
                </h4>
                <ul className="grid sm:grid-cols-2 gap-2">
                  {selectedProject.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-400">
                      <span className="text-gold-500 mt-0.5">•</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech Stack */}
            <div className="mb-6">
              <h4 className="text-xs font-mono uppercase text-gray-400 tracking-wider mb-2">
                Technologies & Tools
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedProject.tech.map(t => (
                  <span key={t} className="px-2.5 py-1 text-xs font-mono bg-black-900 border border-black-600 text-white rounded">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-5 border-t border-black-600">
              {selectedProject.links.github && (
                <a
                  href={selectedProject.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={btnPrimary}
                >
                  <GitBranch className="h-4 w-4" />
                  View GitHub Source
                </a>
              )}
              {selectedProject.links.demo && (
                <a
                  href={selectedProject.links.demo}
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

function FeaturedProjectCard({ project, onOpenDetails }: { project: ProjectItem; onOpenDetails: () => void }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-gold-500/50 bg-black-800 group shadow-gold-featured">
      <div className="absolute inset-0 bg-gradient-to-br from-gold-500/[0.08] via-transparent to-gold-400/[0.04] pointer-events-none" />
      
      <div className="relative p-7 sm:p-10 lg:p-12 grid lg:grid-cols-12 gap-8 items-center">
        {/* Left Info */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-500 text-xs font-mono font-semibold uppercase tracking-wider">
              <Star className="h-3.5 w-3.5 fill-gold-500 text-gold-500" />
              Primary Flagship Project
            </span>
            <span className="badge bg-black-900 border-black-600 text-gray-400 text-xs">
              {project.category}
            </span>
          </div>

          <div className="space-y-2">
            <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              {project.name}
            </h3>
            <p className="text-base sm:text-lg font-medium text-gold-500">
              {project.tagline}
            </p>
          </div>

          <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
            {project.summary}
          </p>

          {/* Problem -> Impact Summary */}
          <div className="grid sm:grid-cols-2 gap-3 p-4 rounded-xl bg-black-950/70 border border-black-600">
            <div>
              <p className="text-[11px] font-mono uppercase text-status-error font-bold mb-1">Problem Solved</p>
              <p className="text-xs text-gray-400 leading-normal">{project.problem}</p>
            </div>
            <div>
              <p className="text-[11px] font-mono uppercase text-gold-500 font-bold mb-1">Engineering Impact</p>
              <p className="text-xs text-white leading-normal">{project.impact}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span key={t} className="px-2.5 py-1 rounded text-xs font-mono bg-black-900 border border-black-600 text-gray-400">
                {t}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {project.links.github && (
              <a 
                href={project.links.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className={btnPrimary}
              >
                <GitBranch className="h-4 w-4" />
                View Source Code
              </a>
            )}
            <button
              type="button"
              onClick={onOpenDetails}
              className={`${btnGhost} cursor-pointer`}
            >
              <Layers className="h-4 w-4 text-gold-500" />
              Architecture Case Study
            </button>
          </div>
        </div>

        {/* Right Architecture Preview Button Trigger */}
        <button
          type="button"
          onClick={onOpenDetails}
          className="lg:col-span-5 text-left w-full relative cursor-pointer group/arch bg-transparent border-0 p-0"
          aria-label="Open architecture flow modal"
        >
          <div className="bg-black-950 border border-black-600 group-hover/arch:border-gold-500/50 transition-all rounded-xl p-5 font-mono text-xs shadow-xl">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-black-600 text-[11px]">
              <span className="text-gold-500 font-mono flex items-center gap-1.5 font-bold">
                <Terminal className="h-3.5 w-3.5" /> ARCHITECTURE FLOW
              </span>
              <span className="text-gray-400 group-hover/arch:text-gold-400 transition-colors">Expand Modal →</span>
            </div>
            <pre className="text-gray-400 whitespace-pre-wrap leading-relaxed font-mono text-left">
              {project.architecture}
            </pre>
          </div>
        </button>
      </div>
    </div>
  )
}

function ProjectCard({ project, onOpenDetails }: { project: ProjectItem; onOpenDetails: () => void }) {
  return (
    <div className={`${card} h-full flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1.5 hover:border-gold-500/45 p-6 sm:p-7`}>
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-2">
          <span className="badge bg-black-900 border-black-600 text-gray-400 text-xs font-mono">
            {project.category}
          </span>
          {project.achievement && (
            <span className="badge bg-gold-500/10 border-gold-500/30 text-gold-500 text-xs font-medium">
              {project.achievement}
            </span>
          )}
        </div>

        <div>
          <button
            type="button"
            onClick={onOpenDetails}
            className="text-left w-full group-hover:text-gold-400 transition-colors cursor-pointer bg-transparent border-0 p-0"
          >
            <h3 className="text-xl font-bold text-white group-hover:text-gold-400 transition-colors">
              {project.name}
            </h3>
          </button>
          <p className="text-xs font-medium text-gold-500/90 mt-1">{project.tagline}</p>
        </div>

        <p className="text-gray-400 text-sm leading-relaxed">
          {project.summary}
        </p>

        {/* Problem -> Impact Summary */}
        <div className="p-3 rounded-lg bg-black-950/60 border border-black-600 space-y-1.5 text-xs">
          <p className="text-gray-400">
            <strong className="text-white">Problem:</strong> {project.problem}
          </p>
          <p className="text-gray-400">
            <strong className="text-gold-500">Impact:</strong> {project.impact}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tech.map((t) => (
            <span key={t} className="px-2 py-0.5 text-[11px] font-mono bg-black-900 border border-black-600 text-gray-400 rounded">
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 pt-5 mt-5 border-t border-black-600">
        {project.links.github && (
          <a 
            href={project.links.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1 text-center py-2 px-3 text-xs font-semibold text-white bg-black-900 border border-black-600 rounded-lg hover:border-gold-500 hover:text-gold-400 transition-colors flex items-center justify-center gap-1.5"
          >
            <GitBranch className="h-3.5 w-3.5" />
            Code
          </a>
        )}
        <button
          type="button"
          onClick={onOpenDetails}
          className="flex-1 text-center py-2 px-3 text-xs font-semibold text-gray-400 bg-black-900/80 hover:bg-black-750 hover:text-white border border-black-600 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
        >
          <Layers className="h-3.5 w-3.5 text-gold-500" />
          Details & Architecture
        </button>
      </div>
    </div>
  )
}