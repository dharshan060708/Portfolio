import { motion } from "framer-motion"
import { GraduationCap, Calendar, MapPin } from "lucide-react"
import { education } from "@/data/portfolio"
import { containerCustom, section, sectionTitle, sectionSubtitle, card } from "@/utils/styles"

export function Education() {
  return (
    <section id="education" className={`${section} relative section-contain`}>
      <div className={containerCustom} style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className={sectionTitle}>Education</h2>
          <p className={sectionSubtitle}>Academic foundation in computer science and software development</p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-6">
          {education.map((edu, index) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${card} p-6 sm:p-7 border-black-600 hover:border-gold-500/40 transition-colors`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-gold-500/10 text-gold-500">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{edu.degree}</h3>
                    <p className="text-gold-500 text-sm font-medium">{edu.college}</p>
                  </div>
                </div>

                <div className="text-left sm:text-right font-mono text-xs text-gray-400">
                  <div className="flex items-center sm:justify-end gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-gold-500" />
                    <span>{edu.period}</span>
                  </div>
                  <div className="text-white font-semibold mt-0.5">{edu.grade}</div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-gray-400 font-mono mb-3">
                <MapPin className="h-3.5 w-3.5 text-gray-500" />
                <span>{edu.location}</span>
              </div>

              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed border-t border-black-600 pt-3">
                {edu.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}