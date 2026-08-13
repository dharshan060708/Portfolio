import { motion } from "framer-motion"
import { Briefcase, MapPin, CheckCircle, Calendar } from "lucide-react"
import { experience } from "@/data/portfolio"
import { containerCustom, section, sectionTitle, sectionSubtitle, card } from "@/utils/styles"

export function Experience() {
  return (
    <section id="experience" className={`${section} relative section-contain`}>
      <div className={containerCustom} style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className={sectionTitle}>Experience & Internships</h2>
          <p className={sectionSubtitle}>Practical industry experience in data modeling and business analytics</p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {experience.map((exp, index) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold-500 via-gold-500/40 to-black-600" />
              
              <div className="pl-12 sm:pl-16 relative">
                <div className="absolute left-0 top-3 w-4 h-4 rounded-full bg-gold-500 border-4 border-black-950 z-10 shadow-gold-node" />
                
                <div className={`${card} p-6 sm:p-8 space-y-6 border-gold-500/20`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-black-600 pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="p-1.5 rounded bg-gold-500/10 text-gold-500">
                          <Briefcase className="h-4 w-4" />
                        </span>
                        <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                      </div>
                      <p className="text-gold-500 font-medium text-sm mt-1">{exp.company}</p>
                    </div>

                    <div className="text-left sm:text-right font-mono text-xs text-gray-400 space-y-0.5">
                      <div className="flex items-center sm:justify-end gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-gold-500" />
                        <span>{exp.period}</span>
                      </div>
                      <div className="text-gray-500">{exp.duration}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-400 font-mono">
                    <MapPin className="h-3.5 w-3.5 text-gold-500" />
                    <span>{exp.location}</span>
                  </div>

                  <ul className="space-y-3">
                    {exp.details.map((detail, detailIndex) => (
                      <motion.li
                        key={detail}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 + detailIndex * 0.05 }}
                        className="flex items-start gap-3 text-gray-400 text-sm leading-relaxed"
                      >
                        <CheckCircle className="h-4 w-4 text-gold-500 flex-shrink-0 mt-1" />
                        <span>{detail}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <div className="pt-4 border-t border-black-600">
                    <p className="text-xs font-mono uppercase text-gray-500 mb-2">Key Competencies Applied</p>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.skillsLearned.map((s) => (
                        <span key={s} className="px-2.5 py-1 text-xs font-mono bg-black-900 border border-black-600 text-gold-400 rounded">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}