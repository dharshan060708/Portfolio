import { motion } from "framer-motion"
import { Mail, GitBranch, Link2, Code, Award, Send, ArrowRight, Copy, Check, AlertCircle } from "lucide-react"
import { profile } from "@/data/portfolio"
import { containerCustom, section, sectionTitle, sectionSubtitle, card, btnPrimary, btnGhost, inputField } from "@/utils/styles"
import { useState } from "react"

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "", honeypot: "" })
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "fallback" | "error">("idle")
  const [feedbackMessage, setFeedbackMessage] = useState("")
  const [copiedLabel, setCopiedLabel] = useState<string | null>(null)
  const [copyError, setCopyError] = useState<string | null>(null)

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedLabel(label)
      setCopyError(null)
      setTimeout(() => setCopiedLabel(null), 2000)
    } catch {
      setCopyError(label)
      setTimeout(() => setCopyError(null), 3000)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Honeypot spam check - if populated by bots, gracefully abort
    if (formData.honeypot.trim()) {
      setStatus("error")
      setFeedbackMessage("Submission rejected as automated spam.")
      return
    }

    if (!formData.name.trim()) {
      setStatus("error")
      setFeedbackMessage("Please enter your name.")
      return
    }

    if (!formData.email.trim() || !EMAIL_REGEX.test(formData.email.trim())) {
      setStatus("error")
      setFeedbackMessage("Please enter a valid email address (e.g. name@domain.com).")
      return
    }

    if (!formData.message.trim() || formData.message.trim().length < 5) {
      setStatus("error")
      setFeedbackMessage("Please enter a message of at least 5 characters.")
      return
    }

    setStatus("sending")
    setFeedbackMessage("")

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY

    // If no Web3Forms access key is configured, gracefully fall back to direct mail client
    if (!accessKey || accessKey === "YOUR_WEB3FORMS_ACCESS_KEY") {
      const mailtoLink = `mailto:${profile.email}?subject=${encodeURIComponent(formData.subject || `Inquiry from ${formData.name}`)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`
      window.location.href = mailtoLink
      setStatus("fallback")
      setFeedbackMessage("Opening your default email client...")
      setFormData({ name: "", email: "", subject: "", message: "", honeypot: "" })
      return
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          subject: formData.subject || `Portfolio Contact from ${formData.name}`,
          message: formData.message,
          from_name: "Software Engineer Portfolio",
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setStatus("success")
        setFeedbackMessage("Message sent successfully. Thank you for reaching out!")
        setFormData({ name: "", email: "", subject: "", message: "", honeypot: "" })
      } else {
        const mailtoLink = `mailto:${profile.email}?subject=${encodeURIComponent(formData.subject || `Inquiry from ${formData.name}`)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`
        window.location.href = mailtoLink
        setStatus("fallback")
        setFeedbackMessage("Opening your email client to complete message delivery...")
        setFormData({ name: "", email: "", subject: "", message: "", honeypot: "" })
      }
    } catch {
      const mailtoLink = `mailto:${profile.email}?subject=${encodeURIComponent(formData.subject || `Inquiry from ${formData.name}`)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`
      window.location.href = mailtoLink
      setStatus("fallback")
      setFeedbackMessage("Network error encountered. Opening your email client as fallback...")
      setFormData({ name: "", email: "", subject: "", message: "", honeypot: "" })
    }
  }

  const contactItems = [
    { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}`, isExternal: false, copyValue: profile.email },
    { icon: GitBranch, label: "GitHub", value: "DharshanVelumani", href: profile.links.github, isExternal: true, copyValue: profile.links.github },
    { icon: Link2, label: "LinkedIn", value: "Dharshan-V", href: profile.links.linkedin, isExternal: true, copyValue: profile.links.linkedin },
    { icon: Code, label: "LeetCode", value: "efImqpWfmd", href: profile.links.leetcode, isExternal: true, copyValue: profile.links.leetcode },
    { icon: Award, label: "HackerRank", value: "dharshanvelumani", href: profile.links.hackerrank, isExternal: true, copyValue: profile.links.hackerrank },
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
          <h2 className={sectionTitle}>Get In Touch</h2>
          <p className={sectionSubtitle}>
            Available for Software Engineering internships, junior developer roles, and technical collaborations
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Direct Channels */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="space-y-3">
              {contactItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  className={`${card} flex items-center justify-between gap-3 p-3.5 hover:border-gold-500/40 transition-colors group`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <a
                    href={item.href}
                    {...(item.isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="flex items-center gap-3.5 flex-1 min-w-0"
                    aria-label={`Open ${item.label}: ${item.value}`}
                  >
                    <div className="p-2.5 rounded-lg bg-gold-500/10 border border-black-600 text-gold-500 group-hover:border-gold-500/30 transition-colors">
                      <item.icon className="h-4 w-4 text-gold-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-mono text-gray-500 uppercase tracking-wider">{item.label}</p>
                      <p className="text-white font-medium truncate text-xs sm:text-sm group-hover:text-gold-400 transition-colors">
                        {item.value}
                      </p>
                    </div>
                  </a>
                  
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => copyToClipboard(item.copyValue, item.label)}
                      className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-black-900 transition-colors cursor-pointer"
                      title={`Copy ${item.label}`}
                      aria-label={`Copy ${item.label} to clipboard`}
                    >
                      {copiedLabel === item.label ? (
                        <span className="inline-flex items-center gap-1 text-xs text-status-success font-mono">
                          <Check className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">Copied</span>
                        </span>
                      ) : copyError === item.label ? (
                        <span className="text-xs text-status-error font-mono">Failed</span>
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>

                    <a
                      href={item.href}
                      {...(item.isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="p-2 text-gray-400 hover:text-gold-400 transition-colors hidden sm:block"
                      aria-label={`Visit ${item.label}`}
                    >
                      <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className={`${card} p-5 space-y-3 border-black-600`}>
              <h3 className="text-xs font-mono uppercase text-gray-400 tracking-wider font-semibold">Quick Actions</h3>
              <div className="flex flex-wrap gap-2">
                <a href={`mailto:${profile.email}`} className={btnPrimary}>
                  <Mail className="h-4 w-4" />
                  Email Directly
                </a>
                <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className={btnGhost}>
                  <Link2 className="h-4 w-4 text-gold-500" />
                  LinkedIn Connect
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className={`${card} p-6 sm:p-8`}>
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Honeypot field for bot protection (hidden visually) */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="website">Leave this field empty</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.honeypot}
                    onChange={e => setFormData(prev => ({ ...prev, honeypot: e.target.value }))}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-mono uppercase text-gray-400 mb-1.5 font-medium">Name *</label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      autoComplete="name"
                      value={formData.name}
                      onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className={inputField}
                      required
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-mono uppercase text-gray-400 mb-1.5 font-medium">Email *</label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className={inputField}
                      required
                      placeholder="name@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-mono uppercase text-gray-400 mb-1.5 font-medium">Subject</label>
                  <input
                    type="text"
                    id="contact-subject"
                    name="subject"
                    autoComplete="off"
                    value={formData.subject}
                    onChange={e => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                    className={inputField}
                    placeholder="Internship opportunity / Technical project inquiry"
                  />
                </div>
                
                <div>
                  <label htmlFor="contact-message" className="block text-xs font-mono uppercase text-gray-400 mb-1.5 font-medium">Message *</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    rows={5}
                    className={inputField + " resize-y min-h-[120px]"}
                    required
                    placeholder="Write your message here..."
                  />
                </div>

                {/* Status Announcement Region */}
                <div aria-live="polite" aria-atomic="true">
                  {status === "error" && (
                    <div className="p-3 rounded-lg bg-status-error/10 border border-status-error/20 text-status-error text-xs flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 flex-shrink-0" />
                      <span>{feedbackMessage}</span>
                    </div>
                  )}

                  {status === "success" && (
                    <div className="p-3 rounded-lg bg-status-success/10 border border-status-success/20 text-status-success text-xs flex items-center gap-2">
                      <Check className="h-4 w-4 flex-shrink-0" />
                      <span>{feedbackMessage}</span>
                    </div>
                  )}

                  {status === "fallback" && (
                    <div className="p-3 rounded-lg bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs flex items-center gap-2">
                      <Mail className="h-4 w-4 flex-shrink-0" />
                      <span>{feedbackMessage}</span>
                    </div>
                  )}
                </div>

                <button 
                  type="submit" 
                  disabled={status === "sending"}
                  className="w-full py-3.5 px-6 gradient-gold-metallic text-black-950 font-bold rounded-lg hover:brightness-110 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm cursor-pointer shadow-gold-cta active:scale-[0.99]"
                >
                  {status === "sending" ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                      <span>Sending message...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="h-4 w-4 stroke-[2.5]" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}