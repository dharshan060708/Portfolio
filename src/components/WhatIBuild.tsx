import { motion } from "framer-motion"
import { Server, Brain, Code2, Workflow } from "lucide-react"
import { whatIBuild } from "@/data/portfolio"
import { containerCustom, section, sectionTitle, sectionSubtitle, card } from "@/utils/styles"

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Server,
  Brain,
  Code: Code2,
  Workflow,
}

export function WhatIBuild() {
  return (
    <section id="focus" className={`${section} relative section-contain`}>
      <div className={containerCustom} style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className={sectionTitle}>What I Build</h2>
          <p className={sectionSubtitle}>
            Core technical domains where I develop backend systems, AI tools, and automated pipelines
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {whatIBuild.map((area, index) => {
            const Icon = categoryIcons[area.icon] || Server;
            return (
              <motion.div
                key={area.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`${card} p-7 group relative overflow-hidden flex flex-col justify-between hover:border-gold-500/45 transition-all duration-300`}
                whileHover={{ y: -4 }}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-xl bg-gold-500/10 border border-gold-500/20 text-gold-500 group-hover:bg-gold-500 group-hover:text-black-950 transition-colors">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-gold-400 transition-colors">
                    {area.title}
                  </h3>

                  <p className="text-gray-400 text-sm leading-relaxed">
                    {area.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-black-600">
                  <div className="flex flex-wrap gap-1.5">
                    {area.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded text-xs font-mono bg-black-900 border border-black-600 text-gray-400 group-hover:text-white group-hover:border-black-500 transition-colors"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  )
}
