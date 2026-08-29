'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks';
import { githubUsername } from '../../data';
import { Github, Star, Code, ExternalLink, Calendar, Clock } from 'lucide-react';
import { cn } from '../../utils';

interface GitHubRepo {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  html_url: string;
  homepage: string | null;
  topics: string[];
  pushed_at: string;
  fork: boolean;
}

export function GitHubSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${githubUsername}/repos?per_page=100&sort=updated`, {
          headers: { 'Accept': 'application/vnd.github.v3+json' },
        });
        if (!response.ok) throw new Error('Failed to fetch repos');
        const data = await response.json();
        const filtered = data
          .filter((repo: GitHubRepo) => !repo.fork)
          .sort((a: GitHubRepo, b: GitHubRepo) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime())
          .slice(0, 10);
        setRepos(filtered);
      } catch (err) {
        setError('Unable to load repositories');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  const languageColors: Record<string, string> = {
    Python: '#3776AB',
    TypeScript: '#3178C6',
    JavaScript: '#F7DF1E',
    HTML: '#E34F26',
    'Visual Basic 6.0': '#0078D4',
    CSS: '#1572B6',
  };

  return (
    <section
      ref={sectionRef}
      id="github"
      className="relative py-24 md:py-32 lg:py-40 px-6 md:px-12 overflow-hidden"
      aria-labelledby="github-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-dark-gradient opacity-50" />
      <div className="absolute inset-0 bg-grid opacity-30" />

      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <span className="text-gold font-mono text-sm tracking-widest uppercase">GITHUB ANALYTICS</span>
            <h2 id="github-heading" className="section-title mt-4">GITHUB ANALYTICS</h2>
            <div className="gold-line mt-6 md:mx-0" />
          </div>
          <a
            href={`https://github.com/${githubUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <span className="flex items-center gap-2">
              <Github className="w-5 h-5" />
              View Profile
            </span>
          </a>
        </motion.div>

        {/* Stats cards */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.2 }}
        >
          <StatCard 
            icon={<Github className="w-6 h-6" />} 
            value="6" 
            label="Public Repositories" 
            color="#D4AF37"
          />
          <StatCard 
            icon={<Star className="w-6 h-6" />} 
            value={repos.reduce((sum, r) => sum + r.stargazers_count, 0)} 
            label="Total Stars" 
            color="#F5D76E"
          />
          <StatCard 
            icon={<Code className="w-6 h-6" />} 
            value={new Set(repos.map(r => r.language).filter(Boolean)).size} 
            label="Languages Used" 
            color="#00FFFF"
          />
          <StatCard 
            icon={<Calendar className="w-6 h-6" />} 
            value={repos.length > 0 ? new Date(repos[0].pushed_at).getFullYear() : '2026'} 
            label="Last Active" 
            color="#B8962E"
          />
        </motion.div>

        {/* Repositories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-gold font-mono text-xs tracking-widest uppercase mb-8">REPOSITORIES</h3>
          
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <RepoCardSkeleton key={i} />
              ))}
            </div>
          ) : error ? (
            <div className="glass-panel p-8 rounded-2xl border-border text-center">
              <p className="text-text-secondary mb-4">{error}</p>
              <a
                href={`https://github.com/${githubUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center gap-2"
              >
                <span>View on GitHub</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          ) : repos.length === 0 ? (
            <div className="glass-panel p-8 rounded-2xl border-border text-center">
              <p className="text-text-secondary">No public repositories found.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {repos.map((repo, index) => (
                <RepoCard key={repo.name} repo={repo} index={index} languageColors={languageColors} />
              ))}
            </div>
          )}
        </motion.div>

        {/* Languages breakdown */}
        {repos.length > 0 && (
          <motion.div
            className="mt-16 glass-panel p-6 rounded-2xl border-border"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-gold font-mono text-xs tracking-widest uppercase mb-6">LANGUAGE DISTRIBUTION</h3>
            <LanguageBreakdown repos={repos} languageColors={languageColors} />
          </motion.div>
        )}
      </div>
    </section>
  );
}

function StatCard({ icon, value, label, color }: { icon: React.ReactNode; value: string | number; label: string; color: string }) {
  return (
    <motion.div
      className="glass-panel p-6 rounded-2xl border-border group"
      whileHover={{ y: -4, borderColor: `${color}80` }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${color}20`, color }}>
          {icon}
        </div>
      </div>
      <div className="text-3xl font-bold font-mono text-text-primary mb-1">{value}</div>
      <div className="text-text-secondary text-sm">{label}</div>
    </motion.div>
  );
}

interface RepoCardProps {
  repo: GitHubRepo;
  index: number;
  languageColors: Record<string, string>;
}

function RepoCard({ repo, index, languageColors }: RepoCardProps) {
  return (
    <motion.article
      className="glass-panel p-6 rounded-2xl border-border group relative overflow-hidden"
      whileHover={{ y: -8, borderColor: 'rgba(212, 175, 55, 0.5)', boxShadow: '0 20px 40px rgba(212, 175, 55, 0.1)' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 + index * 0.05 }}
    >
      <div className="flex items-start justify-between mb-4">
        <h4 className="font-semibold text-text-primary group-hover:text-gold transition-colors truncate pr-4">
          {repo.name}
        </h4>
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg bg-dark/50 border border-border text-text-secondary hover:text-gold hover:border-gold/50 transition-all duration-200 opacity-0 group-hover:opacity-100"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {repo.description && (
        <p className="text-text-secondary text-sm mb-4 line-clamp-3">{repo.description}</p>
      )}

      <div className="flex flex-wrap items-center gap-2 mb-4">
        {repo.language && (
          <span className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full" style={{ 
            background: `${languageColors[repo.language] || '#D4AF37'}20`,
            color: languageColors[repo.language] || '#D4AF37',
            border: `1px solid ${languageColors[repo.language] || '#D4AF37'}40`
          }}>
            <span className="w-2 h-2 rounded-full" style={{ background: languageColors[repo.language] || '#D4AF37' }} />
            {repo.language}
          </span>
        )}
        {repo.topics.slice(0, 3).map((topic) => (
          <span key={topic} className="px-2 py-1 text-xs text-text-muted bg-dark/50 border border-border rounded-full">
            {topic}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-4 text-xs text-text-muted border-t border-border pt-4">
        {repo.stargazers_count > 0 && (
          <span className="flex items-center gap-1">
            <Star className="w-3 h-3" />
            {repo.stargazers_count}
          </span>
        )}
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {new Date(repo.pushed_at).toLocaleDateString()}
        </span>
      </div>

      {/* Hover glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-transparent opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.article>
  );
}

function RepoCardSkeleton() {
  return (
    <div className="glass-panel p-6 rounded-2xl border-border animate-pulse">
      <div className="h-6 w-3/4 bg-dark/50 rounded mb-4" />
      <div className="h-4 w-full bg-dark/50 rounded mb-2" />
      <div className="h-4 w-2/3 bg-dark/50 rounded mb-2" />
      <div className="h-4 w-1/3 bg-dark/50 rounded mb-4" />
      <div className="flex gap-2">
        <div className="h-6 w-20 bg-dark/50 rounded-full" />
        <div className="h-6 w-24 bg-dark/50 rounded-full" />
      </div>
    </div>
  );
}

function LanguageBreakdown({ repos, languageColors }: { repos: GitHubRepo[]; languageColors: Record<string, string> }) {
  const langCounts = repos.reduce((acc, repo) => {
    if (repo.language) {
      acc[repo.language] = (acc[repo.language] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const total = Object.values(langCounts).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-3">
      {Object.entries(langCounts)
        .sort(([, a], [, b]) => b - a)
        .map(([lang, count]) => (
          <div key={lang} className="group">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ background: languageColors[lang] || '#D4AF37' }} />
                <span className="text-text-primary font-medium">{lang}</span>
              </div>
              <span className="text-text-muted text-sm">{count} repo{count > 1 ? 's' : ''}</span>
            </div>
            <div className="h-2 rounded-full bg-dark border border-border overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${languageColors[lang] || '#D4AF37'}, ${languageColors[lang] || '#D4AF37'}80)` }}
                initial={{ width: 0 }}
                whileHover={{ scaleX: 1.02 }}
                animate={{ width: `${(count / total) * 100}%` }}
                transition={{ delay: 0.1, duration: 1, ease: 'easeOut' }}
              />
            </div>
          </div>
        ))}
    </div>
  );
}