import { Github, Code2, Terminal, Linkedin, Mail, type LucideIcon } from 'lucide-react';

export interface ProfileLink {
  name: string;
  url: string;
  icon: LucideIcon;
  color: string;
  description: string;
  stats?: {
    label: string;
    value: string | number;
  }[];
}

export const profiles: ProfileLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/dharshan060708',
    icon: Github,
    color: '#FFFFFF',
    description: 'Open source repositories, architectures, and systems',
    stats: [
      { label: 'Public Repos', value: 6 },
    ],
  },
  {
    name: 'LeetCode',
    url: 'https://leetcode.com/u/efImqpWfmd/',
    icon: Code2,
    color: '#FFA116',
    description: 'Data structures & algorithm problem solving',
    stats: [
      { label: 'Total Solved', value: 50 },
      { label: 'Python3', value: 41 },
      { label: 'Java', value: 5 },
      { label: 'MySQL', value: 4 },
      { label: 'Goal', value: '300+' },
    ],
  },
  {
    name: 'HackerRank',
    url: 'https://www.hackerrank.com/profile/dharshanvelumani',
    icon: Terminal,
    color: '#2EC866',
    description: 'Skill certifications and coding challenges',
    stats: [],
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/dharshan-v-121341369/',
    icon: Linkedin,
    color: '#0A66C2',
    description: 'Professional network, career updates, and engineering posts',
    stats: [],
  },
  {
    name: 'Email',
    url: 'mailto:dharshanvelumani06@gmail.com',
    icon: Mail,
    color: '#D6A63A',
    description: 'Direct contact for projects and opportunities',
    stats: [],
  },
];

export const socialLinks = profiles.map(p => ({
  name: p.name,
  url: p.url,
  icon: p.icon,
}));

export const githubUsername = 'dharshan060708';
export const leetcodeUsername = 'efImqpWfmd';
export const hackerrankUsername = 'dharshanvelumani';