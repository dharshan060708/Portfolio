'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send, ExternalLink } from 'lucide-react';
import { profiles } from '../../data';

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleDirectEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const emailSubject = encodeURIComponent(formData.subject || `Inquiry from ${formData.name || 'Portfolio Visitor'}`);
    const emailBody = encodeURIComponent(
      `Hi Dharshan,\n\n${formData.message}\n\nFrom: ${formData.name}\nEmail: ${formData.email}`
    );
    window.location.href = `mailto:dharshanvelumani06@gmail.com?subject=${emailSubject}&body=${emailBody}`;
  };

  const githubProfile = profiles.find((p) => p.name === 'GitHub')?.url || 'https://github.com/dharshan060708';
  const linkedinProfile = profiles.find((p) => p.name === 'LinkedIn')?.url || 'https://www.linkedin.com/in/dharshan-v-121341369/';

  return (
    <section id="contact" className="relative z-10 py-20 sm:py-24" aria-labelledby="contact-heading">
      <div className="section-container">
        
        {/* Large Final CTA Container matching reference */}
        <motion.div
          className="bg-gradient-to-b from-[#0B0D0F] to-[#08090B] border border-white/10 rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
        >
          {/* Subtle Ambient Gold Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D6A63A]/5 rounded-full blur-3xl pointer-events-none" />

          {/* Heading */}
          <div className="relative z-10 space-y-4 max-w-2xl mx-auto mb-8">
            <h2 id="contact-heading" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#F5F5F5]">
              LET'S BUILD <span className="text-[#D6A63A]">SOMETHING.</span>
            </h2>
            <p className="text-[#A7A7A7] text-sm sm:text-base leading-relaxed">
              Have an idea, project, or automation problem? Let's turn it into something useful.
            </p>
          </div>

          {/* Direct Profile Action Buttons */}
          <div className="relative z-10 flex flex-wrap items-center justify-center gap-3.5 mb-10">
            <a
              href="mailto:dharshanvelumani06@gmail.com"
              className="btn-gold min-w-[150px]"
            >
              <Mail className="w-4 h-4" />
              <span>Email Me</span>
            </a>

            <a
              href={githubProfile}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline min-w-[150px]"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>

            <a
              href={linkedinProfile}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline min-w-[150px]"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
          </div>

          {/* Direct Email Dispatch Box */}
          <form onSubmit={handleDirectEmail} className="relative z-10 max-w-lg mx-auto space-y-3 pt-6 border-t border-white/5 text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-[#101215] border border-white/10 text-xs sm:text-sm text-[#F5F5F5] placeholder-[#6F7378] focus:outline-none focus:border-[#D6A63A]/50 transition-colors"
              />
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-[#101215] border border-white/10 text-xs sm:text-sm text-[#F5F5F5] placeholder-[#6F7378] focus:outline-none focus:border-[#D6A63A]/50 transition-colors"
              />
            </div>
            <input
              type="text"
              placeholder="Subject (e.g. Collaboration on AI Project)"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#101215] border border-white/10 text-xs sm:text-sm text-[#F5F5F5] placeholder-[#6F7378] focus:outline-none focus:border-[#D6A63A]/50 transition-colors"
            />
            <textarea
              placeholder="Your Message..."
              rows={3}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              className="w-full px-4 py-2.5 rounded-xl bg-[#101215] border border-white/10 text-xs sm:text-sm text-[#F5F5F5] placeholder-[#6F7378] focus:outline-none focus:border-[#D6A63A]/50 transition-colors resize-none"
            />
            <button
              type="submit"
              className="btn-outline w-full justify-center gap-2 text-xs sm:text-sm py-2.5"
            >
              <Send className="w-4 h-4 text-[#D6A63A]" />
              <span>Launch Mail Client →</span>
            </button>
          </form>

        </motion.div>

      </div>
    </section>
  );
}