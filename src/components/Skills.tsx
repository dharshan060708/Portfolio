import { Code, Brain, Zap, Server, Bot, Database, GitBranch, Cpu } from "lucide-react"
import { skills } from "@/data/portfolio"
import { containerCustom, section, sectionTitle, sectionSubtitle, badge } from "@/utils/styles"
import { useState } from "react"
import { useScrollAnimation, useStaggeredScrollAnimation } from "@/hooks/useScrollAnimation"

const skillIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  programming: Code,
  ai: Brain,
  automation: Zap,
  webBackend: Server,
  desktopLegacy: Bot,
  tools: GitBranch,
  coreJava: Cpu,
  dataBI: Database,
}

const skillCategories = [
  { key: "programming", label: "Programming", icon: "programming" },
  { key: "webBackend", label: "Web / Backend", icon: "webBackend" },
  { key: "ai", label: "AI", icon: "ai" },
  { key: "automation", label: "Automation", icon: "automation" },
  { key: "coreJava", label: "Core Java", icon: "coreJava" },
  { key: "dataBI", label: "Data / BI", icon: "dataBI" },
  { key: "desktopLegacy", label: "Desktop / Legacy", icon: "desktopLegacy" },
  { key: "tools", label: "Tools", icon: "tools" },
]

const skillDescriptions: Record<string, string> = {
  Java: "Backend / Systems",
  Python: "Backend / Automation / AI",
  SQL: "Database Querying",
  JavaScript: "Full Stack",
  "Object-Oriented Programming": "Java Fundamentals",
  "Exception Handling": "Error Management",
  HTML5: "Markup",
  CSS3: "Styling",
  Flask: "Python Backend",
  "REST APIs": "API Design",
  Vite: "Build Tool",
  TypeScript: "Type Safety",
  Ollama: "Local AI",
  "Local LLMs": "On-device Inference",
  "llama.cpp": "LLM Runtime",
  "Gemini API": "Cloud AI",
  n8n: "Workflow Automation",
  "UiPath Studio": "RPA Platform",
  "Chrome Automation": "Browser RPA",
  Webhooks: "Event Integration",
  "Power BI": "Data Visualization",
  "Google Sheets API": "Data Integration",
  "Visual Basic 6": "Legacy Desktop",
  ADO: "Data Access",
  "Microsoft Access": "Database",
  Git: "Version Control",
  GitHub: "Collaboration",
}

export function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation<HTMLDivElement>()
  const { containerRef, isVisible: isContainerVisible } = useStaggeredScrollAnimation<HTMLDivElement>()

  return (
    <section id="skills" className={`${section} relative section-contain`}>
      <div className={containerCustom} style={{ position: 'relative', zIndex: 1 }}>
        <div
          ref={headerRef}
          className={`text-center max-w-3xl mx-auto mb-16 scroll-reveal ${headerVisible ? 'is-visible' : ''}`}
        >
          <h2 className={sectionTitle}>Tech Arsenal</h2>
          <p className={sectionSubtitle}>Technologies and tools I work with</p>
        </div>

        <div ref={containerRef} className="space-y-12">
          {skillCategories.map((category, catIndex) => {
            const categorySkills = skills[category.key as keyof typeof skills]
            
            return (
              <div
                key={category.key}
                className={`scroll-reveal-stagger ${isContainerVisible ? 'is-visible' : ''}`}
                style={{ transitionDelay: `${catIndex * 60}ms` }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-primary-500/10">
                    {(() => {
                      const Icon = skillIcons[category.icon as keyof typeof skillIcons];
                      return <Icon className="h-5 w-5 text-primary-500" aria-hidden="true" />;
                    })()}
                  </div>
                  <h3 className="text-xl font-semibold text-white">{category.label}</h3>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {categorySkills.map((skill, skillIndex) => (
                    <button
                      key={skill}
                      className={`${badge} group relative overflow-hidden transition-all duration-200 hover:scale-[1.02] ${
                        hoveredSkill === skill ? "bg-primary-500/20 border-primary-500/30 text-primary-300" : ""
                      } ${isContainerVisible ? 'opacity-100' : 'opacity-0 translate-y-2'}`}
                      onMouseEnter={() => setHoveredSkill(skill)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      style={{ 
                        transitionDelay: `${(catIndex * 60) + (skillIndex * 25)}ms`,
                        zIndex: hoveredSkill === skill ? 10 : 1 
                      }}
                    >
                      {skill}
                      {hoveredSkill === skill && (
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 text-xs font-medium text-white bg-dark-900 border border-dark-600 rounded-lg whitespace-nowrap shadow-lg z-20 animate-fade-in">
                          {skillDescriptions[skill] || "Technology"}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}