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
          <h2 className={sectionTitle}>Verified Recognitions</h2>
          <p className={sectionSubtitle}>Awards and technical project competition standings</p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative"
            >
              <div className={`${card} p-8 relative overflow-hidden border-gold-500/40 bg-black-800 shadow-gold-featured text-center space-y-5`}>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400" />
                
                <div className="inline-flex p-4 rounded-2xl bg-gold-500/10 border border-gold-500/30 text-gold-500">
                  <Trophy className="h-10 w-10" />
                </div>

                <div className="space-y-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-500 text-xs font-mono font-semibold uppercase tracking-wider">
                    {achievement.title}
                  </span>
                  <h3 className="text-2xl font-bold text-white">{achievement.event}</h3>
                  <p className="text-xs font-mono text-gray-500">{achievement.year}</p>
                </div>

                <p className="text-gray-400 text-sm max-w-lg mx-auto leading-relaxed">
                  {achievement.description}
                </p>

                <div className="pt-4 border-t border-black-600 flex items-center justify-center gap-2 text-xs font-mono text-gray-400">
                  <span>Awarded for Project:</span>
                  <span className="text-gold-500 font-semibold">{achievement.project}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}