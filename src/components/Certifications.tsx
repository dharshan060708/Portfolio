import { motion } from "framer-motion"
import { Award, Star, Calendar } from "lucide-react"
import { certifications } from "@/data/portfolio"
import { containerCustom, section, sectionTitle, sectionSubtitle, card } from "@/utils/styles"

export function Certifications() {
  return (
    <section id="certifications" className={`${section} relative section-contain`}>
      <div className={containerCustom} style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className={sectionTitle}>Certifications</h2>
          <p className={sectionSubtitle}>Verified industry and academic credentials</p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${card} p-6 sm:p-8 border-gold-500/30 bg-black-800 shadow-gold-card`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gold-500/15 text-gold-500 border border-gold-500/30 flex-shrink-0">
                    <Award className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold uppercase text-gold-500 px-2 py-0.5 rounded bg-gold-500/10 border border-gold-500/20 mb-2">
                      <Star className="h-3 w-3 fill-gold-500" />
                      {cert.grade}
                    </span>
                    <h3 className="text-xl font-bold text-white">{cert.name}</h3>
                    <p className="text-gold-500 font-medium text-sm mt-0.5">{cert.issuer}</p>
                    <p className="text-gray-400 text-xs mt-2 leading-relaxed">{cert.description}</p>
                  </div>
                </div>

                <div className="text-left sm:text-right font-mono text-xs text-gray-400 flex items-center sm:justify-end gap-1.5 flex-shrink-0">
                  <Calendar className="h-3.5 w-3.5 text-gold-500" />
                  <span>{cert.period}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
