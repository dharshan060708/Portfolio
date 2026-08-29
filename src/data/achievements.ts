export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  icon: string;
  color: string;
  verified: boolean;
  url?: string;
}

export const achievements: Achievement[] = [
  {
    id: 'web-form-automation',
    title: '2nd Runner Up — Web Form Automation System',
    description: 'Awarded 2nd Runner Up for building a web form automation system that streamlined data entry workflows and reduced manual processing time.',
    date: '2024',
    icon: 'trophy',
    color: '#D4AF37',
    verified: true,
    url: undefined,
  },
];

export const certifications = [
  // Add real certifications here when available
];

export const education = [
  {
    id: 'bca',
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'KG College of Arts and Science',
    department: 'Computer Applications',
    location: 'Coimbatore, Tamil Nadu',
    startYear: 2022,
    endYear: 2025,
    current: true,
    description: 'Focus on software development, database systems, web technologies, and programming fundamentals.',
  },
];