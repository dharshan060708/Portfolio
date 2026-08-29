import { useState, useEffect } from 'react';
import { githubUsername } from '../data/profiles';

interface GitHubStats {
  publicRepos: number;
  followers: number;
  avatarUrl: string;
  loading: boolean;
  error: boolean;
}

const CACHE_KEY = 'dv_github_stats_cache';
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

export function useGitHubStats(): GitHubStats {
  const [stats, setStats] = useState<GitHubStats>({
    publicRepos: 6, // Verified fallback
    followers: 0,
    avatarUrl: '',
    loading: true,
    error: false,
  });

  useEffect(() => {
    let isMounted = true;

    const fetchGitHubData = async () => {
      try {
        // Check cache first
        const cached = sessionStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Date.now() - parsed.timestamp < CACHE_DURATION) {
            if (isMounted) {
              setStats({
                publicRepos: parsed.public_repos || 6,
                followers: parsed.followers || 0,
                avatarUrl: parsed.avatar_url || '',
                loading: false,
                error: false,
              });
            }
            return;
          }
        }

        const res = await fetch(`https://api.github.com/users/${githubUsername}`);
        if (!res.ok) throw new Error('Failed to fetch GitHub data');
        const data = await res.json();

        const newStats = {
          public_repos: data.public_repos ?? 6,
          followers: data.followers ?? 0,
          avatar_url: data.avatar_url ?? '',
          timestamp: Date.now(),
        };

        sessionStorage.setItem(CACHE_KEY, JSON.stringify(newStats));

        if (isMounted) {
          setStats({
            publicRepos: newStats.public_repos,
            followers: newStats.followers,
            avatarUrl: newStats.avatar_url,
            loading: false,
            error: false,
          });
        }
      } catch (err) {
        if (isMounted) {
          setStats((prev) => ({ ...prev, loading: false, error: true }));
        }
      }
    };

    fetchGitHubData();

    return () => {
      isMounted = false;
    };
  }, []);

  return stats;
}
