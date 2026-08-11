import { motion } from "framer-motion"
import { Code, GraduationCap, Calendar, Target, Award } from "lucide-react"
import { about } from "@/data/portfolio"
import { containerCustom, section, sectionTitle, sectionSubtitle, card } from "@/utils/styles"

const profileIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Education: GraduationCap,
  College: Code,
  Graduation: Calendar,
  CGPA: Award,
  Focus: Target,
}

export function About() {
  return (
    <section id="about" className={`${section} relative`}>
      <div className="absolute inset-0 grid-pattern noise-pattern opacity-50" aria-hidden="true" />
      
      <div className={containerCustom} style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className={sectionTitle}>{about.heading}</h2>
          <p className={sectionSubtitle}>
            {about.description[0]}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <div className="prose prose-invert max-w-none">
              <p className="text-dark-300 leading-relaxed text-lg mb-6">
                {about.description[0]}
              </p>
              <p className="text-dark-400 leading-relaxed text-lg">
                {about.description[1]}
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className={card}
            >
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2 text-white">
                <Code className="h-5 w-5 text-primary-500" />
                Profile
              </h3>
              <dl className="grid grid-cols-2 gap-4">
                {about.profileInfo.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className="flex flex-col gap-1"
                  >
                    <dt className="text-xs font-medium text-dark-500 uppercase tracking-wider flex items-center gap-1.5">
                      {(() => {
                        const Icon = profileIcons[item.label as keyof typeof profileIcons];
                        return <Icon className="h-3.5 w-3.5 text-primary-500" aria-hidden="true" />;
                      })()}
                      {item.label}
                    </dt>
                    <dd className="text-dark-200 font-medium">{item.value}</dd>
                  </motion.div>
                ))}
              </dl>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {about.profileInfo.slice(0, 4).map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className={`${card} relative overflow-hidden`}
              >
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary-500 to-red-500" />
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-primary-500/10">
                    {(() => {
                      const Icon = profileIcons[item.label as keyof typeof profileIcons];
                      return <Icon className="h-6 w-6 text-primary-500" aria-hidden="true" />;
                    })()}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-dark-500 uppercase tracking-wider">{item.label}</p>
                    <p className="text-xl font-bold text-white">{item.value}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}