'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, MapPin, Send, ArrowRight, FileText, CheckCircle2, Copy } from 'lucide-react';
import { profiles } from '../../data';

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const emailProfile = profiles.find((p) => p.name === 'Email');
  const githubProfile = profiles.find((p) => p.name === 'GitHub');
  const linkedinProfile = profiles.find((p) => p.name === 'LinkedIn');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('dharshanvelumani06@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Create mailto link with pre-filled details
    const subject = encodeURIComponent(formData.subject || `Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:dharshanvelumani06@gmail.com?subject=${subject}&body=${body}`;

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="relative z-10 py-20 sm:py-24" aria-label="Contact">
      <div className="section-container space-y-16">
        
        {/* ================= 1. DEDICATED RESUME CTA ================= */}
        <motion.div
          className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#0D0D0D] via-[#141414] to-[#0D0D0D] border border-[#D4AF37]/30 shadow-2xl relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="text-xs font-mono font-bold tracking-widest text-[#D4AF37] uppercase">
                CURRICULUM VITAE & PROFILES
              </span>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
                Want to know more about my background and experience?
              </h3>
              <p className="text-sm sm:text-base text-[#D4D4D4] leading-relaxed max-w-2xl">
                Explore my complete engineering portfolio, open-source repositories, and verified problem-solving track record across platforms.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3.5">
              <a
                href={githubProfile?.url || 'https://github.com/dharshan060708'}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold text-xs py-3 px-5 text-center"
              >
                <Github className="w-4 h-4" />
                <span>EXPLORE ALL REPOSITORIES</span>
              </a>
              <a
                href={linkedinProfile?.url || 'https://www.linkedin.com/in/dharshan-v-121341369/'}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline text-xs py-3 px-5 text-center"
              >
                <Linkedin className="w-4 h-4 text-[#D4AF37]" />
                <span>CONNECT ON LINKEDIN</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* ================= 2. CONTACT SECTION ================= */}
        <div>
          <div className="max-w-2xl mb-12 sm:mb-16">
            <div className="section-tag">05 / CONTACT</div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              LET&apos;S WORK <span className="text-[#D4AF37]">TOGETHER</span>.
            </h2>
            <p className="text-base sm:text-lg text-[#8A8A8A] mt-3">
              Have an idea, project, or full-stack opportunity in mind? Feel free to reach out directly.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Direct Contact Details (Left: 5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="luxury-card p-6 space-y-5">
                <h3 className="text-base font-bold font-mono tracking-wider text-white">
                  CONTACT INFORMATION
                </h3>

                {/* Email Box */}
                <div className="p-4 rounded-xl bg-[#141414] border border-white/5 space-y-1">
                  <span className="text-[10px] font-mono text-[#D4AF37] uppercase font-bold tracking-wider">Email Address</span>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs sm:text-sm font-mono text-white select-all">
                      dharshanvelumani06@gmail.com
                    </span>
                    <button
                      onClick={handleCopyEmail}
                      className="p-1.5 rounded-md hover:bg-white/10 text-[#8A8A8A] hover:text-white transition-colors"
                      aria-label="Copy Email"
                    >
                      {copiedEmail ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Location */}
                <div className="p-4 rounded-xl bg-[#141414] border border-white/5 space-y-1">
                  <span className="text-[10px] font-mono text-[#D4AF37] uppercase font-bold tracking-wider">Location</span>
                  <p className="text-xs sm:text-sm text-white">
                    Coimbatore, Tamil Nadu, India (UTC +5:30)
                  </p>
                </div>

                {/* Social Links */}
                <div className="pt-2 flex items-center gap-3">
                  <a
                    href={githubProfile?.url || 'https://github.com/dharshan060708'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-chip"
                    aria-label="GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href={linkedinProfile?.url || 'https://www.linkedin.com/in/dharshan-v-121341369/'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-chip"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href="mailto:dharshanvelumani06@gmail.com"
                    className="social-chip"
                    aria-label="Email"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Functional Contact Form (Right: 7 cols) */}
            <div className="lg:col-span-7">
              <form onSubmit={handleSubmit} className="luxury-card p-6 sm:p-8 space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#8A8A8A] block">
                      YOUR NAME *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-[#141414] border border-white/10 text-sm text-white placeholder-[#666] focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#8A8A8A] block">
                      YOUR EMAIL *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-[#141414] border border-white/10 text-sm text-white placeholder-[#666] focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#8A8A8A] block">
                    SUBJECT
                  </label>
                  <input
                    type="text"
                    placeholder="Project Inquiry / Job Opportunity"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[#141414] border border-white/10 text-sm text-white placeholder-[#666] focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#8A8A8A] block">
                    MESSAGE *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell me about your project, timeline, or requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[#141414] border border-white/10 text-sm text-white placeholder-[#666] focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-gold w-full py-3.5 text-xs font-mono font-bold tracking-wider uppercase"
                >
                  <Send className="w-4 h-4 mr-1" />
                  <span>SEND MESSAGE DIRECTLY</span>
                </button>

                {submitted && (
                  <p className="text-xs font-mono text-green-400 text-center pt-2">
                    ✓ Opening your email client with your message...
                  </p>
                )}
              </form>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}