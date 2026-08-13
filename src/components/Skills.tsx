import { Code, Brain, Server, Database, GitBranch, Cpu, CheckCircle2, Star } from "lucide-react"
import { skills } from "@/data/portfolio"
import { containerCustom, section, sectionTitle, sectionSubtitle, card } from "@/utils/styles"
import { useScrollAnimation, useStaggeredScrollAnimation } from "@/hooks/useScrollAnimation"

export function Skills() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation<HTMLDivElement>()
  const { containerRef, isVisible: isContainerVisible } = useStaggeredScrollAnimation<HTMLDivElement>()

  const categories = [
    {
      title: "Core Programming Languages",
      subtitle: "Foundational languages for systems, backend, and algorithms",
      icon: Code,
      items: skills.programming,
      isCore: true,
    },
    {
      title: "Software Engineering & Computer Science",
      subtitle: "Fundamental principles, architectural patterns, and practices",
      icon: Cpu,
      items: skills.softwareEngineering,
      isCore: true,
    },
    {
      title: "Backend Development",
      subtitle: "API architecture, server logic, and relational database querying",
      icon: Server,
      items: skills.backend,
      isCore: true,
    },
    {
      title: "AI & Workflow Automation",
      subtitle: "Local LLM runtimes, agentic workflows, and RPA platforms",
      icon: Brain,
      items: skills.aiAutomation,
      isCore: false,
    },
    {
      title: "Frontend & Web Technologies",
      subtitle: "Modern client-side interfaces and responsive build tools",
      icon: Database,
      items: skills.frontend,
      isCore: false,
    },
    {
      title: "Analytics & Legacy Systems",
      subtitle: "Data modeling, business intelligence, and legacy desktop architectures",
      icon: GitBranch,
      items: skills.dataSecondary,
      isCore: false,
    },
  ]

  return (
    <section id="skills" className={`${section} relative section-contain`}>
      <div className={containerCustom} style={{ position: 'relative', zIndex: 1 }}>
        <div
          ref={headerRef}
          className={`text-center max-w-3xl mx-auto mb-16 scroll-reveal ${headerVisible ? 'is-visible' : ''}`}
        >
          <h2 className={sectionTitle}>Technical Skills & Competencies</h2>
          <p className={sectionSubtitle}>
            Structured across core software engineering foundations, backend development, and AI automation
          </p>
        </div>

        <div ref={containerRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, catIndex) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.title}
                className={`${card} p-6 flex flex-col justify-between scroll-reveal-stagger ${
                  cat.isCore ? "border-gold-500/35 bg-black-800 shadow-gold-subtle" : "bg-black-800"
                } ${isContainerVisible ? 'is-visible' : ''}`}
                style={{ transitionDelay: `${catIndex * 60}ms` }}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2.5 rounded-lg ${cat.isCore ? "bg-gold-500/20 text-gold-500" : "bg-black-900 text-gray-400"}`}>
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    {cat.isCore && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold uppercase text-gold-500 px-2 py-0.5 rounded bg-gold-500/10 border border-gold-500/20">
                        <Star className="h-3 w-3 fill-gold-500" />
                        Core Priority
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-white mb-1">{cat.title}</h3>
                  <p className="text-xs text-gray-400 mb-5 leading-normal">{cat.subtitle}</p>

                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((item) => (
                      <span
                        key={item.name}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono transition-colors ${
                          item.priority
                            ? "bg-gold-500/15 border border-gold-500/40 text-gold-400 font-semibold"
                            : "bg-black-950 border border-black-600 text-gray-400 hover:text-white"
                        }`}
                      >
                        {item.priority && <CheckCircle2 className="h-3 w-3 text-gold-500" />}
                        {item.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}