import { motion } from "framer-motion"
import { Code, Brain, Workflow, Server, Bot, Puzzle } from "lucide-react"
import { focusAreas } from "@/data/portfolio"
import { containerCustom, section, sectionTitle, sectionSubtitle, card } from "@/utils/styles"

const focusIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Code,
  Brain,
  Workflow,
  Server,
  Bot,
  Puzzle,
}

export function FocusAreas() {
  return (
    <section id="skills" className={`${section} relative`}>
      <div className="absolute inset-0 grid-pattern noise-pattern opacity-50" aria-hidden="true" />
      
      <div className={containerCustom} style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className={sectionTitle}>Engineering Focus</h2>
          <p className={sectionSubtitle}>
            Core areas where I build, experiment, and solve problems
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {focusAreas.map((area, index) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${card} group relative overflow-hidden`}
              whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(245, 158, 11, 0.15)" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
<div className="p-3 rounded-lg bg-primary-500/10 w-fit mb-6 group-hover:bg-primary-500/20 transition-colors">
                   {(() => {
                     const Icon = focusIcons[area.icon as keyof typeof focusIcons];
                     return <Icon className="h-7 w-7 text-primary-500 group-hover:scale-110 transition-transform" aria-hidden="true" />;
                   })()}
                 </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors">
                  {area.title}
                </h3>
                
                <p className="text-dark-400 leading-relaxed">
                  {area.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}