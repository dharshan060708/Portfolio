import { motion } from "framer-motion"
import { GraduationCap, Award, Star } from "lucide-react"
import { education, certifications } from "@/data/portfolio"
import { containerCustom, section, sectionTitle, sectionSubtitle, card } from "@/utils/styles"

export function Education() {
  return (
    <section id="education" className={`${section} relative`}>
      <div className="absolute inset-0 grid-pattern noise-pattern opacity-50" aria-hidden="true" />
      
      <div className={containerCustom} style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className={sectionTitle}>Education</h2>
          <p className={sectionSubtitle}>Academic background and achievements</p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-8">
          {education.map((edu, index) => (
            <motion.div
              key={edu.degree}
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
                  <div className="flex flex-wrap items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary-500/10">
                      <GraduationCap className="h-5 w-5 text-primary-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white">{edu.degree}</h3>
                      <p className="text-primary-400 font-medium">{edu.college}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-dark-400">{edu.period}</p>
                      <p className="text-xs text-dark-500">{edu.grade}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Certifications</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className={card}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary-500/10 flex-shrink-0">
                    <Award className="h-6 w-6 text-primary-500" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-white">{cert.name}</h4>
                    <p className="text-primary-400 text-sm font-medium">{cert.issuer}</p>
                    <p className="text-dark-400 text-sm mt-1">{cert.grade}</p>
                    <p className="text-dark-500 text-xs mt-1">{cert.period}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <Star className="h-8 w-8 text-amber-500" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}