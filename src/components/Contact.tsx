import { motion } from "framer-motion"
import { Mail, GitBranch, Link2, Code, Award, Send, ArrowRight, Copy, Check } from "lucide-react"
import { profile } from "@/data/portfolio"
import { containerCustom, section, sectionTitle, sectionSubtitle, card, btnPrimary, btnGhost, inputField } from "@/utils/styles"
import { useState } from "react"

export function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" })
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [copiedLabel, setCopiedLabel] = useState<string | null>(null)

  const copyToClipboard = (text: string, label: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    navigator.clipboard.writeText(text)
    setCopiedLabel(label)
    setTimeout(() => setCopiedLabel(null), 2000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error")
      setErrorMessage("Please fill in all required fields.")
      return
    }

    setStatus("sending")
    setErrorMessage("")

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "YOUR_WEB3FORMS_ACCESS_KEY",
          name: formData.name,
          email: formData.email,
          subject: formData.subject || `Portfolio Contact from ${formData.name}`,
          message: formData.message,
          from_name: "Portfolio Inquiry",
        }),
      })

      if (response.ok) {
        setStatus("success")
        setFormData({ name: "", email: "", subject: "", message: "" })
      } else {
        const mailtoLink = `mailto:${profile.email}?subject=${encodeURIComponent(formData.subject || "Portfolio Contact")}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`
        window.location.href = mailtoLink
        setStatus("success")
        setFormData({ name: "", email: "", subject: "", message: "" })
      }
    } catch {
      const mailtoLink = `mailto:${profile.email}?subject=${encodeURIComponent(formData.subject || "Portfolio Contact")}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`
      window.location.href = mailtoLink
      setStatus("success")
      setFormData({ name: "", email: "", subject: "", message: "" })
    }
  }

  const contactItems = [
    { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}`, copyValue: profile.email, color: "text-primary-500" },
    { icon: GitBranch, label: "GitHub", value: "DharshanVelumani", href: profile.links.github, copyValue: profile.links.github, color: "text-white" },
    { icon: Link2, label: "LinkedIn", value: "Dharshan-V", href: profile.links.linkedin, copyValue: profile.links.linkedin, color: "text-blue-400" },
    { icon: Code, label: "LeetCode", value: "efImqpWfmd", href: profile.links.leetcode, copyValue: profile.links.leetcode, color: "text-orange-500" },
    { icon: Award, label: "HackerRank", value: "dharshanvelumani", href: profile.links.hackerrank, copyValue: profile.links.hackerrank, color: "text-green-500" },
  ]

  return (
    <section id="contact" className={`${section} relative section-contain`}>
      <div className={containerCustom} style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className={sectionTitle}>Let's Build Something Useful</h2>
          <p className={sectionSubtitle}>
            I'm interested in software engineering opportunities, automation problems, AI applications, backend development, and interesting technical projects.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              {contactItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${card} flex items-center gap-4 group p-4 hover:border-primary-500/40`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  whileHover={{ x: 4 }}
                >
                  <div className={`p-3 rounded-lg ${item.color}/10`}>
                    <item.icon className={`h-5 w-5 ${item.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-dark-500 uppercase tracking-wider">{item.label}</p>
                    <p className="text-white font-medium truncate text-sm sm:text-base">{item.value}</p>
                  </div>
                  
                  <button
                    type="button"
                    onClick={(e) => copyToClipboard(item.copyValue, item.label, e)}
                    className="p-2 rounded-lg text-dark-400 hover:text-white hover:bg-dark-800 transition-colors"
                    title={`Copy ${item.label}`}
                    aria-label={`Copy ${item.label}`}
                  >
                    {copiedLabel === item.label ? (
                      <span className="inline-flex items-center gap-1 text-xs text-green-400 font-sans">
                        <Check className="h-4 w-4" />
                        <span className="hidden sm:inline">Copied</span>
                      </span>
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>

                  <ArrowRight className="h-4 w-4 text-dark-500 group-hover:text-primary-400 transition-colors hidden sm:block" />
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className={`${card} p-6`}
            >
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="flex flex-wrap gap-3">
                <a href={`mailto:${profile.email}`} className={btnPrimary}>
                  <Mail className="h-4 w-4" />
                  Email Me
                </a>
                <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className={btnGhost}>
                  <GitBranch className="h-4 w-4" />
                  GitHub
                </a>
                <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className={btnGhost}>
                  <Link2 className="h-4 w-4" />
                  LinkedIn
                </a>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={card}
          >
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-dark-400 mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className={inputField}
                    required
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-dark-400 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className={inputField}
                    required
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-dark-400 mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={e => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                  className={inputField}
                  required
                  placeholder="Project inquiry, Job opportunity, etc."
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-dark-400 mb-2">Message</label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  rows={5}
                  className={inputField + " resize-y min-h-[120px]"}
                  required
                  placeholder="Tell me about your project or opportunity..."
                />
              </div>

              {status === "error" && errorMessage && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {errorMessage}
                </div>
              )}

              <button 
                type="submit" 
                disabled={status === "sending"}
                className="w-full py-3 px-6 bg-primary-500 text-dark-950 font-semibold rounded-lg hover:bg-primary-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {status === "sending" ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                    Sending...
                  </>
                ) : status === "success" ? (
                  <>
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
                    Message Sent!
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="h-5 w-5" />
                  </>
                )}
              </button>

              <p className="text-center text-xs text-dark-500">
                Direct asynchronous message with auto email client fallback
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}