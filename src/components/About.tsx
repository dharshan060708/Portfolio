import { motion } from "framer-motion"
import { Code, GraduationCap, Calendar, Target, Award, CheckCircle2, Layers } from "lucide-react"
import { about } from "@/data/portfolio"
import { containerCustom, section, sectionTitle, sectionSubtitle, card } from "@/utils/styles"

const profileIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "Degree": GraduationCap,
  "Institution": Code,
  "Graduation": Calendar,
  "Academic Record": Award,
  "Primary Focus": Target,
}

export function About() {
  return (
    <section id="about" className={`${section} relative section-contain`}>
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
            Bridging fundamental software engineering with practical AI and workflow automation
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Narrative Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className={`${card} p-6 sm:p-8 space-y-5 leading-relaxed`}>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Layers className="h-5 w-5 text-gold-500" />
                Engineering Background & Philosophy
              </h3>
              
              <p className="text-gray-400 text-base leading-relaxed">
                {about.description[0]}
              </p>
              
              <p className="text-gray-400/90 text-base leading-relaxed">
                {about.description[1]}
              </p>

              {/* Technical pillars */}
              <div className="grid sm:grid-cols-2 gap-3 pt-4 border-t border-black-600">
                {about.highlights.map((h, i) => (
                  <div key={i} className="p-3 rounded-lg bg-black-900 border border-black-600 flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-gold-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-semibold text-white uppercase tracking-wider">{h.title}</h4>
                      <p className="text-xs text-gray-400 mt-0.5 leading-snug">{h.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Profile Cards Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 space-y-4"
          >
            <div className={`${card} p-6 space-y-4`}>
              <h3 className="text-xs font-mono uppercase tracking-wider text-gray-400 border-b border-black-600 pb-3">
                Academic & Profile Summary
              </h3>

              <dl className="space-y-3">
                {about.profileInfo.map((item, index) => {
                  const Icon = profileIcons[item.label] || Code;
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + index * 0.05 }}
                      className="flex items-start gap-3 p-2.5 rounded-lg bg-black-900/60 border border-black-600/80"
                    >
                      <div className="p-2 rounded-md bg-gold-500/10 text-gold-500 mt-0.5">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <dt className="text-[11px] font-mono uppercase text-gray-500">{item.label}</dt>
                        <dd className="text-sm font-semibold text-white mt-0.5 truncate">{item.value}</dd>
                      </div>
                    </motion.div>
                  );
                })}
              </dl>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}