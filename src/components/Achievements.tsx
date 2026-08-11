import { motion } from "framer-motion"
import { Trophy } from "lucide-react"
import { achievements } from "@/data/portfolio"
import { containerCustom, section, sectionTitle, sectionSubtitle, card } from "@/utils/styles"

export function Achievements() {
  return (
    <section id="achievements" className={`${section} relative section-contain`}>
      <div className={containerCustom} style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className={sectionTitle}>Achievements</h2>
          <p className={sectionSubtitle}>Recognitions and competitive accomplishments</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative"
            >
              <div className={`${card} relative overflow-hidden h-full`}>
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-primary-500/5" />
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-primary-500" />
                
                <div className="relative p-8 text-center space-y-6">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                    className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-600"
                  >
                    <Trophy className="h-12 w-12 text-dark-950" />
                  </motion.div>

                  <div className="space-y-3">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium">
                      {achievement.title}
                    </span>
                    <h3 className="text-2xl font-bold text-white">{achievement.event}</h3>
                    <p className="text-dark-400">{achievement.year}</p>
                  </div>

                  <div className="pt-4 border-t border-dark-800">
                    <p className="text-dark-300 font-medium">Project: <span className="text-primary-400">{achievement.project}</span></p>
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