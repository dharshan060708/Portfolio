'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Github, Code2, Terminal, GitBranch, Star, CheckCircle, Activity, Award } from 'lucide-react';
import { profiles } from '../../data';
import { useGitHubStats } from '../../hooks';

export function DSAGitHub() {
  const leetcodeProfile = profiles.find((p) => p.name === 'LeetCode');
  const githubProfile = profiles.find((p) => p.name === 'GitHub');
  const hackerrankProfile = profiles.find((p) => p.name === 'HackerRank');
  const { publicRepos } = useGitHubStats();

  return (
    <section id="dsa" className="relative z-10 py-16 sm:py-20" aria-label="DSA & GitHub">
      <div className="section-container">
        
        {/* Section Heading */}
        <div className="mb-10 sm:mb-12">
          <div className="section-heading mb-2">
            CODING PROFILES & ACTIVITY
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          
          {/* LEFT CARD: DSA JOURNEY */}
          <motion.div
            className="reference-card p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden min-h-[380px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45 }}
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#101215] border border-white/10 flex items-center justify-center text-[#D6A63A]">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#D6A63A] uppercase tracking-wider block">
                      LEETCODE VERIFIED
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#F5F5F5]">
                      DSA JOURNEY
                    </h3>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-md bg-amber-500/10 text-[#F2C45E] border border-amber-500/20 text-xs font-mono font-semibold">
                  50 Solved
                </span>
              </div>

              {/* Progress & Breakdown visualization */}
              <div className="space-y-4 py-2">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#A7A7A7]">Language Distribution</span>
                    <span className="text-[#F2C45E]">50 / 300+ Target</span>
                  </div>
                  {/* Multi-segment progress bar */}
                  <div className="h-2 w-full bg-[#12151B] rounded-full overflow-hidden flex">
                    <div style={{ width: '82%' }} className="bg-[#D6A63A]" title="Python3: 41" />
                    <div style={{ width: '10%' }} className="bg-[#1683FF]" title="Java: 5" />
                    <div style={{ width: '8%' }} className="bg-[#27C93F]" title="MySQL: 4" />
                  </div>
                </div>

                {/* Badges Grid */}
                <div className="grid grid-cols-3 gap-2.5 pt-1">
                  <div className="bg-[#101216] p-3 rounded-xl border border-white/5 text-center">
                    <span className="text-[10px] font-mono text-[#6F7378] block">Python3</span>
                    <span className="text-base sm:text-lg font-bold font-mono text-[#D6A63A]">41</span>
                  </div>
                  <div className="bg-[#101216] p-3 rounded-xl border border-white/5 text-center">
                    <span className="text-[10px] font-mono text-[#6F7378] block">Java</span>
                    <span className="text-base sm:text-lg font-bold font-mono text-[#1683FF]">5</span>
                  </div>
                  <div className="bg-[#101216] p-3 rounded-xl border border-white/5 text-center">
                    <span className="text-[10px] font-mono text-[#6F7378] block">MySQL</span>
                    <span className="text-base sm:text-lg font-bold font-mono text-green-400">4</span>
                  </div>
                </div>

                <p className="text-xs text-[#A7A7A7] leading-relaxed pt-1">
                  Solving algorithmic problems consistently across arrays, trees, dynamic programming, and SQL queries.
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-6">
              <a
                href={leetcodeProfile?.url || 'https://leetcode.com/u/efImqpWfmd/'}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline inline-flex items-center gap-2 text-xs sm:text-sm"
              >
                <span>View LeetCode Profile</span>
                <ArrowRight className="w-4 h-4 text-[#D6A63A]" />
              </a>
            </div>
          </motion.div>

          {/* RIGHT CARD: GITHUB ACTIVITY */}
          <motion.div
            id="github"
            className="reference-card p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden min-h-[380px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#101215] border border-white/10 flex items-center justify-center text-[#1683FF]">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#1683FF] uppercase tracking-wider block">
                      OPEN SOURCE & SYSTEMS
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#F5F5F5]">
                      GITHUB ACTIVITY
                    </h3>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-md bg-blue-500/10 text-[#1683FF] border border-blue-500/20 text-xs font-mono font-semibold">
                  {publicRepos} Repos
                </span>
              </div>

              {/* Repositories Breakdown */}
              <div className="space-y-4 py-2">
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="bg-[#101216] p-3 rounded-xl border border-white/5">
                    <div className="flex items-center gap-1.5 text-xs text-[#1683FF] font-semibold mb-1">
                      <GitBranch className="w-3.5 h-3.5" />
                      <span>Primary Repos</span>
                    </div>
                    <span className="text-sm font-bold text-[#F5F5F5] block">Meridian & Devil-In</span>
                    <span className="text-[10px] text-[#6F7378]">RAG • GGUF Offline AI</span>
                  </div>

                  <div className="bg-[#101216] p-3 rounded-xl border border-white/5">
                    <div className="flex items-center gap-1.5 text-xs text-green-400 font-semibold mb-1">
                      <Activity className="w-3.5 h-3.5" />
                      <span>Automation</span>
                    </div>
                    <span className="text-sm font-bold text-[#F5F5F5] block">n8n Lead Pipeline</span>
                    <span className="text-[10px] text-[#6F7378]">Webhooks • CRM Sync</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 text-xs font-mono text-[#A7A7A7]">
                  <span className="px-2.5 py-1 rounded-md bg-[#101215] border border-white/5 text-[#F2C45E]">Python 3.11</span>
                  <span className="px-2.5 py-1 rounded-md bg-[#101215] border border-white/5 text-[#1683FF]">TypeScript</span>
                  <span className="px-2.5 py-1 rounded-md bg-[#101215] border border-white/5 text-purple-400">FastAPI</span>
                  <span className="px-2.5 py-1 rounded-md bg-[#101215] border border-white/5 text-emerald-400">PostgreSQL</span>
                </div>

                <p className="text-xs text-[#A7A7A7] leading-relaxed pt-1">
                  Building open-source toolkits, air-gapped runtimes, and full-stack platforms with verified architecture patterns.
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-6 flex flex-wrap items-center gap-3">
              <a
                href={githubProfile?.url || 'https://github.com/dharshan060708'}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline inline-flex items-center gap-2 text-xs sm:text-sm"
              >
                <span>View GitHub Profile</span>
                <ArrowRight className="w-4 h-4 text-[#1683FF]" />
              </a>

              <a
                href={hackerrankProfile?.url || 'https://www.hackerrank.com/profile/dharshanvelumani'}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline inline-flex items-center gap-1.5 text-xs py-2 px-3"
              >
                <Terminal className="w-3.5 h-3.5 text-[#2EC866]" />
                <span>HackerRank</span>
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
