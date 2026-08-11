import { motion } from "framer-motion"
import { Briefcase, MapPin, CheckCircle } from "lucide-react"
import { experience } from "@/data/portfolio"
import { containerCustom, section, sectionTitle, sectionSubtitle, card } from "@/utils/styles"

export function Experience() {
  return (
    <section id="experience" className={`${section} relative`}>
      <div className="absolute inset-0 grid-pattern noise-pattern opacity-50" aria-hidden="true" />
      
      <div className={containerCustom} style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className={sectionTitle}>Experience</h2>
          <p className={sectionSubtitle}>Professional experience and internships</p>
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
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-dark-700" />
              
              <div className="pl-16 relative">
                <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-primary-500 border-4 border-dark-950 z-10" />
                
                <div className={card}>
                  <div className="flex flex-wrap items-start gap-4 mb-4">
                    <div className="p-2 rounded-lg bg-primary-500/10">
                      <Briefcase className="h-5 w-5 text-primary-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                      <p className="text-primary-400 font-medium">{exp.company}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-dark-400">{exp.period}</p>
                      <p className="text-xs text-dark-500">{exp.duration}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-dark-400 mb-6">
                    <MapPin className="h-4 w-4" />
                    <span>{exp.location}</span>
                  </div>

                  <ul className="space-y-3">
                    {exp.details.map((detail, detailIndex) => (
                      <motion.li
                        key={detail}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + detailIndex * 0.05 }}
                        className="flex items-start gap-3 text-dark-300"
                      >
                        <CheckCircle className="h-5 w-5 text-primary-500 flex-shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}